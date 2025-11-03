# Video Fix Strategy - Corrected Approach

**Date**: 2025-11-03
**Status**: Solution Identified

---

## Root Cause (CONFIRMED)

The scraper attempted to create individual video URLs per course:
```python
url = f"https://videotilehost.com/embed/{course_id}"  # WRONG
```

But VideoTile only provides **suite-level promotional videos**, not individual course videos.

---

## Actual Video Structure (from adminWebsiteContent.php)

VideoTile provides embed codes for **categories/suites only**:

| Suite Name | Suite ID | Video Embed URL |
|-----------|----------|-----------------|
| Generic eLearning | ALL | `https://videotilehost.com/embed/ALL` |
| Health & Safety | 1 | `https://videotilehost.com/embed/SU1` |
| Business Skills | 2 | `https://videotilehost.com/embed/SU2` |
| Health & Social Care | 3 | `https://videotilehost.com/embed/SU3` |
| Mental Health & Wellbeing | 4 | `https://videotilehost.com/embed/SU4` (probably) |
| Hospitality | 5 | `https://videotilehost.com/embed/SU5` (probably) |

**Note from VideoTile**:
> "If a course does not have embed code in this section, there is currently no promo video available for that course."

This means **most individual courses don't have videos** - only suite-level promotional content exists.

---

## Suite Mapping (from scraper)

```python
SUITE_MAPPING = {
    1: 'Health & Safety',        # SU1
    2: 'Business Skills',         # SU2
    3: 'Health & Social Care',    # SU3
    4: 'Mental Health & Wellbeing', # SU4 (assumed)
    5: 'Hospitality'              # SU5 (assumed)
}
```

---

## Solution Options

### Option 1: Suite-Level Videos Only (Recommended)

**Show one promotional video per category page**, not on individual course pages.

**Changes needed:**
1. **Remove video assets from individual courses**
2. **Add suite video to category listing pages**
3. **Update database schema**:
   ```sql
   -- Add to categories table
   ALTER TABLE categories ADD COLUMN video_embed_code VARCHAR(10);

   -- Update with suite codes
   UPDATE categories SET video_embed_code = 'SU1' WHERE suite_id = 1;
   UPDATE categories SET video_embed_code = 'SU2' WHERE suite_id = 2;
   UPDATE categories SET video_embed_code = 'SU3' WHERE suite_id = 3;
   UPDATE categories SET video_embed_code = 'SU4' WHERE suite_id = 4;
   UPDATE categories SET video_embed_code = 'SU5' WHERE suite_id = 5;
   ```

4. **Display on training catalogue page**:
   ```tsx
   // When user filters by category, show that category's video
   {selectedCategory && (
     <div className="category-video mb-8">
       <h3>About {categoryName} Courses</h3>
       <iframe
         src={`https://videotilehost.com/embed/${categoryVideoCode}`}
         width="853"
         height="480"
         style={{border: 0}}
         allowFullScreen
       />
     </div>
   )}
   ```

**Pros:**
- Uses actual VideoTile-provided content ✓
- No broken videos ✓
- Clean, simple implementation ✓
- Shows generic video when "All" selected ✓

**Cons:**
- No individual course videos (but they don't exist anyway)

---

### Option 2: Fallback to Suite Video on Course Pages

**Show suite video on individual course detail pages** as a fallback.

**Implementation**:
```tsx
// On course detail page
const videoUrl = course.individualVideoId
  ? `https://videotilehost.com/embed/${course.individualVideoId}`
  : `https://videotilehost.com/embed/${course.category.suiteCode}`;

<div className="course-preview">
  <h3>Course Preview</h3>
  <p className="text-sm text-gray-600">
    {course.individualVideoId
      ? "Watch this course preview"
      : `Watch a ${course.category.name} overview`}
  </p>
  <iframe src={videoUrl} .../>
</div>
```

**Pros:**
- Every course page has a video ✓
- Can add individual videos later if VideoTile provides them ✓

**Cons:**
- Same video appears on multiple course pages
- Might be confusing (generic suite video vs specific course)

---

### Option 3: No Videos on Course Pages

**Remove video embeds entirely from individual course pages.**

Keep them simple with:
- Course icon
- Description
- Purchase/Trial CTAs
- PDF download link

**Pros:**
- Honest representation of available content ✓
- Clean, fast pages ✓
- No confusion ✓

**Cons:**
- Less engaging than having video content

---

## Recommended Implementation

### Phase 1: Quick Fix (Remove broken videos)

1. **Update scraper to NOT create video assets**:
   ```python
   def construct_assets(self):
       """Construct PDF assets only - videos are suite-level"""
       for course in self.courses:
           # Only PDF, no video
           pdf_asset = {
               'type': 'pdf',
               'url': f"https://videotilehost.com/common/courses/info_{course['id']}.pdf",
               'label': f"{course['title']} - Course Information"
           }
           course['assets'] = [pdf_asset]
   ```

2. **Hide video section on course pages** (frontend):
   ```tsx
   // Remove or comment out video iframe rendering
   // Only show PDF download button
   ```

3. **Clean up database**:
   ```sql
   -- Remove all video assets
   DELETE FROM course_assets WHERE type = 'video';
   ```

### Phase 2: Add Suite Videos (Enhancement)

1. **Add video codes to categories table**
2. **Update training catalogue page** to show category videos
3. **Add "ALL" generic video to homepage** training section

---

## Database Migration

```sql
-- Migration: Add suite video support
-- File: supabase/migrations/002_add_suite_videos.sql

-- Add video embed code to categories
ALTER TABLE categories
ADD COLUMN IF NOT EXISTS video_embed_code VARCHAR(10);

-- Populate suite video codes
UPDATE categories SET video_embed_code = 'SU1' WHERE suite_id = 1;
UPDATE categories SET video_embed_code = 'SU2' WHERE suite_id = 2;
UPDATE categories SET video_embed_code = 'SU3' WHERE suite_id = 3;
UPDATE categories SET video_embed_code = 'SU4' WHERE suite_id = 4;
UPDATE categories SET video_embed_code = 'SU5' WHERE suite_id = 5;

-- Clean up incorrect video assets from courses
DELETE FROM course_assets WHERE type = 'video';

-- Optional: Add a generic video asset at suite level
CREATE TABLE IF NOT EXISTS suite_assets (
  id SERIAL PRIMARY KEY,
  suite_id INTEGER REFERENCES categories(suite_id),
  type VARCHAR(50),
  embed_code VARCHAR(10),
  label TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO suite_assets (suite_id, type, embed_code, label) VALUES
  (1, 'video', 'SU1', 'Health & Safety Overview'),
  (2, 'video', 'SU2', 'Business Skills Overview'),
  (3, 'video', 'SU3', 'Health & Social Care Overview'),
  (4, 'video', 'SU4', 'Mental Health & Wellbeing Overview'),
  (5, 'video', 'SU5', 'Hospitality Overview');
```

---

## Updated Scraper Code

```python
def construct_assets(self):
    """Construct PDF assets only - videos are suite-level, not course-level"""
    print("Constructing course assets (PDF only)...")

    total_assets = 0
    for course in self.courses:
        course_id = course['id']
        course_title = course['title']

        # PDF information sheet URL (these exist per-course)
        pdf_asset = {
            'type': 'pdf',
            'url': f"https://videotilehost.com/common/courses/info_{course_id}.pdf",
            'label': f"{course_title} - Course Information"
        }

        course['assets'] = [pdf_asset]
        total_assets += 1

    self.stats['with_assets'] = len([c for c in self.courses if c['assets']])
    print(f"  Constructed {total_assets} PDF assets for {len(self.courses)} courses")
    print(f"  Note: Videos are suite-level only (SU1-SU5), not per-course")
```

---

## Frontend Component Example

```tsx
// components/SuiteVideoPlayer.tsx
interface SuiteVideoPlayerProps {
  suiteCode: string;
  suiteName: string;
}

export function SuiteVideoPlayer({ suiteCode, suiteName }: SuiteVideoPlayerProps) {
  return (
    <div className="suite-video-container">
      <h3 className="text-xl font-semibold mb-4">
        About {suiteName} Training
      </h3>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
        <iframe
          src={`https://videotilehost.com/embed/${suiteCode}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          title={`${suiteName} Overview Video`}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Watch this overview to learn about our {suiteName} courses
      </p>
    </div>
  );
}

// Usage in training catalogue:
{selectedCategory && (
  <SuiteVideoPlayer
    suiteCode={getCategoryVideoCode(selectedCategory)}
    suiteName={selectedCategory.name}
  />
)}
```

---

## Testing Checklist

- [ ] Verify SU1-SU5 embed URLs work in browser
- [ ] Test "ALL" generic video URL
- [ ] Confirm no individual course videos exist
- [ ] Remove broken video assets from database
- [ ] Update scraper to skip video construction
- [ ] Add suite videos to category pages
- [ ] Update course detail pages to remove video section
- [ ] Verify PDF downloads still work

---

## Summary

**What we learned:**
1. VideoTile provides ~5 suite-level videos, NOT 139 individual videos
2. Embed URLs use suite codes (SU1, SU2, etc.), not course IDs
3. Most courses don't have individual promotional videos
4. The scraper made an incorrect assumption about video structure

**The fix:**
- Remove per-course video assets
- Add suite-level videos to category pages
- Keep individual course pages simple (icon, description, CTAs, PDF)

This aligns with what VideoTile actually provides and eliminates all the broken/mismatched video issues.
