#!/usr/bin/env node
/**
 * Fix Asbestos awareness IATP video
 * Copy the video from "Asbestos awareness" to "Asbestos awareness IATP"
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[ERROR] Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('='.repeat(80));
  console.log('FIX ASBESTOS IATP VIDEO');
  console.log('='.repeat(80));

  try {
    // Step 1: Find the Asbestos awareness course (not IATP)
    console.log('\n[STEP 1] Finding Asbestos awareness courses...');
    const { data: asbestosCourses, error: asbError } = await supabase
      .from('courses')
      .select('id, title')
      .ilike('title', '%asbestos awareness%')
      .not('title', 'ilike', '%IATP%');

    if (asbError || !asbestosCourses || asbestosCourses.length === 0) {
      console.error('[ERROR] Could not find Asbestos awareness courses:', asbError);
      process.exit(1);
    }

    // Find the main "Asbestos awareness" course (exact match or closest)
    const asbestosCourse = asbestosCourses.find(c => c.title.toLowerCase() === 'asbestos awareness')
      || asbestosCourses[0];

    console.log(`  Found ${asbestosCourses.length} course(s):`);
    asbestosCourses.forEach(c => console.log(`    - ${c.title}`));
    console.log(`  Using: ${asbestosCourse.title} (ID: ${asbestosCourse.id})`);

    // Step 2: Get the video for Asbestos awareness
    console.log('\n[STEP 2] Getting Asbestos awareness video...');
    const { data: asbVideo, error: videoError } = await supabase
      .from('course_assets')
      .select('url')
      .eq('course_id', asbestosCourse.id)
      .eq('type', 'video')
      .single();

    if (videoError || !asbVideo) {
      console.error('[ERROR] Could not find video for Asbestos awareness:', videoError);
      process.exit(1);
    }

    console.log(`  Video URL: ${asbVideo.url}`);

    // Step 3: Find Asbestos awareness IATP course
    console.log('\n[STEP 3] Finding Asbestos awareness IATP course...');
    const { data: iatpCourse, error: iatpError } = await supabase
      .from('courses')
      .select('id, title')
      .ilike('title', '%asbestos%')
      .ilike('title', '%IATP%')
      .single();

    if (iatpError || !iatpCourse) {
      console.error('[ERROR] Could not find Asbestos awareness IATP course:', iatpError);
      process.exit(1);
    }

    console.log(`  Found: ${iatpCourse.title} (ID: ${iatpCourse.id})`);

    // Step 4: Check current IATP video
    console.log('\n[STEP 4] Checking current IATP video...');
    const { data: iatpVideo, error: iatpVideoError } = await supabase
      .from('course_assets')
      .select('id, url')
      .eq('course_id', iatpCourse.id)
      .eq('type', 'video')
      .maybeSingle();

    if (iatpVideo) {
      console.log(`  Current video: ${iatpVideo.url}`);

      if (iatpVideo.url === asbVideo.url) {
        console.log('\n✓ Video is already correct! No update needed.');
        return;
      }

      // Step 5: Update the video
      console.log('\n[STEP 5] Updating IATP video...');
      const { error: updateError } = await supabase
        .from('course_assets')
        .update({ url: asbVideo.url })
        .eq('id', iatpVideo.id);

      if (updateError) {
        console.error('[ERROR] Failed to update video:', updateError);
        process.exit(1);
      }

      console.log(`  ✓ Updated video from:`);
      console.log(`    ${iatpVideo.url}`);
      console.log(`  to:`);
      console.log(`    ${asbVideo.url}`);

    } else {
      // No video exists, create one
      console.log('  No video found for IATP course');
      console.log('\n[STEP 5] Adding video to IATP course...');

      const { error: insertError } = await supabase
        .from('course_assets')
        .insert({
          course_id: iatpCourse.id,
          type: 'video',
          url: asbVideo.url,
          label: 'Promotional Video'
        });

      if (insertError) {
        console.error('[ERROR] Failed to add video:', insertError);
        process.exit(1);
      }

      console.log(`  ✓ Added video: ${asbVideo.url}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('SUCCESS! Asbestos awareness IATP video has been updated.');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('\n[ERROR] Unexpected error:', error);
    process.exit(1);
  }
}

main();
