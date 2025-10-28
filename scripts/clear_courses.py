#!/usr/bin/env python3
"""Clear all courses and assets from database before re-scraping"""

import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(supabase_url, supabase_key)

print("="*60)
print("CLEARING COURSES AND ASSETS")
print("="*60)

# Get counts before deletion
courses_count = supabase.table('courses').select('id', count='exact').execute().count
assets_count = supabase.table('course_assets').select('id', count='exact').execute().count

print(f"\nBefore deletion:")
print(f"  Courses: {courses_count}")
print(f"  Assets: {assets_count}")

# Delete assets first (foreign key constraint)
print("\nDeleting course assets...")
assets = supabase.table('course_assets').select('id').execute()
for asset in assets.data:
    supabase.table('course_assets').delete().eq('id', asset['id']).execute()

# Delete courses
print("Deleting courses...")
courses = supabase.table('courses').select('id').execute()
for course in courses.data:
    supabase.table('courses').delete().eq('id', course['id']).execute()

# Verify deletion
courses_count_after = supabase.table('courses').select('id', count='exact').execute().count
assets_count_after = supabase.table('course_assets').select('id', count='exact').execute().count

print(f"\nAfter deletion:")
print(f"  Courses: {courses_count_after}")
print(f"  Assets: {assets_count_after}")

print("\n" + "="*60)
print("Database cleared successfully!")
print("Ready to run scraper: python scrape_videotile.py")
print("="*60)
