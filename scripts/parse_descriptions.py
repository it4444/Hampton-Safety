#!/usr/bin/env python3
"""
Parse Course Descriptions from VideoTile HTML Files
Extracts course descriptions from static HTML files and updates Supabase database
"""

import os
import re
import sys
from typing import Dict, List, Optional
from pathlib import Path

from bs4 import BeautifulSoup
from dotenv import load_dotenv
from supabase import create_client, Client

# ============================================================================
# CONFIGURATION
# ============================================================================

# Load environment variables from project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

# HTML files directory
HTML_DIR = os.path.join(project_root, 'Hampton Safety New')

# HTML files to parse
HTML_FILES = [
    'Business Skills.html',
    'Health & Safety.html',
    'Health & Social Care.html'
]

# ============================================================================
# DESCRIPTION PARSER CLASS
# ============================================================================

class DescriptionParser:
    """Parses course descriptions from HTML files and updates Supabase"""

    def __init__(self, supabase_client: Client, dry_run: bool = False):
        self.supabase = supabase_client
        self.dry_run = dry_run
        self.descriptions: Dict[int, Dict] = {}  # course_id -> {title, description}

    def parse_html_file(self, file_path: str) -> int:
        """Parse a single HTML file and extract course descriptions"""
        print(f"\nParsing {os.path.basename(file_path)}...")

        with open(file_path, 'r', encoding='utf-8') as f:
            html_content = f.read()

        soup = BeautifulSoup(html_content, 'lxml')
        courses_found = 0

        # Find all course sections (h2 elements with class "vtheading")
        for heading in soup.find_all('h2', class_='vtheading'):
            course_title = heading.get_text(strip=True)

            # Find the description paragraph (next sibling with class "vtptext")
            description_para = heading.find_next_sibling('p', class_='vtptext')
            if not description_para:
                continue

            # Extract course ID from the icon image
            icon_img = description_para.find('img', class_='vticons')
            course_id = None

            if icon_img and icon_img.get('src'):
                # Extract ID from URL like: https://videotilehost.com/common/course-icons/course26.png
                icon_src = icon_img['src']
                match = re.search(r'course(\d+)\.png', icon_src)
                if match:
                    course_id = int(match.group(1))

            # If we didn't find ID in icon, try the purchase link
            if not course_id:
                details_para = description_para.find_next_sibling('p', class_='vtdetails')
                if details_para:
                    buy_link = details_para.find_next_sibling('a', href=lambda h: h and 'purchaseCourse.php' in h)
                    if buy_link:
                        match = re.search(r'nid=(\d+)', buy_link['href'])
                        if match:
                            course_id = int(match.group(1))

            if not course_id:
                print(f"  [WARN] Could not find course ID for: {course_title}")
                continue

            # Extract description text (remove the img tag)
            description_text = description_para.get_text(strip=True)

            # Clean up description - sometimes there are multiple <p> tags with vtptext
            # Let's also check for additional paragraphs
            full_description = description_text
            next_para = description_para.find_next_sibling('p', class_='vtptext')
            while next_para and 'vtdetails' not in next_para.get('class', []):
                # This is a continuation paragraph
                full_description += " " + next_para.get_text(strip=True)
                next_para = next_para.find_next_sibling('p')
                if not next_para or 'vtptext' not in next_para.get('class', []):
                    break

            # Store description
            self.descriptions[course_id] = {
                'title': course_title,
                'description': full_description
            }
            courses_found += 1

        print(f"  Found {courses_found} course descriptions")
        return courses_found

    def parse_all_files(self) -> int:
        """Parse all HTML files in the directory"""
        print("="*60)
        print("PARSING COURSE DESCRIPTIONS FROM HTML FILES")
        print("="*60)

        total_found = 0
        for filename in HTML_FILES:
            file_path = os.path.join(HTML_DIR, filename)
            if os.path.exists(file_path):
                total_found += self.parse_html_file(file_path)
            else:
                print(f"[WARN] File not found: {file_path}")

        print(f"\nTotal unique courses with descriptions: {len(self.descriptions)}")
        return len(self.descriptions)

    def update_supabase(self) -> Dict[str, int]:
        """Update Supabase database with extracted descriptions"""
        if self.dry_run:
            print("\n[DRY RUN] Would update the following courses:")
            for course_id, data in list(self.descriptions.items())[:5]:
                print(f"  ID {course_id}: {data['title']}")
                print(f"    Description: {data['description'][:100]}...")
            return {'updated': 0, 'not_found': 0, 'errors': 0}

        print("\n" + "="*60)
        print("UPDATING SUPABASE DATABASE")
        print("="*60)

        updated = 0
        not_found = 0
        errors = 0

        for course_id, data in self.descriptions.items():
            try:
                # Check if course exists
                result = self.supabase.table('courses').select('id, title').eq('id', course_id).execute()

                if not result.data or len(result.data) == 0:
                    print(f"  [WARN] Course ID {course_id} not found in database: {data['title']}")
                    not_found += 1
                    continue

                # Update description
                update_result = self.supabase.table('courses').update({
                    'description': data['description']
                }).eq('id', course_id).execute()

                if update_result.data:
                    updated += 1
                    print(f"  [OK] Updated course {course_id}: {data['title']}")
                else:
                    errors += 1
                    print(f"  [ERROR] Failed to update course {course_id}: {data['title']}")

            except Exception as e:
                errors += 1
                print(f"  [ERROR] Error updating course {course_id}: {str(e)}")

        print("\n" + "="*60)
        print("UPDATE SUMMARY")
        print("="*60)
        print(f"[OK] Successfully updated: {updated}")
        print(f"[WARN] Not found in database: {not_found}")
        print(f"[ERROR] Errors: {errors}")
        print("="*60)

        return {'updated': updated, 'not_found': not_found, 'errors': errors}

    def verify_coverage(self):
        """Verify description coverage in database"""
        print("\n" + "="*60)
        print("VERIFYING DATABASE COVERAGE")
        print("="*60)

        try:
            # Get total courses
            total_result = self.supabase.table('courses').select('id', count='exact').execute()
            total_courses = total_result.count

            # Get courses with descriptions
            with_desc_result = self.supabase.table('courses').select('id', count='exact').not_.is_('description', 'null').execute()
            with_descriptions = with_desc_result.count

            # Get courses without descriptions
            without_desc_result = self.supabase.table('courses').select('id, title').is_('description', 'null').execute()
            without_descriptions = without_desc_result.count

            print(f"\nDatabase Coverage:")
            print(f"   Total courses: {total_courses}")
            if total_courses > 0:
                print(f"   With descriptions: {with_descriptions} ({with_descriptions/total_courses*100:.1f}%)")
                print(f"   Without descriptions: {without_descriptions} ({without_descriptions/total_courses*100:.1f}%)")
            else:
                print(f"   With descriptions: {with_descriptions}")
                print(f"   Without descriptions: {without_descriptions}")

            if without_descriptions > 0 and without_descriptions <= 10:
                print(f"\n[WARN] Courses missing descriptions:")
                for course in without_desc_result.data:
                    print(f"     - ID {course['id']}: {course['title']}")

        except Exception as e:
            print(f"[ERROR] Error verifying coverage: {str(e)}")

        print("="*60 + "\n")

    def run(self):
        """Main workflow"""
        try:
            # Parse HTML files
            total_found = self.parse_all_files()

            if total_found == 0:
                print("[ERROR] No descriptions found. Exiting.")
                return False

            # Update database
            stats = self.update_supabase()

            # Verify coverage
            if not self.dry_run:
                self.verify_coverage()

            return stats['updated'] > 0

        except Exception as e:
            print(f"\n[ERROR] {str(e)}")
            import traceback
            traceback.print_exc()
            return False


# ============================================================================
# MAIN
# ============================================================================

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Parse course descriptions from HTML files')
    parser.add_argument('--dry-run', action='store_true', help='Parse without updating database')
    args = parser.parse_args()

    # Initialize Supabase client
    supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("[ERROR] Supabase credentials not found in .env.local")
        print("Required variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY")
        sys.exit(1)

    supabase_client = create_client(supabase_url, supabase_key)

    # Run parser
    parser = DescriptionParser(supabase_client=supabase_client, dry_run=args.dry_run)
    success = parser.run()

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
