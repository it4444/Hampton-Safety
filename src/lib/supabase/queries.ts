/**
 * Supabase queries for training course data
 */

import { supabase } from './client';
import type {
  Category,
  Course,
  CourseWithCategory,
  CoursesByCategory
} from '@/types/training';

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('suite_id', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch all courses
 */
export async function getAllCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Fetch courses grouped by category
 */
export async function getCoursesByCategory(): Promise<CoursesByCategory[]> {
  const categories = await getCategories();
  const courses = await getAllCourses();

  return categories.map(category => ({
    category,
    courses: courses.filter(course => course.category_id === category.id)
  }));
}

/**
 * Fetch a single course by slug with category and assets
 */
export async function getCourseBySlug(slug: string): Promise<CourseWithCategory | null> {
  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (courseError || !courseData) {
    console.error('Error fetching course:', courseError);
    return null;
  }

  // Fetch category
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', courseData.category_id)
    .single();

  if (categoryError || !categoryData) {
    console.error('Error fetching category:', categoryError);
    return null;
  }

  // Fetch assets
  const { data: assetsData } = await supabase
    .from('course_assets')
    .select('*')
    .eq('course_id', courseData.id);

  return {
    ...courseData,
    category: categoryData,
    assets: assetsData || []
  };
}

/**
 * Fetch all course slugs (for static path generation)
 */
export async function getAllCourseSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('slug');

  if (error) {
    console.error('Error fetching course slugs:', error);
    throw error;
  }

  return (data || []).map(course => course.slug);
}

/**
 * Fetch courses for a specific category
 */
export async function getCoursesByCategoryId(categoryId: number): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('category_id', categoryId)
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching courses by category:', error);
    throw error;
  }

  return data || [];
}
