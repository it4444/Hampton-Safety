#!/usr/bin/env python3
"""Test what slugs the scraper actually generates"""

import sys
sys.path.insert(0, '.')

from scrape_videotile import VideoTileScraper
from collections import Counter

print("Running scraper...")
scraper = VideoTileScraper(supabase_client=None, dry_run=True)

# Fetch and parse
soup = scraper.fetch_page()
scraper.parse_courses(soup)

print(f"\nTotal courses after parsing: {len(scraper.courses)}")

# Check for duplicate slugs
slugs = [c['slug'] for c in scraper.courses]
slug_counts = Counter(slugs)

duplicates = {slug: count for slug, count in slug_counts.items() if count > 1}

if duplicates:
    print(f"\n{'='*60}")
    print(f"FOUND {len(duplicates)} DUPLICATE SLUGS IN SCRAPER DATA:")
    print(f"{'='*60}\n")

    for slug, count in sorted(duplicates.items()):
        print(f"\nSlug: '{slug}' ({count} occurrences)")
        matching_courses = [c for c in scraper.courses if c['slug'] == slug]
        for course in matching_courses:
            print(f"  - ID {course['id']}: {course['title']}")
else:
    print("\nNo duplicate slugs in scraped data!")
