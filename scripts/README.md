# VideoTile Course Scraper

Python script to scrape course data from VideoTile's admin content page and populate the Supabase database for Hampton Safety's online training catalogue.

## Prerequisites

- Python 3.10 or higher
- Supabase credentials configured in `.env.local` (at project root)

## Setup

### 1. Create Virtual Environment

```bash
cd scripts
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

## Usage

### Basic Scrape (Production)

```bash
python scrape_videotile.py
```

This will:
- Scrape https://videotilehost.com/hamptonsafety/adminWebsiteContent.php
- Parse courses, icons, descriptions, and assets
- Insert/update data in Supabase
- Log summary statistics

### Dry Run (Testing)

```bash
python scrape_videotile.py --dry-run
```

This will:
- Scrape and parse the VideoTile page
- Display matched data and statistics
- **NOT** write anything to the database

### Strict Mode

```bash
python scrape_videotile.py --strict
```

This will:
- Throw an error if any course is missing required fields
- Useful for validation during development

## Output

The scraper will log:
- Total courses found
- Icon matching percentage
- Description coverage percentage
- Any warnings or errors

## Troubleshooting

### "ModuleNotFoundError"
Make sure you've activated the virtual environment and installed dependencies:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### "Supabase credentials not found"
Ensure `.env.local` exists in the project root with:
```
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### "Failed to parse VideoTile page"
The VideoTile admin page structure may have changed. Check the URL is accessible and review the parsing logic in `scrape_videotile.py`.

## Re-scraping

Run the scraper periodically to keep the course catalogue up-to-date:
- **Manual:** Run the script as needed when VideoTile adds new courses
- **Automated (future):** Set up a weekly cron job or GitHub Action

## Files

- `scrape_videotile.py` - Main scraper script
- `requirements.txt` - Python dependencies
- `README.md` - This file
