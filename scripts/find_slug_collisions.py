#!/usr/bin/env python3
"""Find courses with different IDs/titles that generate the same slug"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import parse_qs, urlparse, urljoin
from collections import defaultdict
import re

ADMIN_URL = 'https://videotilehost.com/hamptonsafety/adminWebsiteContent.php'

def slugify(title):
    """Convert title to URL-friendly slug"""
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

# Deduplicate by ID
seen_ids = set()
unique_courses = []
for course_id, title, slug in courses:
    if course_id not in seen_ids:
        seen_ids.add(course_id)
        unique_courses.append((course_id, title, slug))

print(f"\nTotal courses found: {len(courses)}")
print(f"Unique courses by ID: {len(unique_courses)}")

# Group by slug
slug_groups = defaultdict(list)
for course_id, title, slug in unique_courses:
    slug_groups[slug].append((course_id, title))

# Find slug collisions
collisions = {slug: courses_list for slug, courses_list in slug_groups.items() if len(courses_list) > 1}

if collisions:
    print(f"\n{'='*60}")
    print(f"FOUND {len(collisions)} SLUG COLLISIONS")
    print("(Different course IDs producing the same slug)")
    print(f"{'='*60}\n")

    for slug, courses_list in sorted(collisions.items()):
        print(f"\nSlug: '{slug}'")
        for course_id, title in courses_list:
            print(f"  - ID {course_id}: \"{title}\"")
else:
    print("\nNo slug collisions found!")
    print("All unique courses have unique slugs.")
