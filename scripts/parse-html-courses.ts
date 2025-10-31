/**
 * Parse HTML course listings and prepare for Supabase import
 *
 * This script:
 * 1. Parses the 3 HTML files with correct course data
 * 2. Extracts: title, description, icon, nid, purchase URL, free trial URL
 * 3. Generates PDF URLs from nid pattern
 * 4. Creates proper slugs
 * 5. Maps to 3 categories based on source file
 * 6. Outputs Supabase-compatible data
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';

interface ParsedCourse {
  title: string;
  slug: string;
  category_id: number;
  category_name: string;
  icon_url: string;
  description: string;
  nid: number;
  purchase_url: string;
  free_trial_url: string | null;
  pdf_url: string;
  video_url: string;
}

/**
 * Create URL-friendly slug from title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');       // Remove leading/trailing hyphens
}

/**
 * Parse a single HTML file
 */
function parseHtmlFile(filePath: string, categoryId: number, categoryName: string): ParsedCourse[] {
  console.log(`\n📄 Parsing: ${filePath}`);

  const html = readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);
  const courses: ParsedCourse[] = [];

  // Each course is a section with vtheading h2
  $('h2.vtheading').each((index, element) => {
    try {
      const $section = $(element);
      const title = $section.text().trim();

      // Get the description from the next p.vtptext
      const $descPara = $section.next('p.vtptext');

      // Extract icon from img within the description paragraph
      const iconUrl = $descPara.find('img.vticons').attr('src') || '';

      // Get description text (excluding the img element)
      const $descClone = $descPara.clone();
      $descClone.find('img').remove();
      const description = $descClone.text().trim();

      // Find the links (in the next p.vtdetails sibling or after)
      let $links = $descPara.nextAll('a.vtbuttons').slice(0, 3);

      // Extract URLs
      let freeTrialUrl: string | null = null;
      let purchaseUrl = '';
      let nid = 0;

      $links.each((i, link) => {
        const href = $(link).attr('href') || '';
        const text = $(link).text().trim();

        if (text === 'Free Trial' && href.includes('freeTrial.php')) {
          freeTrialUrl = href;
          // Extract trial number (same as nid)
          const trialMatch = href.match(/trial=(\d+)/);
          if (trialMatch) {
            nid = parseInt(trialMatch[1], 10);
          }
        } else if (text === 'Buy Now' && href.includes('purchaseCourse.php')) {
          purchaseUrl = href;
          // Extract nid
          const nidMatch = href.match(/nid=(\d+)/);
          if (nidMatch) {
            nid = parseInt(nidMatch[1], 10);
          }
        }
      });

      // Skip if we couldn't extract essential data
      if (!title || !nid || !purchaseUrl) {
        console.warn(`⚠️  Skipping incomplete course: ${title || 'Unknown'}`);
        return;
      }

      // Generate PDF and video URLs from nid
      const pdfUrl = `https://videotilehost.com/common/courses/info_${nid}.pdf`;
      const videoUrl = `https://videotilehost.com/embed/${nid}`;

      courses.push({
        title,
        slug: createSlug(title),
        category_id: categoryId,
        category_name: categoryName,
        icon_url: iconUrl,
        description: description || '',
        nid,
        purchase_url: purchaseUrl,
        free_trial_url: freeTrialUrl,
        pdf_url: pdfUrl,
        video_url: videoUrl,
      });

    } catch (error) {
      console.error(`❌ Error parsing course:`, error);
    }
  });

  console.log(`✅ Parsed ${courses.length} courses`);
  return courses;
}

/**
 * Main parsing function
 */
async function parseAllCourses() {
  console.log('🚀 Starting HTML course parsing...\n');

  const courseListingsDir = join(process.cwd(), 'course-listings');

  // Parse each HTML file with its corresponding category
  const allCourses: ParsedCourse[] = [
    ...parseHtmlFile(join(courseListingsDir, 'Health & Safety.html'), 1, 'Health & Safety'),
    ...parseHtmlFile(join(courseListingsDir, 'Business Skills.html'), 2, 'Business Skills'),
    ...parseHtmlFile(join(courseListingsDir, 'Health & Social Care.html'), 3, 'Health & Social Care'),
  ];

  console.log('\n📊 Parsing Summary:');
  console.log('─'.repeat(50));
  console.log(`Total courses parsed: ${allCourses.length}`);

  // Count by category
  const byCategory = allCourses.reduce((acc, course) => {
    acc[course.category_name] = (acc[course.category_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\nCourses by category:');
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });

  // Check for potential issues
  const missingDescriptions = allCourses.filter(c => !c.description.trim()).length;
  const missingIcons = allCourses.filter(c => !c.icon_url).length;
  const missingFreeTrial = allCourses.filter(c => !c.free_trial_url).length;

  console.log('\n⚠️  Data quality check:');
  console.log(`  Missing descriptions: ${missingDescriptions}`);
  console.log(`  Missing icons: ${missingIcons}`);
  console.log(`  Missing free trial: ${missingFreeTrial}`);

  // Check for duplicate titles
  const titleCounts = allCourses.reduce((acc, course) => {
    acc[course.title] = (acc[course.title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicates = Object.entries(titleCounts).filter(([, count]) => count > 1);
  if (duplicates.length > 0) {
    console.log('\n⚠️  Duplicate titles found:');
    duplicates.forEach(([title, count]) => {
      console.log(`  "${title}" appears ${count} times`);
    });
  } else {
    console.log('\n✅ No duplicate titles found');
  }

  return allCourses;
}

// Run if called directly
if (require.main === module) {
  parseAllCourses()
    .then(courses => {
      console.log('\n✅ Parsing complete!');
      console.log(`\n📋 Sample course data:`);
      console.log(JSON.stringify(courses[0], null, 2));
    })
    .catch(error => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { parseAllCourses, type ParsedCourse };
