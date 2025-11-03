# Video Issues Autopsy Report
## Hampton Safety Training Catalogue - Data Anomaly Investigation

**Date**: 2025-11-03
**Investigator**: Claude Code Analysis
**Status**: Complete

---

## Executive Summary

Investigation into video loading failures and content mismatches revealed **three root causes**:

1. **Missing courses in database** (134 found vs 139 expected)
2. **Incorrect video URL pattern assumption** (1:1 course ID to video ID mapping)
3. **Scraper limitations** with courses lacking free trial links

---

## Part 1: Data Collection Issues

### 1.1 Database vs Source Files Discrepancy

**Finding**: Only 134 courses in Supabase database, but 139 courses expected per README.

**Missing Courses Identified**:

| Course Title | Course ID | Source File | Has Free Trial? |
|-------------|-----------|-------------|-----------------|
| Microsoft Excel - Advanced | 352 | Business Skills.html | ❌ No |
| Microsoft Excel - Beginner | 350 | Business Skills.html | ❌ No |
| Microsoft Excel - Intermediate | 351 | Business Skills.html | ❌ No |
| Implementing a Workplace Mental Health Policy | 305 | Health & Safety.html | ❌ No |
| Licensed Premises Staff Training | ? | Multiple files | ? |

**Root Cause**: Courses without "Free Trial" links may have been skipped during scraping, OR these are newer courses added after the last scrape.

### 1.2 Duplicate Courses Across Category Files

**Finding**: Several courses appear in multiple HTML source files, potentially causing confusion:

- **Managing Occupational Health and Wellbeing** (ID: 148)
  - Appears in: Health & Safety.html, Health & Social Care.html, Business Skills.html

- **Emergency First Aid at Work For Irish Audiences** (ID: 139)
  - Appears in: Health & Safety.html, Health & Social Care.html

**Impact**: This is actually fine - these are legitimate cross-category courses. Database should only store once by course ID.

---

## Part 2: Video Loading Issues

### 2.1 Current Video URL Construction

**Method**: `https://videotilehost.com/embed/{course_id}`

**Source**: scripts/scrape_videotile.py, lines 306-310
```python
video_asset = {
    'type': 'video',
    'url': f"https://videotilehost.com/embed/{course_id}",
    'label': f"{course_title} - Promotional Video"
}
```

**Assumption**: VideoTile has a 1:1 mapping between course IDs and video embed IDs.

### 2.2 Non-Loading Videos Analysis

**Courses Reported** (21 total):
- COVID → Found as ID 136 ✓
- Managing occupational health → Found as ID 148 ✓
- Noise awareness → Found as ID 107 ✓
- PAT testing positive handling → Found as ID 58 ✓
- Confined space → Found as ID 73 ✓
- Ethics in AI → Found as ID 303 ✓
- Sales skills → Found as ID 67 ✓
- EFAW for Irish audience → Found as ID 139 ✓
- Intro to RISK Assessments → Found as ID 74 ✓
- Licenced premises staff training → ❌ Not in database
- Prep for CITB H@S → Found as ID 130 ✓
- Prevent duty → Found as ID 53 ✓
- Workplace Health and Safety → Found as ID 63 ✓
- Disciplinary Measures → ❌ Not found
- Microsoft advanced → ❌ Not in database (ID: 352)
- Microsoft beginner → ❌ Not in database (ID: 350)
- Negotiation → Found as ID 40 ✓
- Prep for job interview → Found as ID 140 ✓
- presentation skills → Found as ID 38 ✓
- prob solving in workplace → Found as ID 149 ✓

**Diagnosis**:
- Some courses exist in database but videos don't load
- Some courses missing from database entirely
- **Hypothesis**: VideoTile's video hosting may not have videos for all course IDs, OR video IDs don't match course IDs

---

## Part 3: Video Content Mismatches

### 3.1 Mismatched Video Previews

**Courses with Wrong Video Content**:

| Course Title | Course ID | Wrong Video Showing |
|-------------|-----------|---------------------|
| Implementing workplace Mental Health Policy | 305 | HACCP Hazard analysis |
| Chat GPT masterclass | 34 | Conflict resolution |
| Cyber securities | 128 | Developing good work relationships |
| Disciplinary procedures | 43 | Ethics in AI |
| Instagram marketing | 116 | Intro to GDPR |
| Machine learning | 110 | Managing meetings |
| Microsoft intermediate | 351 | Modern Slavery |
| SMART objectives | 159 | Social media marketing |

**Pattern Analysis**:
- All courses found in HTML source files with proper course IDs
- Video URLs constructed as `https://videotilehost.com/embed/{course_id}`
- **The videos that load are for DIFFERENT courses**

**Critical Finding**: This proves that VideoTile's video embed IDs **DO NOT** match course IDs in a 1:1 relationship.

Example:
- Course: "Chat GPT masterclass" (ID: 34)
- Video URL generated: `https://videotilehost.com/embed/34`
- **Actual video at that URL**: "Conflict resolution"

### 3.2 What This Means

VideoTile likely uses a **separate video ID system** that doesn't correspond to course IDs (nid values). The embed URLs may be:
- Using a different ID numbering system
- Pointing to video IDs that were assigned independently
- Some videos may be shared across multiple courses
- Some courses may not have promotional videos at all

---

## Part 4: Source Data Structure Analysis

### 4.1 HTML File Structure (course-listings/)

```
course-listings/
├── Business Skills.html (62KB)
├── Health & Safety.html (75KB)
└── Health & Social Care.html (45KB)
```

**Typical Course Entry Structure**:
```html
<h2 class="vtheading">Course Title</h2>
<p class="vtptext">
  <img class="vticons" src="https://videotilehost.com/common/course-icons/course{ID}.png">
  Description text...
</p>
<p class="vtdetails">Approved by... - Duration... - Price...</p>
<a class="vtbuttons" href="...freeTrial.php?trial={ID}">Free Trial</a>
<a class="vtbuttons" href="...purchaseCourse.php?nid={ID}">Buy Now</a>
```

**Exceptions Found**:
1. Some courses **only have Buy Now** (no Free Trial):
   - Microsoft Excel courses (350, 351, 352)
   - Implementing a Workplace Mental Health Policy (305)

2. These courses are **higher priced** (£149-£249 vs £25-£35 typical)

### 4.2 Scraper Logic Analysis

**File**: scripts/scrape_videotile.py

**Current Process**:
1. Parse HTML from `https://videotilehost.com/hamptonsafety/adminWebsiteContent.php`
2. Find purchase links: `purchaseCourse.php?nid={ID}`
3. Extract course ID from `nid` parameter
4. Optionally find free trial link
5. **Construct video URL**: `https://videotilehost.com/embed/{course_id}`
6. **Construct icon URL**: `https://videotilehost.com/common/course-icons/course{course_id}.png`

**What Works**:
- Icon URLs work correctly (icon IDs = course IDs) ✓
- Course extraction from purchase links ✓
- Basic course data collection ✓

**What Doesn't Work**:
- Video embed URLs don't match course IDs ❌
- No validation that videos actually exist ❌
- Assumes 1:1 mapping without verification ❌

---

## Part 5: Root Cause Analysis

### 5.1 Primary Issue: Incorrect Video ID Assumption

**The Problem**:
```python
# This assumes video ID = course ID (INCORRECT)
video_url = f"https://videotilehost.com/embed/{course_id}"
```

**Reality**:
- VideoTile uses separate video IDs
- No direct mapping from course ID to video ID
- Need to scrape actual video IDs from somewhere else

### 5.2 Where to Find Real Video IDs

**Options to investigate**:

1. **Individual course pages**: Each course likely has a page like:
   ```
   https://videotilehost.com/hamptonsafety/courseDetails.php?nid={course_id}
   ```
   This page probably contains the actual video embed with correct video ID.

2. **Admin page video elements**: The admin page might have video previews with actual embed codes.

3. **Trial/Purchase pages**: These pages might show preview videos with correct IDs.

4. **API endpoints**: VideoTile might have an API that maps course IDs to video IDs.

### 5.3 Missing Courses Issue

**Courses without free trials** appear to be premium/live training:
- Microsoft Excel courses (1-day virtual classes, £149-£249)
- These are different from standard e-learning courses

**Solution**: Scraper needs to handle courses without trial links.

---

## Part 6: Recommendations

### 6.1 Immediate Actions

1. **Contact VideoTile Support**:
   - Request proper video ID mapping documentation
   - Ask for API documentation
   - Clarify the relationship between course IDs (nid) and video embed IDs

2. **Manual Verification**:
   - Visit 5-10 sample course pages on VideoTile
   - Inspect video embed code in browser
   - Document actual video ID pattern

3. **Update User Expectations**:
   - Add disclaimer that some courses may not have video previews
   - Hide video preview section if video doesn't load properly

### 6.2 Short-term Solutions

**Option A**: Enhanced Scraper
```python
# Scrape actual video IDs from individual course pages
def scrape_video_id(course_id):
    url = f"https://videotilehost.com/hamptonsafety/courseDetails.php?nid={course_id}"
    page = fetch_page(url)
    # Extract actual video embed URL from page
    video_embed = page.find('iframe', src=re.compile('embed'))
    if video_embed:
        return extract_video_id(video_embed['src'])
    return None
```

**Option B**: Fallback Strategy
```python
# Try to load video, fall back to placeholder if fails
def get_video_asset(course_id, course_title):
    video_url = f"https://videotilehost.com/embed/{course_id}"
    # Add flag to indicate this needs verification
    return {
        'type': 'video',
        'url': video_url,
        'label': f"{course_title} - Promotional Video",
        'needs_verification': True
    }
```

**Option C**: Client-side Error Handling
```javascript
// In the course detail page component
<iframe
  src={videoUrl}
  onError={() => setVideoAvailable(false)}
/>
{!videoAvailable && (
  <div>Video preview not available for this course</div>
)}
```

### 6.3 Long-term Solutions

1. **Database Schema Update**:
   - Add `video_id` column (separate from course `id`)
   - Add `video_verified` boolean flag
   - Add `last_video_check` timestamp

2. **Video Verification Script**:
   - Periodically check if video URLs are working
   - Update database with working/broken status
   - Generate report of courses needing video updates

3. **Improved Scraper Architecture**:
   ```python
   class VideoTileScraper:
       def scrape_course_list(self):
           # Get basic course info from admin page
           pass

       def scrape_course_details(self, course_id):
           # Get detailed info including REAL video ID
           pass

       def verify_video_availability(self, video_url):
           # Check if video actually exists
           pass
   ```

### 6.4 Quick Win: Fix Missing Courses

**Action**: Re-run scraper with fix to handle courses without trial links

**Current code** (lines 216-219):
```python
# Check for free trial URL
free_trial_url = None
trial_link = element.find('a', href=lambda h: h and 'freeTrial.php' in h)
if trial_link:
    free_trial_url = urljoin(ADMIN_URL, trial_link['href'])
```

This already handles optional trial links correctly. The issue is likely:
1. Courses were added to VideoTile after last scrape
2. Or scraper failed on those specific courses due to HTML structure differences

**Fix**: Re-run scraper and check for errors:
```bash
cd scripts
python scrape_videotile.py --dry-run
```

---

## Part 7: Testing Plan

### 7.1 Video URL Pattern Testing

**Test these URLs manually in browser**:

```
# Sample courses with issues
https://videotilehost.com/embed/34   # Chat GPT (shows Conflict Resolution?)
https://videotilehost.com/embed/43   # Disciplinary Procedures (shows Ethics in AI?)
https://videotilehost.com/embed/136  # COVID (not loading?)
https://videotilehost.com/embed/303  # Ethics in AI (not loading?)

# Sample courses reportedly working
https://videotilehost.com/embed/26   # Abrasive Wheels
https://videotilehost.com/embed/64   # Food Hygiene Rating Level 5
```

**Document**:
- Which URLs load videos successfully
- Which videos are mismatched
- Which URLs return 404 or empty content
- Any patterns in working vs broken IDs

### 7.2 Course Detail Page Testing

**Visit individual course pages**:
```
https://videotilehost.com/hamptonsafety/courseDetails.php?nid=34
https://videotilehost.com/hamptonsafety/courseDetails.php?nid=136
```

**Look for**:
- Video embed iframe with actual video ID
- Preview video player
- Any JavaScript that loads videos dynamically

---

## Part 8: Implementation Priority

### Priority 1: Critical (Do Now)
1. ✓ Complete this autopsy (DONE)
2. Manual test 10 video URLs to confirm mismatch pattern
3. Contact VideoTile for video ID mapping

### Priority 2: High (This Week)
1. Re-run scraper to capture any missing courses
2. Implement client-side error handling for broken videos
3. Add disclaimer about video availability

### Priority 3: Medium (This Sprint)
1. Update scraper to extract real video IDs from course pages
2. Add video verification to database
3. Create video health check script

### Priority 4: Low (Future Enhancement)
1. Automated video verification system
2. Fallback to course images when video unavailable
3. Cache video availability status

---

## Part 9: Questions for VideoTile

**Email Template**:

```
Subject: Video Embed ID Mapping - Hampton Safety Account

Hi VideoTile Support Team,

We're implementing the online training catalogue for Hampton Safety and have encountered some issues with video preview embeds. We'd appreciate clarification on:

1. Video ID Mapping:
   - Do video embed IDs match course IDs (nid parameter)?
   - Example: Course ID 34 (Chat GPT) seems to show a different video at /embed/34

2. Missing Videos:
   - Some course IDs don't seem to have videos at /embed/{id}
   - Is this expected? Do all courses have promotional videos?

3. Best Practice:
   - What's the recommended way to get video embed URLs for course previews?
   - Is there an API or admin page that shows the correct video ID mapping?

4. Premium Courses:
   - Courses 350-352 (Microsoft Excel) don't have free trial links
   - Should these be handled differently?

Our current implementation:
- Source: adminWebsiteContent.php
- Video URLs: https://videotilehost.com/embed/{course_id}
- Icon URLs: https://videotilehost.com/common/course-icons/course{course_id}.png (these work!)

Could you provide guidance on the correct video embedding approach?

Thank you!
```

---

## Appendix A: Affected Courses Reference

### Courses Not Loading Videos (in database)
- Covid-19 Safe Workplaces (136)
- Managing Occupational Health and Wellbeing (148)
- Noise Awareness (107)
- Positive Handling in Schools (58)
- Prevent Duty (53)
- Working in Confined Spaces (73)
- Workplace Health and Safety (63)
- Ethics in AI (303)
- Negotiation (40)
- Presentation Skills (38)
- Sales Skills (67)

### Courses with Mismatched Videos (in database)
- Chat GPT Masterclass (34) → shows Conflict resolution
- Disciplinary Procedures (43) → shows Ethics in AI
- Instagram Marketing Strategies (116) → shows Intro to GDPR
- Machine Learning Foundation (110) → shows Managing meetings
- Smart Objectives (159) → shows Social media marketing

### Courses Missing from Database
- Microsoft Excel - Advanced (352)
- Microsoft Excel - Beginner (350)
- Microsoft Excel - Intermediate (351)
- Implementing a Workplace Mental Health Policy (305)
- Licensed Premises Staff Training (ID unknown)
- Possibly others

---

## Appendix B: File References

**Source Files**:
- `course-listings/Business Skills.html`
- `course-listings/Health & Safety.html`
- `course-listings/Health & Social Care.html`

**Scraper Files**:
- `scripts/scrape_videotile.py` (main scraper)
- `scripts/parse_descriptions.py` (description parser)
- `scripts/diagnose_video_issues.py` (this investigation)

**Database**:
- Table: `courses` (134 courses currently)
- Table: `course_assets` (268 assets = 134 × 2)
- Supabase connection via `.env.local`

---

## Conclusion

The video issues stem from a **fundamental architectural assumption** that course IDs map 1:1 to video embed IDs. This assumption is incorrect. To fix properly, we need to:

1. **Obtain real video ID mappings** from VideoTile
2. **Update scraper** to extract actual video IDs
3. **Add validation** to verify videos exist before publishing
4. **Implement fallbacks** for courses without videos

In the meantime, implementing client-side error handling will prevent broken video embeds from degrading the user experience.

**Next Step**: Manual testing of video URLs to confirm the diagnosis before contacting VideoTile.
