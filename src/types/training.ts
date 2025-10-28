/**
 * TypeScript types for Online Training Catalogue
 * Mirrors Supabase database schema
 */

export interface Category {
  id: number;
  name: string;
  suite_id: number;
  purchase_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  icon_url: string | null;
  description: string | null;
  purchase_url: string;
  free_trial_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CourseAsset {
  id: number;
  course_id: number;
  type: 'pdf' | 'video';
  url: string;
  label: string | null;
  created_at?: string;
}

/**
 * Extended course type with related data
 */
export interface CourseWithCategory extends Course {
  category: Category;
  assets?: CourseAsset[];
}

/**
 * Grouped courses by category for catalogue page
 */
export interface CoursesByCategory {
  category: Category;
  courses: Course[];
}
