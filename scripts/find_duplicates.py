#!/usr/bin/env python3
"""Find duplicate course titles in scraped data"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import parse_qs, urlparse, urljoin
from collections import Counter

ADMIN_URL = 'https://videotilehost.com/hamptonsafety/adminWebsiteContent.php'

def slugify(title):
    """Convert title to URL-friendly slug"""
    import re
    slug = title.lower().strip()
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'[^\w\-]', '', slug)
    slug = slug.strip('-')
    slug = re.sub(r'\-+', '-', slug)
    return slug

print("Fetching page...")
response = requests.get(ADMIN_URL)
soup = BeautifulSoup(response.content, 'lxml')

print("Finding all course titles...")
course_name_elements = soup.find_all('p', class_='webContent_courseName')

courses = []
for course_elem in course_name_elements:
    title_text = course_elem.get_text(strip=True)
    title = title_text.rstrip(':').strip()

    # Find purchase link to get ID
    ul_sibling = course_elem.find_next_sibling('ul')
    if ul_sibling:
        purchase_link = ul_sibling.find('a', href=lambda h: h and 'purchaseCourse.php' in h and 'nid=' in h)
        if purchase_link:
            purchase_url = urljoin(ADMIN_URL, purchase_link['href'])
            parsed = urlparse(purchase_url)
            params = parse_qs(parsed.query)
            if 'nid' in params:
                course_id = int(params['nid'][0])
                slug = slugify(title)
                courses.append((course_id, title, slug))

print(f"\nFound {len(courses)} total courses")

# Find duplicate slugs
slugs = [c[2] for c in courses]
slug_counts = Counter(slugs)

duplicates = {slug: count for slug, count in slug_counts.items() if count > 1}

if duplicates:
    print(f"\n{'='*60}")
    print(f"FOUND {len(duplicates)} DUPLICATE SLUGS:")
    print(f"{'='*60}\n")

    for slug, count in sorted(duplicates.items()):
        print(f"\nSlug: '{slug}' ({count} occurrences)")
        matching_courses = [c for c in courses if c[2] == slug]
        for course_id, title, _ in matching_courses:
            print(f"  - ID {course_id}: {title}")
else:
    print("\nNo duplicate slugs found!")

print(f"\n{'='*60}")
