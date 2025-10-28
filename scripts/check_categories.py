#!/usr/bin/env python3
"""
Check course categorization in Supabase
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

# Get all categories
categories_result = supabase.table('categories').select('*').execute()
categories = {cat['id']: cat['name'] for cat in categories_result.data}

print("="*80)
print("COURSE CATEGORIZATION ANALYSIS")
print("="*80)

# Check specific courses mentioned
test_courses = [
    "Introduction to AI",
    "Introduction to AI Prompt Engineering",
    "Introducing GDPR",
    "Cyber Security",
    "Chat GPT Masterclass"
]

for course_title in test_courses:
    result = supabase.table('courses').select('id, title, category_id').ilike('title', f'%{course_title}%').execute()
    if result.data:
        for course in result.data:
            cat_name = categories.get(course['category_id'], 'Unknown')
            print(f"\nCourse: {course['title']}")
            print(f"  Current Category: {cat_name}")
            print(f"  Course ID: {course['id']}")

# Get course count by category
print("\n" + "="*80)
print("COURSE DISTRIBUTION BY CATEGORY")
print("="*80)

for cat_id, cat_name in sorted(categories.items(), key=lambda x: x[0]):
    result = supabase.table('courses').select('id', count='exact').eq('category_id', cat_id).execute()
    count = result.count
    print(f"{cat_name}: {count} courses")

print("="*80)
