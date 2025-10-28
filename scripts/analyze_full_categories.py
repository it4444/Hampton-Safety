#!/usr/bin/env python3
"""
Full analysis of course categories to plan fixes
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

print("="*80)
print("FULL COURSE CATEGORY ANALYSIS")
print("="*80)

# Get all categories
categories_result = supabase.table('categories').select('*').execute()
categories = {cat['id']: cat for cat in categories_result.data}

print("\nCategories in database:")
for cat_id, cat in sorted(categories.items()):
    print(f"  {cat_id}: {cat['name']} (Suite {cat['suite_id']})")

# Get all courses with their categories
courses_result = supabase.table('courses').select('id, title, category_id').execute()
courses = courses_result.data

# Check for duplicates
print("\n" + "="*80)
print("DUPLICATE COURSES (Same ID)")
print("="*80)

course_ids = {}
for course in courses:
    cid = course['id']
    if cid in course_ids:
        print(f"\nDuplicate ID {cid}:")
        print(f"  1. {course_ids[cid]['title']} (category: {categories[course_ids[cid]['category_id']]['name']})")
        print(f"  2. {course['title']} (category: {categories[course['category_id']]['name']})")
    else:
        course_ids[cid] = course

# List courses by category
print("\n" + "="*80)
print("COURSES BY CATEGORY (First 5 per category)")
print("="*80)

for cat_id, cat in sorted(categories.items()):
    cat_courses = [c for c in courses if c['category_id'] == cat_id]
    print(f"\n{cat['name']} ({len(cat_courses)} courses):")
    for course in cat_courses[:5]:
        print(f"  - {course['title']}")
    if len(cat_courses) > 5:
        print(f"  ... and {len(cat_courses) - 5} more")

# Find misplaced AI/Tech courses in Health & Social Care
print("\n" + "="*80)
print("POTENTIALLY MISPLACED COURSES IN HEALTH & SOCIAL CARE")
print("="*80)

hsc_category_id = None
for cat_id, cat in categories.items():
    if cat['name'] == 'Health & Social Care':
        hsc_category_id = cat_id
        break

if hsc_category_id:
    hsc_courses = [c for c in courses if c['category_id'] == hsc_category_id]

    # Look for tech/business keywords
    tech_keywords = ['ai', 'cyber', 'gdpr', 'social media', 'excel', 'facebook', 'instagram',
                     'tiktok', 'twitter', 'linkedin', 'seo', 'marketing', 'chat gpt', 'machine learning']

    misplaced = []
    for course in hsc_courses:
        title_lower = course['title'].lower()
        if any(keyword in title_lower for keyword in tech_keywords):
            misplaced.append(course)

    print(f"\nFound {len(misplaced)} courses that should likely be in Business Skills:")
    for course in misplaced:
        print(f"  ID {course['id']}: {course['title']}")

print("\n" + "="*80)
