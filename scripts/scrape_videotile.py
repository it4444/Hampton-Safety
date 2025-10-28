#!/usr/bin/env python3
"""
VideoTile Course Scraper for Hampton Safety
Scrapes course data from VideoTile admin page and populates Supabase database
"""

import os
import re
import sys
import argparse
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse, parse_qs

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client

# ============================================================================
# CONFIGURATION
# ============================================================================

# Load environment variables from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

ADMIN_URL = 'https://videotilehost.com/hamptonsafety/adminWebsiteContent.php'
USER_AGENT = 'Mozilla/5.0 (Hampton Safety Course Scraper)'

# Suite mapping
SUITE_MAPPING = {
    1: 'Health & Safety',
    2: 'Business Skills',
    3: 'Health & Social Care',
    4: 'Mental Health & Wellbeing',
    5: 'Hospitality'
}

# Reverse mapping for category name -> suite_id
CATEGORY_TO_SUITE = {v: k for k, v in SUITE_MAPPING.items()}

# Icon alias table for matching course titles to icon labels
ICON_ALIASES = {
    'dse': 'display screen equipment',
    'display screen equipment': 'assessing display screen equipment',
    'nvq': 'nvq',
    'food hygiene': 'food safety',
    'cyber security': 'cybersecurity',
    'h&s': 'health and safety',
    'mental health': 'mental health awareness',
    'first aid': 'emergency first aid',
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def normalize_title(title: str) -> str:
    """Normalize title for matching: lowercase, trim, collapse spaces, remove punctuation"""
    normalized = title.lower().strip()
    # Remove punctuation except hyphens and ampersands
    normalized = re.sub(r'[^\w\s\-&]', '', normalized)
    # Collapse multiple spaces
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized

def slugify(title: str) -> str:
    """Convert title to URL-friendly kebab-case slug"""
    slug = title.lower().strip()
    # Replace spaces and underscores with hyphens
    slug = re.sub(r'[\s_]+', '-', slug)
    # Remove non-alphanumeric characters except hyphens
    slug = re.sub(r'[^\w\-]', '', slug)
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    # Collapse multiple hyphens
    slug = re.sub(r'\-+', '-', slug)
    return slug

def expand_aliases(text: str) -> List[str]:
    """Expand text with known aliases for better matching"""
    variants = [text]
    for alias, expansion in ICON_ALIASES.items():
        if alias in text:
            variants.append(text.replace(alias, expansion))
        if expansion in text:
            variants.append(text.replace(expansion, alias))
    return list(set(variants))

def titles_match(title1: str, title2: str) -> bool:
    """Check if two titles match using normalization and aliases"""
    norm1 = normalize_title(title1)
    norm2 = normalize_title(title2)

    # Direct match
    if norm1 == norm2:
        return True

    # Check if one is substring of the other
    if norm1 in norm2 or norm2 in norm1:
        return True

    # Try with aliases
    variants1 = expand_aliases(norm1)
    variants2 = expand_aliases(norm2)

    for v1 in variants1:
        for v2 in variants2:
            if v1 == v2 or v1 in v2 or v2 in v1:
                return True

    # Token overlap (at least 60% of tokens match)
    tokens1 = set(norm1.split())
    tokens2 = set(norm2.split())
    if len(tokens1) == 0 or len(tokens2) == 0:
        return False

    overlap = len(tokens1 & tokens2)
    min_tokens = min(len(tokens1), len(tokens2))
    if overlap / min_tokens >= 0.6:
        return True

    return False

# ============================================================================
# SCRAPER CLASS
# ============================================================================

class VideoTileScraper:
    """Scrapes course data from VideoTile admin page"""

    def __init__(self, supabase_client: Optional[Client] = None, dry_run: bool = False):
        self.supabase = supabase_client
        self.dry_run = dry_run
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})

        # Data storage
        self.courses: List[Dict] = []
        self.stats = {
            'total_courses': 0,
            'with_icons': 0,
            'with_descriptions': 0,
            'with_trial_urls': 0,
            'with_assets': 0
        }

    def fetch_page(self) -> BeautifulSoup:
        """Fetch and parse the VideoTile admin page"""
        print(f"Fetching {ADMIN_URL}...")
        response = self.session.get(ADMIN_URL, timeout=30)
        response.raise_for_status()
        return BeautifulSoup(response.content, 'lxml')

    def parse_courses(self, soup: BeautifulSoup):
        """Parse course lists from Links section"""
        print("Parsing course listings...")

        current_category = None
        category_id = None

        # Look for course listings - they're typically in a specific format
        for element in soup.find_all(['h2', 'h3', 'p', 'li', 'div']):
            text = element.get_text(strip=True)

            # Check if this is a category header
            for category in CATEGORY_TO_SUITE.keys():
                if category.lower() in text.lower() and len(text) < 100:
                    current_category = category
                    category_id = CATEGORY_TO_SUITE[category]
                    print(f"  Processing category: {current_category}")
                    break

            if not current_category:
                continue

            # Look for purchase links
            links = element.find_all('a', href=True)
            for link in links:
                href = link['href']

                # Parse purchase URL
                if 'purchaseCourse.php' in href and 'nid=' in href:
                    purchase_url = urljoin(ADMIN_URL, href)

                    # Extract course ID from URL
                    parsed = urlparse(purchase_url)
                    params = parse_qs(parsed.query)
                    if 'nid' not in params:
                        continue

                    course_id = int(params['nid'][0])

                    # Extract title from webContent_courseName paragraph
                    title = None
                    course_name_elem = element.find_previous('p', class_='webContent_courseName')
                    if course_name_elem:
                        title_text = course_name_elem.get_text(strip=True)
                        title = title_text.rstrip(':').strip()

                    # Fallback: try to find title in parent div structure
                    if not title or len(title) < 3 or title.startswith('http'):
                        parent_div = link.find_parent('div', class_='moduleListWhite')
                        if parent_div:
                            course_name_elem = parent_div.find('p', class_='webContent_courseName')
                            if course_name_elem:
                                title_text = course_name_elem.get_text(strip=True)
                                title = title_text.rstrip(':').strip()

                    if not title or len(title) < 3 or title.startswith('http'):
                        # Skip this course if we can't find a proper title
                        continue

                    # Check for free trial URL
                    free_trial_url = None
                    trial_link = element.find('a', href=lambda h: h and 'freeTrial.php' in h)
                    if trial_link:
                        free_trial_url = urljoin(ADMIN_URL, trial_link['href'])

                    # Create course record
                    # Note: Append course ID to slug to handle duplicate titles
                    course = {
                        'id': course_id,
                        'title': title,
                        'slug': f"{slugify(title)}-{course_id}",
                        'category': current_category,
                        'category_id': category_id,
                        'purchase_url': purchase_url,
                        'free_trial_url': free_trial_url,
                        'icon_url': None,
                        'description': None,
                        'assets': []
                    }

                    # Avoid duplicates by course ID
                    if not any(c['id'] == course_id for c in self.courses):
                        self.courses.append(course)

        # Deduplicate by ID (in case we missed any)
        seen_ids = set()
        unique_courses = []
        for course in self.courses:
            if course['id'] not in seen_ids:
                seen_ids.add(course['id'])
                unique_courses.append(course)

        self.courses = unique_courses
        print(f"  Found {len(self.courses)} unique courses")

    def construct_icons(self):
        """Construct icon URLs from course IDs using VideoTile's pattern"""
        print("Constructing icon URLs...")

        for course in self.courses:
            # VideoTile pattern: https://videotilehost.com/common/course-icons/course{ID}.png
            course['icon_url'] = f"https://videotilehost.com/common/course-icons/course{course['id']}.png"

        with_icons = sum(1 for c in self.courses if c['icon_url'])
        self.stats['with_icons'] = with_icons
        print(f"  Constructed {with_icons}/{len(self.courses)} icon URLs ({with_icons/len(self.courses)*100:.1f}%)")

    def parse_descriptions(self, soup: BeautifulSoup):
        """Parse course descriptions from textboxes in HTML"""
        print("Parsing course descriptions...")

        # Find all textareas and text inputs that might contain descriptions
        # They appear as: <paragraph>Course Title</paragraph> followed by <textbox>Description...</textbox>
        descriptions_found = 0

        # Find all paragraph elements that might be course titles
        for para in soup.find_all(['paragraph', 'p', 'strong', 'b']):
            para_text = para.get_text(strip=True)

            # Try to match this text to a course title
            for course in self.courses:
                if course['description']:  # Skip if already found
                    continue

                if titles_match(course['title'], para_text):
                    # Look for next textbox/textarea sibling
                    for sibling in para.find_next_siblings():
                        if sibling.name in ['textbox', 'textarea', 'input']:
                            description = sibling.get_text(strip=True)
                            if description and len(description) > 20:  # Reasonable description length
                                course['description'] = description
                                descriptions_found += 1
                                break
                        # Don't search too far
                        if sibling.name in ['paragraph', 'h2', 'h3', 'h4']:
                            break
                    break

        self.stats['with_descriptions'] = descriptions_found
        print(f"  Parsed {descriptions_found}/{len(self.courses)} descriptions ({descriptions_found/len(self.courses)*100:.1f}%)")

    def construct_assets(self):
        """Construct video and PDF assets from course IDs"""
        print("Constructing course assets...")

        total_assets = 0
        for course in self.courses:
            course_id = course['id']
            course_title = course['title']

            # Video embed URL
            video_asset = {
                'type': 'video',
                'url': f"https://videotilehost.com/embed/{course_id}",
                'label': f"{course_title} - Promotional Video"
            }

            # PDF information sheet URL
            pdf_asset = {
                'type': 'pdf',
                'url': f"https://videotilehost.com/common/courses/info_{course_id}.pdf",
                'label': f"{course_title} - Course Information"
            }

            course['assets'] = [video_asset, pdf_asset]
            total_assets += 2

        self.stats['with_assets'] = len([c for c in self.courses if c['assets']])
        print(f"  Constructed {total_assets} assets for {len(self.courses)} courses ({total_assets} total)")

    def save_to_supabase(self):
        """Save courses and assets to Supabase database"""
        if self.dry_run:
            print("\n[DRY RUN] Skipping database insertion")
            return

        if not self.supabase:
            print("\n[ERROR] No Supabase client available")
            return

        print("\nSaving courses to Supabase...")

        # Get category IDs from database
        categories_response = self.supabase.table('categories').select('id, name, suite_id').execute()
        category_map = {cat['suite_id']: cat['id'] for cat in categories_response.data}

        # Insert/update courses
        courses_saved = 0
        assets_saved = 0
        errors = 0

        for course in self.courses:
            try:
                # Get database category_id
                db_category_id = category_map.get(course['category_id'])
                if not db_category_id:
                    print(f"  [WARN] Category ID {course['category_id']} not found for course: {course['title']}")
                    continue

                course_data = {
                    'id': course['id'],
                    'title': course['title'],
                    'slug': course['slug'],
                    'category_id': db_category_id,
                    'icon_url': course['icon_url'],
                    'description': course['description'],
                    'purchase_url': course['purchase_url'],
                    'free_trial_url': course['free_trial_url']
                }

                # Upsert course
                result = self.supabase.table('courses').upsert(course_data).execute()

                if result.data:
                    courses_saved += 1

                    # Save assets
                    if course.get('assets'):
                        # Delete existing assets for this course
                        self.supabase.table('course_assets').delete().eq('course_id', course['id']).execute()

                        # Insert new assets
                        for asset in course['assets']:
                            asset_data = {
                                'course_id': course['id'],
                                'type': asset['type'],
                                'url': asset['url'],
                                'label': asset['label']
                            }
                            self.supabase.table('course_assets').insert(asset_data).execute()
                            assets_saved += 1

            except Exception as e:
                errors += 1
                print(f"  [ERROR] Failed to save course {course['id']}: {str(e)}")

        print(f"  Saved {courses_saved} courses and {assets_saved} assets ({errors} errors)")

    def print_summary(self):
        """Print scraping summary"""
        print("\n" + "="*60)
        print("SCRAPING SUMMARY")
        print("="*60)
        print(f"Total courses:        {len(self.courses)}")
        print(f"With icons:           {self.stats['with_icons']} ({self.stats['with_icons']/max(len(self.courses),1)*100:.1f}%)")
        print(f"With descriptions:    {self.stats['with_descriptions']} ({self.stats['with_descriptions']/max(len(self.courses),1)*100:.1f}%)")
        print(f"With purchase URLs:   {sum(1 for c in self.courses if c.get('purchase_url'))} ({sum(1 for c in self.courses if c.get('purchase_url'))/max(len(self.courses),1)*100:.1f}%)")
        print(f"With free trial URLs: {sum(1 for c in self.courses if c.get('free_trial_url'))} ({sum(1 for c in self.courses if c.get('free_trial_url'))/max(len(self.courses),1)*100:.1f}%)")
        print(f"With assets:          {self.stats.get('with_assets', 0)} courses")

        total_assets = sum(len(c.get('assets', [])) for c in self.courses)
        print(f"Total assets:         {total_assets} (videos + PDFs)")

        if self.dry_run:
            print("\n[DRY RUN MODE] No data written to database")
            print("\nSample courses:")
            for course in self.courses[:3]:
                print(f"\n  ID: {course['id']}")
                print(f"  Title: {course['title']}")
                print(f"  Category: {course['category']}")
                print(f"  Icon: {'✓' if course['icon_url'] else '✗'}")
                print(f"  Description: {'✓' if course['description'] else '✗'}")
                print(f"  Assets: {len(course.get('assets', []))}")

        print("="*60 + "\n")

    def run(self):
        """Main scraping workflow"""
        print("\n" + "="*60)
        print("VideoTile Course Scraper - Updated Version")
        print("="*60 + "\n")

        try:
            # Fetch page
            soup = self.fetch_page()

            # Parse course data
            self.parse_courses(soup)

            # Construct icons from course IDs (100% coverage)
            self.construct_icons()

            # Parse descriptions from HTML textboxes
            self.parse_descriptions(soup)

            # Construct video and PDF assets from course IDs
            self.construct_assets()

            # Save to database
            if not self.dry_run and self.supabase:
                self.save_to_supabase()

            # Print summary
            self.print_summary()

            return True

        except Exception as e:
            print(f"\n[ERROR] Scraping failed: {str(e)}")
            import traceback
            traceback.print_exc()
            return False

# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description='Scrape VideoTile course data')
    parser.add_argument('--dry-run', action='store_true', help='Parse data without writing to database')
    parser.add_argument('--strict', action='store_true', help='Throw error if any course missing required fields')
    args = parser.parse_args()

    # Initialize Supabase client
    supabase_client = None
    if not args.dry_run:
        supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
        supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

        if not supabase_url or not supabase_key:
            print("[ERROR] Supabase credentials not found in .env.local")
            print("Required variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY")
            sys.exit(1)

        supabase_client = create_client(supabase_url, supabase_key)

    # Run scraper
    scraper = VideoTileScraper(supabase_client=supabase_client, dry_run=args.dry_run)
    success = scraper.run()

    # Strict mode validation
    if args.strict and success:
        missing_fields = []
        for course in scraper.courses:
            if not course['purchase_url']:
                missing_fields.append(f"Course {course['id']} missing purchase_url")

        if missing_fields:
            print("\n[ERROR] Strict mode violations:")
            for error in missing_fields:
                print(f"  - {error}")
            sys.exit(1)

    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
