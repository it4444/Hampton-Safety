#!/usr/bin/env python3
"""
Validate Supabase connection and database schema
Run this before executing the scraper to ensure everything is set up correctly
"""

import os
import sys
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

def validate_connection():
    """Test Supabase connection"""
    print("="*60)
    print("SUPABASE CONNECTION VALIDATION")
    print("="*60 + "\n")

    # Check environment variables
    print("1. Checking environment variables...")
    supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url:
        print("   [X] NEXT_PUBLIC_SUPABASE_URL not found in .env.local")
        return False

    if not supabase_key:
        print("   [X] SUPABASE_SERVICE_ROLE_KEY not found in .env.local")
        return False

    print(f"   [OK] NEXT_PUBLIC_SUPABASE_URL: {supabase_url}")
    print(f"   [OK] SUPABASE_SERVICE_ROLE_KEY: {'*' * 20}...{supabase_key[-10:]}")
    print()

    # Initialize Supabase client
    print("2. Connecting to Supabase...")
    try:
        supabase = create_client(supabase_url, supabase_key)
        print("   [OK] Supabase client initialized successfully")
        print()
    except Exception as e:
        print(f"   [X] Failed to initialize Supabase client: {str(e)}")
        return False

    # Test categories table
    print("3. Validating 'categories' table...")
    try:
        response = supabase.table('categories').select('*').execute()
        categories = response.data

        if len(categories) == 0:
            print("   [!] Categories table exists but is empty")
            print("   [i] The migration should have inserted 5 categories")
            return False

        print(f"   [OK] Categories table exists with {len(categories)} categories")

        # Expected categories
        expected_categories = {
            1: 'Health & Safety',
            2: 'Business Skills',
            3: 'Health & Social Care',
            4: 'Mental Health & Wellbeing',
            5: 'Hospitality'
        }

        print("\n   Categories found:")
        for cat in sorted(categories, key=lambda x: x['suite_id']):
            suite_id = cat['suite_id']
            name = cat['name']
            expected_name = expected_categories.get(suite_id)

            if expected_name and name == expected_name:
                print(f"      [OK] Suite {suite_id}: {name}")
            else:
                print(f"      [!] Suite {suite_id}: {name} (expected: {expected_name})")

        print()

    except Exception as e:
        print(f"   [X] Error querying categories table: {str(e)}")
        print(f"   [i] Make sure you ran the migration SQL in Supabase dashboard")
        return False

    # Test courses table
    print("4. Validating 'courses' table...")
    try:
        response = supabase.table('courses').select('id').limit(1).execute()
        print(f"   [OK] Courses table exists")

        # Check if empty (expected before scraping)
        count_response = supabase.table('courses').select('id', count='exact').execute()
        course_count = count_response.count if count_response.count else 0

        if course_count == 0:
            print(f"   [i] Courses table is empty (expected before scraping)")
        else:
            print(f"   [i] Courses table contains {course_count} courses")

        print()

    except Exception as e:
        print(f"   [X] Error querying courses table: {str(e)}")
        return False

    # Test course_assets table
    print("5. Validating 'course_assets' table...")
    try:
        response = supabase.table('course_assets').select('id').limit(1).execute()
        print(f"   [OK] Course assets table exists")
        print()
    except Exception as e:
        print(f"   [X] Error querying course_assets table: {str(e)}")
        return False

    # Summary
    print("="*60)
    print("VALIDATION SUMMARY")
    print("="*60)
    print("[OK] Database connection: SUCCESS")
    print("[OK] All required tables exist")
    print(f"[OK] Categories populated: {len(categories)}/5")
    print(f"[i] Courses in database: {course_count}")
    print()

    if course_count == 0:
        print(">>> Ready to run the scraper!")
        print("    Run: python scrape_videotile.py")
    else:
        print("[i] Database already contains courses")
        print("    Re-running scraper will update existing courses")

    print("="*60)

    return True

if __name__ == '__main__':
    try:
        success = validate_connection()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\n[X] Validation failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
