#!/usr/bin/env python3
"""Check course assets in database"""

import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(supabase_url, supabase_key)

# Get asset counts
assets_response = supabase.table('course_assets').select('type', count='exact').execute()
print(f"\nTotal assets in database: {assets_response.count}")

# Count by type
video_count = supabase.table('course_assets').select('id', count='exact').eq('type', 'video').execute()
pdf_count = supabase.table('course_assets').select('id', count='exact').eq('type', 'pdf').execute()

print(f"  Video assets: {video_count.count}")
print(f"  PDF assets: {pdf_count.count}")

# Sample a few courses with assets
sample_courses = supabase.table('courses').select('id, title, icon_url, description, purchase_url, free_trial_url').limit(3).execute()

print("\n" + "="*60)
print("SAMPLE COURSES")
print("="*60)

for course in sample_courses.data:
    print(f"\nCourse: {course['title']}")
    print(f"  ID: {course['id']}")
    print(f"  Icon: {course['icon_url'][:60] if course['icon_url'] else 'None'}...")
    print(f"  Description: {'YES' if course['description'] else 'NO (null)'}")
    print(f"  Purchase URL: {course['purchase_url'][:60] if course['purchase_url'] else 'None'}...")
    print(f"  Free Trial URL: {course['free_trial_url'][:60] if course['free_trial_url'] else 'None'}...")

    # Get assets for this course
    assets = supabase.table('course_assets').select('type, url, label').eq('course_id', course['id']).execute()
    print(f"  Assets ({len(assets.data)}):")
    for asset in assets.data:
        print(f"    - {asset['type']}: {asset['url'][:60]}...")

print("\n" + "="*60)
