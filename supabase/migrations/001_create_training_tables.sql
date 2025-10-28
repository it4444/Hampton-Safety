-- Online Training Catalogue Database Schema
-- Created: 2025-10-21
-- Purpose: Store VideoTile course data for Hampton Safety training catalogue

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  suite_id INTEGER NOT NULL UNIQUE CHECK (suite_id BETWEEN 1 AND 5),
  purchase_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suite mapping:
-- 1 → Health & Safety
-- 2 → Business Skills
-- 3 → Health & Social Care
-- 4 → Mental Health & Wellbeing
-- 5 → Hospitality

COMMENT ON TABLE categories IS 'Course categories (suites) from VideoTile';
COMMENT ON COLUMN categories.suite_id IS 'VideoTile suite ID (1-5)';
COMMENT ON COLUMN categories.purchase_url IS 'VideoTile suite-level purchase URL';

-- =====================================================
-- COURSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY,  -- VideoTile course ID (nid from purchase URL)
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  icon_url TEXT,
  description TEXT,
  purchase_url TEXT NOT NULL,
  free_trial_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE courses IS 'Individual VideoTile courses';
COMMENT ON COLUMN courses.id IS 'VideoTile course ID (nid parameter from purchase URL)';
COMMENT ON COLUMN courses.slug IS 'URL-friendly kebab-case version of title';
COMMENT ON COLUMN courses.icon_url IS 'Course icon image URL (matched from VideoTile assets)';
COMMENT ON COLUMN courses.purchase_url IS 'VideoTile purchase page URL (preserves commission tracking)';
COMMENT ON COLUMN courses.free_trial_url IS 'VideoTile free trial URL (if available)';

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_title ON courses(title);

-- =====================================================
-- COURSE_ASSETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS course_assets (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('pdf', 'video')),
  url TEXT NOT NULL,
  label VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE course_assets IS 'Associated assets for courses (PDFs, promo videos)';
COMMENT ON COLUMN course_assets.type IS 'Asset type: pdf or video';
COMMENT ON COLUMN course_assets.label IS 'Display name for the asset';

-- Index for querying assets by course
CREATE INDEX IF NOT EXISTS idx_course_assets_course_id ON course_assets(course_id);

-- =====================================================
-- UPDATE TIMESTAMP TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA: CATEGORIES
-- =====================================================
INSERT INTO categories (name, suite_id, purchase_url) VALUES
  ('Health & Safety', 1, 'https://www.videotilehost.com/hamptonsafety/purchaseCourse.php?suite=1'),
  ('Business Skills', 2, 'https://www.videotilehost.com/hamptonsafety/purchaseCourse.php?suite=2'),
  ('Health & Social Care', 3, 'https://www.videotilehost.com/hamptonsafety/purchaseCourse.php?suite=3'),
  ('Mental Health & Wellbeing', 4, 'https://www.videotilehost.com/hamptonsafety/purchaseCourse.php?suite=4'),
  ('Hospitality', 5, 'https://www.videotilehost.com/hamptonsafety/purchaseCourse.php?suite=5')
ON CONFLICT (suite_id) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assets ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (for Next.js frontend)
CREATE POLICY "Allow anonymous read access on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous read access on courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Allow anonymous read access on course_assets"
  ON course_assets FOR SELECT
  USING (true);

-- Note: Write access will be controlled via service_role key in Python scraper
-- (service_role bypasses RLS)
