#!/usr/bin/env node
/**
 * Find all courses with IATP in the title
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[ERROR] Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('id, title')
    .ilike('title', '%IATP%')
    .order('title');

  if (error) {
    console.error('[ERROR]', error);
    process.exit(1);
  }

  console.log(`\nFound ${courses.length} courses with "IATP" in title:\n`);
  courses.forEach(c => console.log(`  ID ${c.id}: ${c.title}`));
  console.log();
}

main();
