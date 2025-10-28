#!/usr/bin/env python3
"""
Quick script to check description coverage in Supabase
"""

import os
import sys
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

# Initialize Supabase
supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not supabase_url or not supabase_key:
    print("[ERROR] Supabase credentials not found")
    sys.exit(1)

supabase = create_client(supabase_url, supabase_key)

# Get total courses
total_result = supabase.table('courses').select('id', count='exact').execute()
total_courses = total_result.count

# Get courses with descriptions
with_desc_result = supabase.table('courses').select('id', count='exact').not_.is_('description', 'null').neq('description', '').execute()
with_descriptions = with_desc_result.count

# Get courses without descriptions
without_desc_result = supabase.table('courses').select('id, title').or_('description.is.null,description.eq.').execute()
without_descriptions = len(without_desc_result.data)

print("="*60)
print("DESCRIPTION COVERAGE REPORT")
print("="*60)
print(f"Total courses: {total_courses}")
print(f"With descriptions: {with_descriptions} ({with_descriptions/total_courses*100:.1f}%)")
print(f"Without descriptions: {without_descriptions} ({without_descriptions/total_courses*100:.1f}%)")

if without_descriptions > 0:
    print(f"\nCourses missing descriptions:")
    for course in without_desc_result.data:
        print(f"  - ID {course['id']}: {course['title']}")

print("="*60)
