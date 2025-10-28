#!/usr/bin/env python3
"""
Fix course categorization based on course content and industry standards
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

# Get category IDs
categories_result = supabase.table('categories').select('*').execute()
category_map = {cat['name']: cat['id'] for cat in categories_result.data}

HEALTH_SAFETY_ID = category_map['Health & Safety']
BUSINESS_SKILLS_ID = category_map['Business Skills']
HEALTH_SOCIAL_CARE_ID = category_map['Health & Social Care']
MENTAL_HEALTH_ID = category_map['Mental Health & Wellbeing']
HOSPITALITY_ID = category_map['Hospitality']

# Define recategorization rules based on course titles
RECATEGORIZATION_RULES = {
    # Business Skills - Tech & Digital
    'ai': BUSINESS_SKILLS_ID,
    'chat gpt': BUSINESS_SKILLS_ID,
    'machine learning': BUSINESS_SKILLS_ID,
    'cyber security': BUSINESS_SKILLS_ID,
    'cybersecurity': BUSINESS_SKILLS_ID,
    'gdpr': BUSINESS_SKILLS_ID,
    'data protection': BUSINESS_SKILLS_ID,
    'excel': BUSINESS_SKILLS_ID,
    'microsoft': BUSINESS_SKILLS_ID,

    # Business Skills - Marketing & Social Media
    'facebook': BUSINESS_SKILLS_ID,
    'instagram': BUSINESS_SKILLS_ID,
    'twitter': BUSINESS_SKILLS_ID,
    'tiktok': BUSINESS_SKILLS_ID,
    'linkedin': BUSINESS_SKILLS_ID,
    'social media': BUSINESS_SKILLS_ID,
    'marketing': BUSINESS_SKILLS_ID,
    'seo': BUSINESS_SKILLS_ID,
    'search engine': BUSINESS_SKILLS_ID,

    # Mental Health & Wellbeing
    'mental health': MENTAL_HEALTH_ID,
    'depression': MENTAL_HEALTH_ID,
    'anxiety': MENTAL_HEALTH_ID,
    'wellbeing': MENTAL_HEALTH_ID,
    'stress management': MENTAL_HEALTH_ID,
    'adhd': MENTAL_HEALTH_ID,

    # Hospitality
    'food hygiene': HOSPITALITY_ID,
    'food safety': HOSPITALITY_ID,
    'allergen': HOSPITALITY_ID,
    'alcohol': HOSPITALITY_ID,
    'licensed premises': HOSPITALITY_ID,
    'personal licence': HOSPITALITY_ID,
    'haccp': HOSPITALITY_ID,
}

def determine_correct_category(course_title: str, current_category_id: int) -> int:
    """Determine the correct category for a course based on its title"""
    title_lower = course_title.lower()

    # Check recategorization rules
    for keyword, target_category_id in RECATEGORIZATION_RULES.items():
        if keyword in title_lower:
            return target_category_id

    # If no match found, keep current category
    return current_category_id

def main():
    print("="*80)
    print("FIXING COURSE CATEGORIZATION")
    print("="*80)

    # Get all courses
    courses_result = supabase.table('courses').select('id, title, category_id').execute()
    courses = courses_result.data

    updates = []
    unchanged = 0

    print(f"\nAnalyzing {len(courses)} courses...")

    for course in courses:
        correct_category_id = determine_correct_category(course['title'], course['category_id'])

        if correct_category_id != course['category_id']:
            updates.append({
                'id': course['id'],
                'title': course['title'],
                'old_category': course['category_id'],
                'new_category': correct_category_id
            })
        else:
            unchanged += 1

    print(f"\nFound {len(updates)} courses to recategorize, {unchanged} already correct")

    if len(updates) == 0:
        print("\nNo changes needed!")
        return

    # Show proposed changes
    print("\n" + "="*80)
    print("PROPOSED CHANGES")
    print("="*80)

    category_names = {v: k for k, v in category_map.items()}

    for update in updates:
        old_cat = category_names[update['old_category']]
        new_cat = category_names[update['new_category']]
        print(f"\nID {update['id']}: {update['title']}")
        print(f"  {old_cat} -> {new_cat}")

    # Apply changes
    print("\n" + "="*80)
    print("APPLYING CHANGES")
    print("="*80)

    success_count = 0
    error_count = 0

    for update in updates:
        try:
            result = supabase.table('courses').update({
                'category_id': update['new_category']
            }).eq('id', update['id']).execute()

            if result.data:
                success_count += 1
                print(f"  [OK] Updated course {update['id']}")
            else:
                error_count += 1
                print(f"  [ERROR] Failed to update course {update['id']}")
        except Exception as e:
            error_count += 1
            print(f"  [ERROR] Course {update['id']}: {str(e)}")

    # Summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)
    print(f"Successfully updated: {success_count}")
    print(f"Errors: {error_count}")
    print(f"Unchanged: {unchanged}")

    # Show new distribution
    print("\n" + "="*80)
    print("NEW CATEGORY DISTRIBUTION")
    print("="*80)

    for cat_name, cat_id in sorted(category_map.items(), key=lambda x: x[1]):
        result = supabase.table('courses').select('id', count='exact').eq('category_id', cat_id).execute()
        count = result.count
        print(f"{cat_name}: {count} courses")

    print("="*80)

if __name__ == '__main__':
    main()
