#!/usr/bin/env python3
"""
Export courses without promotional videos to CSV for client review
"""

import os
import sys
import re
import csv
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

SUITE_NAMES = {
    1: 'Health & Safety',
    2: 'Business Skills',
    3: 'Health & Social Care',
    4: 'Mental Health & Wellbeing',
    5: 'Hospitality'
}

# Production URL
PRODUCTION_URL = "https://hamptonsafety.co.uk"

def parse_promotional_video_ids(file_path):
    """Extract numeric video IDs from promotional video scrape"""
    video_ids = set()

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract numeric IDs only
    pattern = r'<iframe src="https://videotilehost\.com/embed/(\d+)"'
    matches = re.findall(pattern, content)

    for video_id in matches:
        video_ids.add(int(video_id))

    return video_ids

def main():
    # Initialize Supabase
    supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("[ERROR] Supabase credentials not found")
        sys.exit(1)

    supabase = create_client(supabase_url, supabase_key)

    print("="*80)
    print("EXPORTING COURSES WITHOUT PROMOTIONAL VIDEOS TO CSV")
    print("="*80)

    # Parse promotional videos
    promo_file = os.path.join(project_root, 'docs', 'Promotional video scrape.md')
    promotional_video_ids = parse_promotional_video_ids(promo_file)

    print(f"\nTotal promotional videos available: {len(promotional_video_ids)}")

    # Get courses
    courses_response = supabase.table('courses').select('id, title, slug, category_id').execute()
    categories_response = supabase.table('categories').select('id, name, suite_id').execute()

    courses = courses_response.data
    categories = {cat['id']: cat for cat in categories_response.data}

    # Find courses without promotional videos
    courses_without_promos = []

    for course in courses:
        if course['id'] not in promotional_video_ids:
            category = categories.get(course['category_id'])
            suite_id = category['suite_id'] if category else None
            suite_name = SUITE_NAMES.get(suite_id, 'Unknown')

            courses_without_promos.append({
                'Course Name': course['title'],
                'Course ID': course['id'],
                'Slug': course['slug'],
                'Online URL': f"{PRODUCTION_URL}/training/{course['slug']}",
                'Video Fallback Category': suite_name
            })

    print(f"Courses without promotional videos: {len(courses_without_promos)}")

    # Sort by category, then by name
    courses_without_promos.sort(key=lambda x: (x['Video Fallback Category'], x['Course Name']))

    # Export to CSV
    csv_file = os.path.join(project_root, 'exports', 'courses_without_promotional_videos.csv')

    # Create exports directory if it doesn't exist
    os.makedirs(os.path.dirname(csv_file), exist_ok=True)

    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['Course Name', 'Course ID', 'Slug', 'Online URL', 'Video Fallback Category']
        writer = csv.DictWriter(f, fieldnames=fieldnames)

        writer.writeheader()
        writer.writerows(courses_without_promos)

    print(f"\nCSV exported to: {csv_file}")
    print(f"Total rows: {len(courses_without_promos)}")

    # Show summary by category
    print("\n" + "="*80)
    print("SUMMARY BY CATEGORY")
    print("="*80)

    by_category = {}
    for course in courses_without_promos:
        category = course['Video Fallback Category']
        if category not in by_category:
            by_category[category] = 0
        by_category[category] += 1

    for category in sorted(by_category.keys()):
        print(f"  {category}: {by_category[category]} courses")

    print("\n" + "="*80)
    print("EXPORT COMPLETE")
    print("="*80)
    print(f"\nFile ready for client review: {csv_file}")
    print("Open in Excel, Google Sheets, or any spreadsheet application.")
    print()

if __name__ == '__main__':
    main()
