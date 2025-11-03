# Training Courses Data Export & Import

This directory contains CSV exports of the training courses data from Supabase.

## Workflow

### 1. Export Data for Auditing

```bash
npx tsx scripts/export-courses-csv.ts
```

This will create two timestamped CSV files in this directory:
- `courses-export-YYYY-MM-DD-HHmmss.csv` - All courses with category information
- `categories-export-YYYY-MM-DD-HHmmss.csv` - All categories

The export script also provides analysis of:
- Courses per category
- Potential duplicates (same title)
- Data completeness (missing icons, descriptions, etc.)

### 2. Manual Audit & Correction

Open the `courses-export-*.csv` file in Excel, Google Sheets, or your preferred editor.

**Common fixes:**
- Remove duplicate courses (keep the best version)
- Fix category assignments (update the `category_id` column)
- Correct titles and descriptions
- Update icon URLs
- Fill in missing data

**Important columns:**
- `course_id` - Don't change this (used for updates)
- `category_id` - Change this to reassign to correct category (see categories CSV for IDs)
- `category_name` - This is just for reference, changing it won't affect the import
- Delete entire rows to remove courses from the database

**Category IDs:**
1. Health & Safety (Suite 1)
2. Business Skills (Suite 2)
3. Health & Social Care (Suite 3)
4. Mental Health & Wellbeing (Suite 4)
5. Hospitality (Suite 5)

### 3. Save Corrected File

Save your corrected file with a clear name, e.g.:
- `courses-export-2024-01-15-CORRECTED.csv`

### 4. Test Import (Dry Run)

Before making changes, test the import:

```bash
npx tsx scripts/import-courses-csv.ts exports/courses-export-YYYY-MM-DD-CORRECTED.csv --dry-run
```

This shows what changes will be made without actually modifying the database.

### 5. Import Corrected Data

When you're ready to update Supabase:

```bash
npx tsx scripts/import-courses-csv.ts exports/courses-export-YYYY-MM-DD-CORRECTED.csv
```

The script will:
- Wait 5 seconds before proceeding (time to cancel if needed)
- Delete courses that were removed from the CSV
- Update existing courses with new data
- Insert any new courses

### 6. Verify Changes

Visit your site to verify the changes:
```bash
npm run dev
```

Then go to http://localhost:3000/training to see the updated catalogue.

## Tips

- Always keep a backup of your original export
- Use the dry-run flag first to preview changes
- The import uses UPSERT, so it's safe to run multiple times
- Deleted rows in CSV = deleted courses in database (be careful!)
- You can export → fix → import as many times as needed

## Support

If you need to restore from a backup or have issues, the original scraped data is in:
- `data/videotile-courses.json` (if you used the original scraper)
