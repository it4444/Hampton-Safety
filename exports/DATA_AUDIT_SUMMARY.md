# Training Courses Data Audit Summary

**Export Date:** 2025-10-30 18:22:03
**Total Courses:** 139
**Total Categories:** 5

## Issues Found

### 1. Duplicate Courses (61 duplicate sets found)

The following courses appear multiple times in the database. These need to be reviewed and deduplicated:

**High Priority Duplicates (3+ instances):**
- "Managing Occupational Health and Wellbeing" - IDs: 9, 50, 111, 148 (4 instances)
- "Drug and Alcohol Awareness" - IDs: 45, 54, 79, 118 (4 instances)
- "Safeguarding Children" - IDs: 29, 78, 113 (3 instances)
- "Licensed Premises Staff Training" - IDs: 125, 210, 227 (3 instances)

**Notable Duplicates (2 instances each):**
- Basic Legionella Management - IDs: 1, 91
- Allergen Awareness - IDs: 2, 70
- Asbestos Awareness - IATP - IDs: 3, 142
- Abrasive Wheels - IDs: 26, 64
- Mental Health Awareness - IDs: 52, 141
- Dementia Awareness - IDs: 51, 143
- The Care Certificate - IDs: 49, 997
- Cyber Security - IDs: 112, 128

*(See full export output for complete list of 61 duplicate sets)*

### 2. Data Completeness

✅ **Icons:** All 139 courses have icons (100%)
⚠️ **Descriptions:** 2 courses missing descriptions (98.6% complete)
✅ **Free Trials:** All 139 courses have free trial URLs (100%)

### 3. Category Distribution

| Category | Course Count |
|----------|-------------|
| Health & Social Care | 55 courses |
| Business Skills | 40 courses |
| Health & Safety | 19 courses |
| Hospitality | 14 courses |
| Mental Health & Wellbeing | 11 courses |

## Recommended Actions

### 1. Deduplicate Courses

For each duplicate set:
1. Compare the duplicate entries in the CSV
2. Identify the most complete/accurate version
3. Delete the duplicate rows from the CSV
4. Keep only one entry per unique course

**Decision criteria for which to keep:**
- Most complete description
- Correct category assignment
- Best quality icon URL
- Most recent data (if timestamps differ)

### 2. Review Category Assignments

Some courses may be in the wrong category. Review courses like:
- Health and safety courses that might be tagged as Business Skills
- Mental health courses that should be in "Mental Health & Wellbeing"
- Care-related courses that should be in "Health & Social Care"

**How to fix:**
- Open the CSV in Excel/Google Sheets
- Check the `category_name` column
- Update the `category_id` column to the correct category ID:
  - 1 = Health & Safety
  - 2 = Business Skills
  - 3 = Health & Social Care
  - 4 = Mental Health & Wellbeing
  - 5 = Hospitality

### 3. Fill Missing Descriptions

2 courses are missing descriptions. Review these in the CSV and add descriptions if available from the source data.

## Files Generated

1. `courses-export-2025-10-30T18-22-03.csv` - Full course data with category info
2. `categories-export-2025-10-30T18-22-03.csv` - Category reference

## Next Steps

1. **Open the courses CSV file** in your preferred spreadsheet editor
2. **Review and fix:**
   - Remove duplicate entries (keep best version)
   - Correct category assignments
   - Fill in missing descriptions if possible
3. **Save the corrected file** as `courses-export-2025-10-30-CORRECTED.csv`
4. **Test the import:**
   ```bash
   npx tsx scripts/import-courses-csv.ts exports/courses-export-2025-10-30-CORRECTED.csv --dry-run
   ```
5. **Apply the corrections:**
   ```bash
   npx tsx scripts/import-courses-csv.ts exports/courses-export-2025-10-30-CORRECTED.csv
   ```

## Important Notes

- Always keep a backup of the original export
- Deleting rows in the CSV will delete those courses from Supabase
- The `course_id` column should NOT be changed (used for updates)
- Category reassignment is done via the `category_id` column
- The import script uses UPSERT, so it's safe to run multiple times

## Contact

If you need help with the correction process or have questions about specific courses, please review the data carefully before importing.
