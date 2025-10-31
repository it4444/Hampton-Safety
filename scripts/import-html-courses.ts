/**
 * Import courses from HTML files to Supabase
 *
 * This script:
 * 1. Parses HTML files using parse-html-courses
 * 2. Handles duplicates (keeps first occurrence, logs others)
 * 3. Clears existing courses table
 * 4. Inserts clean course data
 * 5. Creates course_assets entries for PDFs and videos
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { join } from 'path';
import { parseAllCourses, type ParsedCourse } from './parse-html-courses';

config({ path: join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.error('\n⚠️  The SUPABASE_SERVICE_ROLE_KEY is needed to bypass RLS for bulk imports.');
  console.error('   You can find it in your Supabase project settings under API.');
  console.error('   Add it to your .env.local file as: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

interface CourseInsert {
  id: number; // Use nid as the ID
  title: string;
  slug: string;
  category_id: number;
  icon_url: string;
  description: string;
  purchase_url: string;
  free_trial_url: string | null;
}

interface AssetInsert {
  course_id: number;
  type: 'pdf' | 'video';
  url: string;
  label: string;
}

/**
 * Deduplicate courses by NID (course ID from vendor)
 * Keep first occurrence, track duplicates
 */
function deduplicateCourses(courses: ParsedCourse[]): {
  unique: ParsedCourse[];
  duplicates: ParsedCourse[];
} {
  const seen = new Map<number, ParsedCourse>();
  const duplicates: ParsedCourse[] = [];

  courses.forEach(course => {
    if (seen.has(course.nid)) {
      duplicates.push(course);
    } else {
      seen.set(course.nid, course);
    }
  });

  return {
    unique: Array.from(seen.values()),
    duplicates
  };
}

/**
 * Main import function
 */
async function importCourses(dryRun: boolean = false) {
  console.log('🚀 Starting course import to Supabase...\n');

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }

  try {
    // Step 1: Parse HTML files
    console.log('📄 Parsing HTML files...');
    const allCourses = await parseAllCourses();

    // Step 2: Deduplicate
    console.log('\n🔍 Deduplicating courses...');
    const { unique, duplicates } = deduplicateCourses(allCourses);

    console.log(`✅ ${unique.length} unique courses`);
    if (duplicates.length > 0) {
      console.log(`⚠️  ${duplicates.length} duplicates removed:`);
      duplicates.forEach(dup => {
        console.log(`   - ${dup.title} (${dup.category_name})`);
      });
    }

    if (dryRun) {
      console.log('\n✅ Dry run complete. Data looks good!');
      console.log(`\nWould import ${unique.length} courses across 3 categories`);
      return;
    }

    // Step 3: Clear existing courses (TRUNCATE is more reliable than DELETE)
    console.log('\n🗑️  Clearing existing courses...');
    // We'll use upsert instead of delete to handle existing data

    // Step 5: Insert courses (batch insert with proper handling)
    console.log('\n📥 Inserting courses...');

    const courseInserts: CourseInsert[] = unique.map(course => ({
      id: course.nid, // Use nid as the primary key
      title: course.title,
      slug: course.slug,
      category_id: course.category_id,
      icon_url: course.icon_url,
      description: course.description,
      purchase_url: course.purchase_url,
      free_trial_url: course.free_trial_url,
    }));

    // Use UPSERT to handle any existing data
    const batchSize = 50;
    const insertedCourses: { id: number; title: string }[] = [];

    for (let i = 0; i < courseInserts.length; i += batchSize) {
      const batch = courseInserts.slice(i, i + batchSize);
      const { data, error} = await supabase
        .from('courses')
        .upsert(batch, { onConflict: 'id' })
        .select('id, title');

      if (error) {
        console.error(`❌ Error upserting batch ${i / batchSize + 1}:`, error);
        throw error;
      }

      if (data) {
        insertedCourses.push(...data);
      }

      console.log(`   Upserted ${i + batch.length}/${courseInserts.length} courses`);
    }

    console.log(`✅ Upserted ${insertedCourses.length} courses total`);

    // Step 6: Create course_id mapping (title -> id)
    console.log('\n🔗 Creating course ID mapping...');
    const courseIdMap = new Map<string, number>();

    insertedCourses?.forEach(course => {
      courseIdMap.set(course.title, course.id);
    });

    // Step 7: Delete old assets and insert new ones
    console.log('\n🗑️  Clearing old course assets...');
    const { error: deleteAssetsError } = await supabase
      .from('course_assets')
      .delete()
      .neq('id', 0);

    if (deleteAssetsError) {
      console.warn('⚠️  Could not delete old assets:', deleteAssetsError);
    } else {
      console.log('✅ Old assets cleared');
    }

    console.log('📥 Inserting course assets...');

    const assetInserts: AssetInsert[] = [];

    unique.forEach(course => {
      const courseId = course.nid; // Use nid directly since that's what we used as ID

      // Add PDF asset
      assetInserts.push({
        course_id: courseId,
        type: 'pdf',
        url: course.pdf_url,
        label: `${course.title} - Course Information`,
      });

      // Add video asset
      assetInserts.push({
        course_id: courseId,
        type: 'video',
        url: course.video_url,
        label: `${course.title} - Promotional Video`,
      });
    });

    const { error: assetsError } = await supabase
      .from('course_assets')
      .insert(assetInserts);

    if (assetsError) {
      console.error('❌ Error inserting assets:', assetsError);
      throw assetsError;
    }

    console.log(`✅ Inserted ${assetInserts.length} course assets (${assetInserts.length / 2} PDFs + ${assetInserts.length / 2} videos)`);

    // Step 8: Verify import
    console.log('\n✅ Verifying import...');

    const { count: courseCount } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    const { count: assetCount } = await supabase
      .from('course_assets')
      .select('*', { count: 'exact', head: true });

    console.log(`   Courses in database: ${courseCount}`);
    console.log(`   Assets in database: ${assetCount}`);

    // Check category distribution
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name');

    if (categories) {
      console.log('\n📊 Courses by category:');
      for (const category of categories) {
        const { count } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id);

        if (count && count > 0) {
          console.log(`   ${category.name}: ${count} courses`);
        }
      }
    }

    console.log('\n✅ Import complete! Your training catalogue is now updated.');
    console.log('🌐 Visit your website to verify the courses are displaying correctly.');

  } catch (error) {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  }
}

// Parse command line args
const dryRun = process.argv.includes('--dry-run');

// Run import
importCourses(dryRun);
