import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TrainingCatalogue from '@/components/TrainingCatalogue';
import { getCoursesByCategory } from '@/lib/supabase/queries';

// Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

export const metadata = {
  title: 'Online Training Courses | Hampton Safety Ltd',
  description: 'Comprehensive online health and safety training courses. IOSH, NEBOSH, Fire Safety, Food Hygiene and more. Free trials available.',
};

export default async function TrainingCataloguePage() {
  const coursesByCategory = await getCoursesByCategory();

  // Filter out empty categories
  const categoriesWithCourses = coursesByCategory.filter(({ courses }) => courses.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <TrainingCatalogue coursesByCategory={categoriesWithCourses} />
      <Footer />
    </div>
  );
}
