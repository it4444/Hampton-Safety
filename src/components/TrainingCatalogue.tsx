'use client'

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { GraduationCap, ExternalLink, PlayCircle, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { CoursesByCategory } from '@/types/training';

interface TrainingCatalogueProps {
  coursesByCategory: CoursesByCategory[];
}

export default function TrainingCatalogue({ coursesByCategory }: TrainingCatalogueProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on selected category and search query
  const filteredCoursesByCategory = useMemo(() => {
    let filtered = coursesByCategory;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(({ category }) => category.id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map(({ category, courses }) => ({
        category,
        courses: courses.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            (course.description && course.description.toLowerCase().includes(query))
        ),
      }));
    }

    // Remove empty categories
    return filtered.filter(({ courses }) => courses.length > 0);
  }, [coursesByCategory, selectedCategory, searchQuery]);

  // Calculate total courses
  const totalCourses = coursesByCategory.reduce((sum, { courses }) => sum + courses.length, 0);
  const filteredTotalCourses = filteredCoursesByCategory.reduce(
    (sum, { courses }) => sum + courses.length,
    0
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative hampton-gradient-light py-16 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 via-transparent to-hampton-light/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 hampton-trust-badge">
              <GraduationCap className="mr-2 h-4 w-4" />
              Professional Online Training
            </Badge>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Online Training
              <span className="text-hampton-blue"> Courses</span>
            </h1>
            <p className="hampton-body-lg mb-8 text-gray-700">
              Access {totalCourses}+ professional health and safety courses, delivered online at your pace.
              From essential compliance training to advanced qualifications, we have the right course for you.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base border-2 border-gray-200 focus:border-hampton-blue rounded-xl"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => setSelectedCategory('all')}
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                className={
                  selectedCategory === 'all'
                    ? 'bg-hampton-blue text-white hover:bg-hampton-blue/90'
                    : 'border-hampton-blue/30 text-hampton-blue hover:bg-hampton-blue/10'
                }
              >
                All Courses ({totalCourses})
              </Button>
              {coursesByCategory.map(({ category, courses }) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className={
                    selectedCategory === category.id
                      ? 'bg-hampton-blue text-white hover:bg-hampton-blue/90'
                      : 'border-hampton-blue/30 text-hampton-blue hover:bg-hampton-blue/10'
                  }
                >
                  {category.name} ({courses.length})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredCoursesByCategory.length === 0 ? (
            <div className="text-center py-20">
              <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="hampton-heading-lg text-gray-600 mb-2">No Courses Found</h2>
              <p className="hampton-body text-gray-500 mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="border-hampton-blue text-hampton-blue hover:bg-hampton-blue hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="mb-8 text-center">
                  <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-hampton-blue">{filteredTotalCourses}</span>{' '}
                    {filteredTotalCourses === 1 ? 'course' : 'courses'}
                    {searchQuery && (
                      <>
                        {' '}
                        matching "<span className="font-semibold">{searchQuery}</span>"
                      </>
                    )}
                  </p>
                </div>
              )}

              {filteredCoursesByCategory.map(({ category, courses }) => (
                <div key={category.id} className="mb-16 last:mb-0">
                  {/* Category Header (only show when viewing all) */}
                  {selectedCategory === 'all' && (
                    <div className="mb-8">
                      <h2 className="hampton-heading-lg text-gray-900 mb-2">{category.name}</h2>
                      <p className="hampton-body text-gray-600">
                        {courses.length} course{courses.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                  )}

                  {/* Course Cards Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="hampton-card-hover flex flex-col">
                        <CardHeader>
                          {/* Category Badge */}
                          <Badge className="mb-3 w-fit bg-hampton-blue/10 text-hampton-blue border-hampton-blue/20 text-xs">
                            {category.name}
                          </Badge>

                          {/* Course Icon */}
                          {course.icon_url ? (
                            <div className="mb-4 relative h-24 w-full">
                              <Image
                                src={course.icon_url}
                                alt={`${course.title} icon`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              />
                            </div>
                          ) : (
                            <div className="hampton-icon-card mb-4">
                              <GraduationCap className="h-12 w-12 text-hampton-blue" />
                            </div>
                          )}

                          <CardTitle className="hampton-heading-sm line-clamp-2 min-h-[3rem]">
                            {course.title}
                          </CardTitle>

                          {course.description && (
                            <CardDescription className="line-clamp-3 min-h-[4.5rem]">
                              {course.description}
                            </CardDescription>
                          )}
                        </CardHeader>

                        <CardContent className="mt-auto">
                          <div className="flex flex-col gap-2">
                            {/* Purchase Button */}
                            <Button
                              size="sm"
                              className="w-full hampton-button-primary"
                              asChild
                            >
                              <a href={course.purchase_url} target="_blank" rel="noopener noreferrer">
                                Buy Course
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>

                            {/* Free Trial Button */}
                            {course.free_trial_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full border-hampton-green text-hampton-green hover:bg-hampton-green hover:text-white"
                                asChild
                              >
                                <a href={course.free_trial_url} target="_blank" rel="noopener noreferrer">
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Free Trial
                                </a>
                              </Button>
                            )}

                            {/* Details Link */}
                            <Link
                              href={`/training/${course.slug}`}
                              className="text-sm text-hampton-blue hover:underline text-center py-1"
                            >
                              View Details →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-hampton-royal to-hampton-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg mb-4">
            Need Help Choosing the Right Course?
          </h2>
          <p className="hampton-body-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our team can help you identify the perfect training solutions for your business needs.
            Contact us for corporate packages and group discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-hampton-blue"
              asChild
            >
              <Link href="/services/training">Bespoke Training Options</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
