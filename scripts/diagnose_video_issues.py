#!/usr/bin/env python3
"""
Diagnostic script to investigate video loading and mismatch issues
"""

import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, '.env.local'))

# Courses with video loading issues
NOT_LOADING = [
    'COVID', 'EFAW for Irish audience', 'Intro to RISK Assessments',
    'Licenced premises staff training', 'Managing occupational health',
    'Noise awareness', 'PAT testing positive handling in schools',
    'Prep for CITB H@S', 'Prevent duty', 'Confined space',
    'Workplace Health and Safety', 'Disciplinary Measures', 'Ethics in AI',
    'Microsoft advanced', 'Microsoft beginner', 'Negotiation',
    'Prep for job interview', 'presentation skills', 'prob solving in workplace',
    'Sales skills'
]

# Courses with mismatched video previews
MISMATCHED = {
    'Implementing workplace Mental Health Policy': 'Video on HACPP Hazard analysis',
    'Chat GPT masterclass': 'Video on Conflict resolution',
    'Cyber securities': 'Video on Developing good work relationships',
    'Disciplinary procedures': 'Video on Ethics in AI',
    'Instagram marketing': 'Video on Intro to GDPR',
    'Machine learning': 'Video on Managing meetings',
    'Microsoft intermediate': 'Video on Modern Slavery',
    'SMART objectives': 'Video on Social media marketing'
}

def normalize_for_search(title: str) -> str:
    """Normalize title for fuzzy searching"""
    return title.lower().strip()

def main():
    # Initialize Supabase
    supabase_url = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

    if not supabase_url or not supabase_key:
        print("[ERROR] Supabase credentials not found in .env.local")
        sys.exit(1)

    supabase: Client = create_client(supabase_url, supabase_key)

    print("="*80)
    print("VIDEO ISSUE DIAGNOSTIC REPORT")
    print("="*80)

    # Get all courses with their assets
    courses_response = supabase.table('courses').select(
        'id, title, slug, icon_url, description'
    ).execute()

    assets_response = supabase.table('course_assets').select(
        'course_id, type, url, label'
    ).execute()

    courses = courses_response.data
    assets = assets_response.data

    # Build asset lookup
    course_assets = {}
    for asset in assets:
        course_id = asset['course_id']
        if course_id not in course_assets:
            course_assets[course_id] = []
        course_assets[course_id].append(asset)

    print(f"\nTotal courses in database: {len(courses)}")
    print(f"Total assets in database: {len(assets)}")

    # Investigate non-loading videos
    print("\n" + "="*80)
    print("PART 1: COURSES WITH NON-LOADING VIDEOS")
    print("="*80)

    found_count = 0
    not_found = []

    for problem_title in NOT_LOADING:
        normalized_problem = normalize_for_search(problem_title)

        # Try to find matching course
        matches = []
        for course in courses:
            normalized_course = normalize_for_search(course['title'])
            if normalized_problem in normalized_course or normalized_course in normalized_problem:
                matches.append(course)

        if matches:
            for course in matches:
                found_count += 1
                print(f"\n[FOUND] '{problem_title}'")
                print(f"  Database Title: {course['title']}")
                print(f"  Course ID: {course['id']}")
                print(f"  Slug: {course['slug']}")

                # Check assets
                course_id = course['id']
                if course_id in course_assets:
                    for asset in course_assets[course_id]:
                        if asset['type'] == 'video':
                            print(f"  Video URL: {asset['url']}")
                else:
                    print(f"  [WARNING] No assets found for this course!")
        else:
            not_found.append(problem_title)

    print(f"\n[SUMMARY] Found {found_count} matches for non-loading videos")
    if not_found:
        print(f"[WARNING] Could not find matches for: {', '.join(not_found)}")

    # Investigate mismatched videos
    print("\n" + "="*80)
    print("PART 2: COURSES WITH MISMATCHED VIDEO PREVIEWS")
    print("="*80)

    mismatch_found = 0
    mismatch_not_found = []

    for problem_title, wrong_video in MISMATCHED.items():
        normalized_problem = normalize_for_search(problem_title)

        # Try to find matching course
        matches = []
        for course in courses:
            normalized_course = normalize_for_search(course['title'])
            if normalized_problem in normalized_course or normalized_course in normalized_problem:
                matches.append(course)

        if matches:
            for course in matches:
                mismatch_found += 1
                print(f"\n[FOUND] '{problem_title}'")
                print(f"  Database Title: {course['title']}")
                print(f"  Course ID: {course['id']}")
                print(f"  Slug: {course['slug']}")
                print(f"  Reported Issue: {wrong_video}")

                # Check assets
                course_id = course['id']
                if course_id in course_assets:
                    for asset in course_assets[course_id]:
                        if asset['type'] == 'video':
                            print(f"  Video URL: {asset['url']}")
                            print(f"  [ANALYSIS] Video URL uses course ID {course_id}")
                else:
                    print(f"  [WARNING] No assets found for this course!")
        else:
            mismatch_not_found.append(problem_title)

    print(f"\n[SUMMARY] Found {mismatch_found} matches for mismatched videos")
    if mismatch_not_found:
        print(f"[WARNING] Could not find matches for: {', '.join(mismatch_not_found)}")

    # Analysis and recommendations
    print("\n" + "="*80)
    print("ANALYSIS & RECOMMENDATIONS")
    print("="*80)

    print("\n1. VIDEO URL CONSTRUCTION:")
    print("   Current pattern: https://videotilehost.com/embed/{course_id}")
    print("   This pattern assumes VideoTile has a 1:1 mapping of course IDs to videos.")
    print("   If videos don't load or are mismatched, possible causes:")
    print("   - VideoTile doesn't have videos for all course IDs")
    print("   - VideoTile's video IDs don't match their course IDs")
    print("   - Videos were removed or relocated on VideoTile's server")

    print("\n2. RECOMMENDED ACTIONS:")
    print("   a) Verify video URLs manually by visiting a sample of embed URLs")
    print("   b) Contact VideoTile to get correct video ID mapping")
    print("   c) Consider scraping video IDs from actual course pages")
    print("   d) Add video availability check to the scraper")

    print("\n3. QUICK TEST:")
    print("   Test these URLs in browser to verify the pattern:")
    if courses:
        test_course = courses[0]
        print(f"   - Sample course: {test_course['title']}")
        print(f"   - Course ID: {test_course['id']}")
        test_video_url = f"https://videotilehost.com/embed/{test_course['id']}"
        print(f"   - Video URL: {test_video_url}")
        print(f"   - Icon URL: {test_course['icon_url']}")

    print("\n" + "="*80)

if __name__ == '__main__':
    main()
