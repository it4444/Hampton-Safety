#!/usr/bin/env python3
"""Debug course title parsing"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import parse_qs, urlparse

ADMIN_URL = 'https://videotilehost.com/hamptonsafety/adminWebsiteContent.php'

print("Fetching page...")
response = requests.get(ADMIN_URL)
soup = BeautifulSoup(response.content, 'lxml')

# Find "Abrasive Wheels" course (nid=26)
print("\n=== Finding 'Abrasive Wheels' structure (nid=26) ===\n")

# Find the purchase link for course 26
purchase_link_26 = soup.find('a', href=lambda h: h and 'purchaseCourse.php?nid=26' in h)

if purchase_link_26:
    print("Found purchase link for Abrasive Wheels (nid=26)")
    print(f"Link text: {purchase_link_26.get_text(strip=True)}")

    # Navigate up to find course name
    print("\nNavigating parent chain:")
    current = purchase_link_26
    for level in range(5):
        current = current.parent
        if current:
            print(f"  Level {level+1}: <{current.name}> class={current.get('class', [])} ")
            text = current.get_text(strip=True)[:150]
            print(f"    Text: {text}...")

            # Check for course name in class or nearby
            if current.get('class'):
                for cls in current.get('class'):
                    if 'courseName' in cls or 'course-name' in cls or 'title' in cls:
                        print(f"    >>> Found potential title class: {cls}")

print("\n=== Looking for patterns with 'Abrasive Wheels' text ===\n")

# Find all elements containing "Abrasive Wheels"
for elem in soup.find_all(string=lambda s: s and 'Abrasive Wheels' in s):
    parent = elem.parent
    print(f"Found in <{parent.name}> class={parent.get('class', [])}")
    print(f"  Text: {elem.strip()[:80]}")

    # Check if there's a nearby purchase link
    nearby_links = parent.find_all('a', href=lambda h: h and 'purchaseCourse.php?nid=26' in h, limit=5)
    if nearby_links:
        print(f"  >>> Has purchase link nearby!")

    print()
