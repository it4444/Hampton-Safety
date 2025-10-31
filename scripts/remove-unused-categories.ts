/**
 * Remove unused categories from Supabase
 */
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function removeUnusedCategories() {
  console.log('🗑️  Removing unused categories...\n');

  // Check which categories have courses
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');

  if (!categories) {
    console.error('❌ Could not fetch categories');
    return;
  }

  for (const category of categories) {
    const { count } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category.id);

    console.log(`Category ${category.id} (${category.name}): ${count} courses`);

    if (count === 0) {
      console.log(`  → Deleting empty category...`);
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', category.id);

      if (error) {
        console.error(`  ❌ Error deleting category:`, error);
      } else {
        console.log(`  ✅ Deleted`);
      }
    }
  }

  console.log('\n✅ Cleanup complete!');
}

removeUnusedCategories();
