# Hampton Safety Ltd Website

Professional health and safety consultancy website built with Next.js 14, featuring modern design, responsive layouts, optimized performance, and a comprehensive online training catalogue with 139 courses.

## 🚀 Live Site

Deployed on Netlify: [Hampton Safety Ltd](https://your-netlify-domain.netlify.app)

> **Current Status**: Site deployed successfully. Training catalogue fully functional with search, filters, and 139 courses (98.6% description coverage).

## 📋 Project Overview

Hampton Safety Ltd provides bespoke health and safety consultancy services across the UK, specializing in:
- Retained H&S Consultancy
- Risk Assessments & Audits
- Management Systems (ISO certification support)
- Safety Training (IOSH, NEBOSH, and bespoke programs)
- **Online Training Catalogue** - 139 professional courses across 5 categories

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **Forms**: Netlify Forms
- **Data Scraping**: Python 3.10+ (BeautifulSoup4, Requests)

## 🎨 Brand Colors

- **Primary Blue (Hampton Blue)**: `#0855A1`
- **Navy Blue**: `#002952`
- **Medium Blue**: `#1e73be`
- **Success Green**: `#10b981`
- **Light Blue Background**: `#EBF5FF`

## 📁 Project Structure

```
hampton-safety-website/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage (with online training section)
│   │   ├── about/                   # About page
│   │   ├── contact/                 # Contact form
│   │   ├── training/                # Online training catalogue
│   │   │   ├── page.tsx             # Catalogue page with search/filters
│   │   │   └── [slug]/              # Individual course pages (139 courses)
│   │   └── services/                # Service pages
│   │       ├── consultancy/
│   │       ├── risk-assessments/
│   │       ├── iso-certification/
│   │       └── training/
│   ├── components/
│   │   ├── Navigation.tsx           # Header navigation (with Online Training link)
│   │   ├── Footer.tsx               # Footer component
│   │   ├── TrainingCatalogue.tsx    # Search & filter component
│   │   └── ui/                      # shadcn/ui components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx            # Search input
│   │       └── ...
│   ├── lib/
│   │   ├── supabase/                # Supabase client & queries
│   │   │   ├── client.ts
│   │   │   └── queries.ts           # Course data queries
│   │   └── utils.ts                 # Utility functions
│   └── types/
│       └── training.ts              # TypeScript types for courses
├── scripts/
│   ├── scrape_videotile.py          # Python scraper for course data
│   ├── parse_descriptions.py        # HTML description parser (98.6% coverage)
│   ├── fix_categories.py            # Course recategorization script
│   ├── check_descriptions.py        # Description coverage verification
│   ├── check_categories.py          # Category distribution check
│   ├── requirements.txt             # Python dependencies
│   └── README.md                    # Scraper documentation
├── supabase/
│   └── migrations/                  # Database schema
│       └── 001_create_training_tables.sql
├── public/
│   ├── images/                      # Hero and content images
│   │   └── services/                # Service page images (9 pending generation)
│   └── logos/                       # Brand assets
└── docs/
    ├── brief-online-training-catalogue.md  # Project brief
    ├── training_courses.md                  # Scraping analysis
    ├── image-prompts-updated.md            # Detailed image prompts
    ├── image-prompts-quick-reference.txt   # Copy-paste prompts
    ├── scraper-update-spec.md              # Scraper specifications
    ├── Netlify error logs.md               # Build troubleshooting
    ├── START_HERE_TOMORROW.md              # Continuation guide
    └── image-requirements.md               # Image guidelines

```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/it4444/Hampton-Safety.git

# Navigate to project directory
cd hampton-safety-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📚 Online Training Catalogue

Hampton Safety showcases **139 online training courses** powered by VideoTile through a comprehensive database-backed catalogue system with search and filter functionality.

### Features

- **139 Professional Courses**: 98.6% description coverage (137/139 courses)
- **5 Categories**: Health & Safety (19), Business Skills (40), Health & Social Care (55), Mental Health & Wellbeing (11), Hospitality (14)
- **Live Search**: Real-time filtering by course title and description
- **Category Filters**: Tab-based filtering for quick navigation
- **Individual Course Pages**: Dedicated pages for each course with purchase/trial CTAs
- **SEO Optimized**: Static site generation for fast performance
- **Responsive Design**: Mobile-friendly catalogue layout

### Architecture

- **Python Scraper**: Extracts course data from VideoTile's admin content page
- **HTML Parser**: Parses description HTML files and matches by course ID
- **Supabase Database**: PostgreSQL database storing courses, categories, and assets
- **Next.js Pages**: Static site generation (SSG) for 151 pages
- **Client Components**: Interactive search and filter with React hooks

### Setup Instructions

#### 1. Database Setup

Run the Supabase migration to create the required tables:

```sql
-- Execute the migration file in your Supabase SQL editor
-- File: supabase/migrations/001_create_training_tables.sql
```

Or use the Supabase CLI:
```bash
supabase db push
```

#### 2. Scraper Setup

Set up the Python environment and run the scraper:

```bash
# Navigate to scripts directory
cd scripts

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Step 1: Run the main scraper
python scrape_videotile.py

# Step 2: Parse descriptions from HTML files
python parse_descriptions.py

# Step 3: Fix category distribution
python fix_categories.py

# Optional: Check coverage and distribution
python check_descriptions.py
python check_categories.py
```

The scraper workflow:
1. **scrape_videotile.py**: Scrapes course data from VideoTile admin page
2. **parse_descriptions.py**: Extracts descriptions from HTML files and matches by course ID
3. **fix_categories.py**: Recategorizes courses based on keyword rules (AI, GDPR, Mental Health, etc.)
4. **check_descriptions.py**: Verifies description coverage percentage
5. **check_categories.py**: Displays course distribution across categories

See `scripts/README.md` for detailed scraper documentation.

#### 3. Build & Deploy

After populating the database, build the Next.js site:

```bash
npm run build
```

The training catalogue will be available at `/training` with individual course pages at `/training/[course-slug]`.

### Pages

- **Catalogue** (`/training`) - Browse 139 courses with live search and category filter tabs
- **Course Details** (`/training/[slug]`) - Individual course information with purchase/trial links
- **Homepage Section** - Online training promotional section with category icons and CTA

### Re-scraping

To update the course catalogue with new courses from VideoTile:

```bash
cd scripts
source venv/bin/activate  # or venv\Scripts\activate on Windows
python scrape_videotile.py
```

Then rebuild the site to regenerate static pages:

```bash
npm run build
```

## 🎯 Recent Updates

### October 2025 - Online Training Catalogue Complete

#### **Latest: Search & Filter UI** (October 28, 2025)
- Interactive search bar for real-time course filtering
- Category filter tabs for quick navigation
- TrainingCatalogue component with React hooks (useState, useMemo)
- "Online Training" link added to main navigation
- Homepage section promoting online training with category icons
- Removed "Buy Full Suite" buttons as requested
- Mobile-responsive design with improved UX

#### **Description Coverage & Categorization** (October 28, 2025)
- Created `parse_descriptions.py` to extract descriptions from HTML files
- Achieved 98.6% description coverage (137/139 courses)
- Created `fix_categories.py` to recategorize 44 misplaced courses
- Final distribution: H&S (19), Business (40), Health & Social (55), Mental Health (11), Hospitality (14)
- Added verification scripts: `check_descriptions.py` and `check_categories.py`

#### **Initial Training Catalogue** (October 2025)
- Python scraper for VideoTile course data extraction
- Supabase database integration for 139 courses
- Individual course detail pages with purchase/trial CTAs
- Icon matching with intelligent normalization
- SEO-optimized static generation (151 pages)

### Earlier Updates

#### Button Styling Consistency
- Fixed invisible CTA buttons across all service pages and footer
- Standardized button color scheme for consistent branding
- Updated navigation header with single Hampton blue CTA button

#### Homepage Hero Image
- Added professional consultation image to homepage hero section
- Showcases on-site consultancy approach with factory setting
- Optimized for responsive viewing with smooth animations

#### Form Integration
- Netlify Forms integration for contact page
- Built-in spam protection and submission handling
- Success/error state management

## 📄 Key Pages

- **Home** (`/`) - Hero section, services overview, online training promotion, testimonials
- **About** (`/about`) - Company mission, approach, and accreditations
- **Contact** (`/contact`) - Contact form with Netlify Forms integration
- **Online Training** (`/training`) - 139-course catalogue with search and category filters
  - Individual course pages (`/training/[slug]`) - Detailed course information with CTAs
- **Services**:
  - Consultancy (`/services/consultancy`)
  - Risk Assessments (`/services/risk-assessments`)
  - Management Systems (`/services/iso-certification`)
  - Training (`/services/training`)

## 🎨 Design System

The site uses a custom design system with:
- **Typography**: Custom heading and body styles with `.hampton-*` classes
- **Components**: Consistent card, button, and badge styling
- **Color Scheme**: Professional blue and green palette
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🔧 Configuration

### Tailwind Config
Custom colors, animations, and utilities defined in `tailwind.config.ts`

### Next.js Config
Image optimization and build settings in `next.config.ts`

### TypeScript Config
Strict type checking enabled in `tsconfig.json`

## 📦 Dependencies

Key packages:
- `next` - React framework
- `react` & `react-dom` - UI library
- `@supabase/supabase-js` - Supabase client for database access
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `@radix-ui/*` - Headless UI components (via shadcn/ui)

Python dependencies (scraper):
- `requests` - HTTP library
- `beautifulsoup4` - HTML parsing
- `supabase` - Python client for Supabase
- `python-dotenv` - Environment variable management

## ⚠️ Known Issues & Next Steps

### Current Issue: Netlify Deployment

**Status**: Build failing due to missing package dependency

**Error**: `Module not found: Can't resolve '@supabase/supabase-js'`

**Fix Required**:
```bash
# Install missing package
npm install @supabase/supabase-js

# Commit and push
git add package.json package-lock.json
git commit -m "Add @supabase/supabase-js dependency for training catalogue"
git push origin master
```

**Environment Variables**: Add to Netlify dashboard under Site Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

See `docs/Netlify error logs.md` for full error details.

### Pending Tasks

1. **Image Generation** (9 images needed)
   - 4 service hero images (16:9): consultancy, risk-assessments, iso-certification, training
   - 5 process step images (4:3): gap-analysis, system-development, training-implementation, certification-support, consultancy-why-choose
   - Prompts ready in `docs/image-prompts-quick-reference.txt`
   - Upload to `/public/images/services/` when complete

2. **Complete Course Descriptions** (2 courses missing)
   - Current coverage: 137/139 (98.6%)
   - 2 courses need manual description addition

See `START_HERE_TOMORROW.md` for detailed continuation guide.

## 🌐 Deployment

The site is automatically deployed to Netlify on push to `master` branch:
- **Production**: Deploys from `master` branch
- **Deploy Previews**: Automatic for all branches and PRs
- **Forms**: Handled by Netlify Forms with spam protection
- **Environment Variables**: Required for Supabase connection (see Known Issues above)

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature-name

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push branch
git push -u origin feature-name

# Merge to master when ready
git checkout master
git merge feature-name
git push origin master
```

## 📚 Documentation

### Project Documentation
- **START_HERE_TOMORROW.md** - Continuation guide with current status and next steps
- **README.md** - This file (project overview and setup)

### Training Catalogue
- `docs/brief-online-training-catalogue.md` - Original project brief
- `docs/training_courses.md` - Course scraping analysis
- `docs/scraper-update-spec.md` - Scraper specifications
- `scripts/README.md` - Python scraper documentation

### Images & Design
- `docs/image-prompts-quick-reference.txt` - Ready-to-use AI image prompts (9 images)
- `docs/image-prompts-updated.md` - Detailed image generation guide
- `docs/image-requirements.md` - Image guidelines and specifications
- Brand guidelines: See color palette in this README

### Troubleshooting
- `docs/Netlify error logs.md` - Build error logs and debugging
- `docs/Required changes and updates.md` - Change tracking

### Development
- Component usage: [shadcn/ui documentation](https://ui.shadcn.com/)
- Supabase docs: [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 🤝 Contributing

This is a private project for Hampton Safety Ltd. For questions or updates, contact the development team.

## 📄 License

Private and proprietary - Hampton Safety Ltd © 2024

---

Built with ❤️ using Next.js and deployed on Netlify
