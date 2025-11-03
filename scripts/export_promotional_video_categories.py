#!/usr/bin/env python3
"""
Export all promotional video categories to CSV for client dropdown
"""

import os
import re
import csv

# Project root
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def parse_promotional_video_titles(file_path):
    """Extract video titles from promotional video scrape"""
    video_titles = []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match video entries - title before the iframe
    # Format: Title:\n<iframe src="https://videotilehost.com/embed/XX" ...
    pattern = r'([^\n]+?):\s*\n\s*<iframe src="https://videotilehost\.com/embed/(\d+)"'

    matches = re.findall(pattern, content)

    for title, video_id in matches:
        title = title.strip()
        # Skip suite-level videos
        if title in ['Generic eLearning Video', 'Business Skills', 'Health & Safety', 'Health & Social Care']:
            continue
        video_titles.append(title)

    return sorted(video_titles)

def main():
    print("="*80)
    print("EXPORTING PROMOTIONAL VIDEO CATEGORIES TO CSV")
    print("="*80)

    # Parse promotional videos
    promo_file = os.path.join(project_root, 'docs', 'Promotional video scrape.md')

    if not os.path.exists(promo_file):
        print(f"[ERROR] File not found: {promo_file}")
        return

    print(f"\nParsing: {promo_file}")
    video_categories = parse_promotional_video_titles(promo_file)

    print(f"Found {len(video_categories)} promotional video categories")

    # Export to CSV
    csv_file = os.path.join(project_root, 'exports', 'promotional_video_categories.csv')

    # Create exports directory if it doesn't exist
    os.makedirs(os.path.dirname(csv_file), exist_ok=True)

    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)

        # Header
        writer.writerow(['Video Category'])

        # Data
        for category in video_categories:
            writer.writerow([category])

    print(f"\nCSV exported to: {csv_file}")
    print(f"Total categories: {len(video_categories)}")

    print("\n" + "="*80)
    print("PREVIEW (first 20)")
    print("="*80)
    for category in video_categories[:20]:
        print(f"  - {category}")

    if len(video_categories) > 20:
        print(f"\n  ... and {len(video_categories) - 20} more")

    print("\n" + "="*80)
    print("EXPORT COMPLETE")
    print("="*80)
    print(f"\nFile ready for client: {csv_file}")
    print("This can be used as a dropdown list in Excel/Google Sheets.")
    print()

if __name__ == '__main__':
    main()
