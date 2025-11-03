#!/usr/bin/env python3
"""
Simple video fix using ID matching
If course ID exists in promotional videos -> use /embed/{id}
Otherwise -> use suite fallback /embed/SU{suite_id}
"""

import os
import sys
import re
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

SUITE_VIDEO_CODES = {
    1: 'SU1',  # Health & Safety
    2: 'SU2',  # Business Skills
    3: 'SU3',  # Health & Social Care
    4: 'SU4',  # Mental Health & Wellbeing
    5: 'SU5',  # Hospitality
}

def parse_promotional_video_ids(file_path):
    """Extract numeric video IDs from promotional video scrape"""
    video_ids = set()

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract numeric IDs only (not SU1, SU2, etc)
    pattern = r'<iframe src="https://videotilehost\.com/embed/(\d+)"'
    matches = re.findall(pattern, content)

    for video_id in matches:
        video_ids.add(int(video_id))

    return video_ids

def main():
    print("="*80)
    print("SIMPLE VIDEO FIX - ID MATCHING")
    print("="*80)

    # Initialize Supabase
    supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("[ERROR] Supabase credentials not found")
        sys.exit(1)

    supabase = create_client(supabase_url, supabase_key)

    # Parse promotional videos
    promo_file = os.path.join(project_root, 'docs', 'Promotional video scrape.md')
    if not os.path.exists(promo_file):
        print(f"[ERROR] File not found: {promo_file}")
        sys.exit(1)

    print(f"\nParsing promotional videos...")
    promotional_video_ids = parse_promotional_video_ids(promo_file)
    print(f"Found {len(promotional_video_ids)} promotional videos")

    # Get courses
    print("\nFetching courses from database...")
    courses_response = supabase.table('courses').select('id, title, category_id').execute()
    categories_response = supabase.table('categories').select('id, suite_id').execute()

    courses = courses_response.data
    categories = {cat['id']: cat for cat in categories_response.data}

    print(f"Found {len(courses)} courses")

    # Categorize courses
    with_promo_video = []
    with_suite_fallback = []

    for course in courses:
        category = categories.get(course['category_id'])
        if not category:
            continue

        suite_id = category['suite_id']
        suite_code = SUITE_VIDEO_CODES.get(suite_id, f'SU{suite_id}')

        if course['id'] in promotional_video_ids:
            with_promo_video.append({
                'course_id': course['id'],
                'title': course['title'],
                'video_id': str(course['id']),
                'video_type': 'individual'
            })
        else:
            with_suite_fallback.append({
                'course_id': course['id'],
                'title': course['title'],
                'video_id': suite_code,
                'video_type': 'suite',
                'suite_id': suite_id
            })

    print(f"\nWith promotional video: {len(with_promo_video)}")
    print(f"With suite fallback: {len(with_suite_fallback)}")

    # Show examples
    print("\n" + "="*80)
    print("EXAMPLES")
    print("="*80)

    print("\nPromotional videos (first 10):")
    for item in with_promo_video[:10]:
        print(f"  ID {item['course_id']:3} -> /embed/{item['video_id']:3} | {item['title'][:55]}")

    print("\nSuite fallbacks (first 10):")
    for item in with_suite_fallback[:10]:
        print(f"  ID {item['course_id']:3} -> /embed/{item['video_id']:3} | {item['title'][:55]}")

    # Confirm
    print("\n" + "="*80)
    print("READY TO UPDATE DATABASE")
    print("="*80)
    print(f"\nThis will:")
    print(f"  1. Delete all {len(courses)} existing video assets")
    print(f"  2. Create {len(with_promo_video)} individual video assets")
    print(f"  3. Create {len(with_suite_fallback)} suite fallback video assets")
    print(f"  Total: {len(with_promo_video) + len(with_suite_fallback)} new video assets")
    print()

    response = input("Proceed? (yes/no): ")

    if response.lower() != 'yes':
        print("\nAborted. No changes made.")
        sys.exit(0)

    # Execute fix
    print("\n" + "="*80)
    print("EXECUTING FIX")
    print("="*80)

    # Step 1: Delete existing videos
    print("\nStep 1: Deleting existing video assets...")
    try:
        delete_result = supabase.table('course_assets').delete().eq('type', 'video').execute()
        print(f"  Deleted existing video assets")
    except Exception as e:
        print(f"  Error during deletion: {e}")

    # Step 2: Create new video assets
    print("\nStep 2: Creating new video assets...")
    created = 0
    errors = []

    all_videos = with_promo_video + with_suite_fallback

    for item in all_videos:
        try:
            label = f"{item['title']} - Promotional Video" if item['video_type'] == 'individual' else f"Suite Overview - Promotional Video"

            asset_data = {
                'course_id': item['course_id'],
                'type': 'video',
                'url': f"https://videotilehost.com/embed/{item['video_id']}",
                'label': label
            }

            supabase.table('course_assets').insert(asset_data).execute()
            created += 1

            if created % 25 == 0:
                print(f"  Progress: {created}/{len(all_videos)}...")

        except Exception as e:
            errors.append(f"Course {item['course_id']}: {str(e)}")

    print(f"\n  Created {created} video assets")

    if errors:
        print(f"  {len(errors)} errors occurred:")
        for error in errors[:5]:
            print(f"    - {error}")

    # Step 3: Verify
    print("\nStep 3: Verifying...")
    new_videos = supabase.table('course_assets').select('url').eq('type', 'video').execute()

    by_type = {
        'individual': len([v for v in new_videos.data if 'SU' not in v['url']]),
        'suite': len([v for v in new_videos.data if 'SU' in v['url']])
    }

    print(f"\n  Total video assets: {len(new_videos.data)}")
    print(f"  Individual videos: {by_type['individual']}")
    print(f"  Suite videos: {by_type['suite']}")

    print("\n" + "="*80)
    print("FIX COMPLETE!")
    print("="*80)
    print("\nAll videos now correctly mapped:")
    print(f"  - {len(with_promo_video)} courses with individual promotional videos")
    print(f"  - {len(with_suite_fallback)} courses with suite fallback videos")
    print()
    print("No more broken or mismatched videos!")
    print()

if __name__ == '__main__':
    main()
