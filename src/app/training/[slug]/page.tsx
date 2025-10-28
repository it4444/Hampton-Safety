import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ExternalLink, PlayCircle, FileDown, ArrowLeft, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseBySlug, getAllCourseSlugs } from '@/lib/supabase/queries';
import type { Metadata } from 'next';

// Revalidate every 24 hours
export const revalidate = 86400;

// Generate static paths for all courses
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: 'Course Not Found | Hampton Safety Ltd',
    };
  }

  return {
    title: `${course.title} | Online Training | Hampton Safety Ltd`,
    description: course.description || `Learn about ${course.title} through our professional online training course.`,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const { category, assets = [] } = course;
  const videoAssets = assets.filter(asset => asset.type === 'video');
  const pdfAssets = assets.filter(asset => asset.type === 'pdf');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb & Back Link */}
      <section className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/training"
            className="inline-flex items-center text-sm text-hampton-blue hover:underline mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Courses
          </Link>
          <div className="text-sm text-gray-600">
            <Link href="/training" className="hover:text-hampton-blue">Training</Link>
            {' '}/{' '}
            <Link href={`/training#${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-hampton-blue">
              {category.name}
            </Link>
            {' '}/{' '}
            <span className="text-gray-900">{course.title}</span>
          </div>
        </div>
      </section>

      {/* Course Header */}
      <section className="py-12 bg-gradient-to-br from-hampton-light to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2">
              <Badge className="mb-4 bg-hampton-blue/10 text-hampton-blue border-hampton-blue/20">
                {category.name}
              </Badge>

              <h1 className="hampton-heading-xl text-gray-900 mb-6">
                {course.title}
              </h1>

              {course.description && (
                <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                  <p className="hampton-body-lg">{course.description}</p>
                </div>
              )}

              {/* Course Icon */}
              {course.icon_url && (
                <div className="mb-8">
                  <div className="relative h-40 w-40 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <Image
                      src={course.icon_url}
                      alt={`${course.title} course icon`}
                      fill
                      className="object-contain p-2"
                      sizes="160px"
                    />
                  </div>
                </div>
              )}

              {/* Video Assets */}
              {videoAssets.length > 0 && (
                <div className="mb-8">
                  <h2 className="hampton-heading-md text-gray-900 mb-4">Course Preview</h2>
                  <div className="space-y-4">
                    {videoAssets.map((video) => (
                      <Card key={video.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          {/* For iframe embeds */}
                          {video.url.includes('iframe') || video.url.includes('embed') ? (
                            <div className="aspect-video">
                              <iframe
                                src={video.url}
                                title={video.label || 'Course video'}
                                className="w-full h-full"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <video
                              src={video.url}
                              controls
                              className="w-full"
                              poster={course.icon_url || undefined}
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {video.label && (
                            <div className="p-4 bg-gray-50">
                              <p className="text-sm text-gray-700">{video.label}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Assets */}
              {pdfAssets.length > 0 && (
                <div className="mb-8">
                  <h2 className="hampton-heading-md text-gray-900 mb-4">Course Materials</h2>
                  <div className="grid gap-3">
                    {pdfAssets.map((pdf) => (
                      <a
                        key={pdf.id}
                        href={pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group"
                      >
                        <FileDown className="h-5 w-5 text-hampton-blue flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-hampton-blue">
                            {pdf.label || 'Download PDF'}
                          </p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-hampton-blue flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Purchase Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 border-hampton-blue/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="hampton-heading-md text-gray-900 mb-2">Enroll Now</h3>
                    <p className="text-sm text-gray-600">
                      Start learning immediately with our online platform
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Purchase Button */}
                    <Button
                      size="lg"
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
                        size="lg"
                        variant="outline"
                        className="w-full border-hampton-green text-hampton-green hover:bg-hampton-green hover:text-white"
                        asChild
                      >
                        <a href={course.free_trial_url} target="_blank" rel="noopener noreferrer">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start Free Trial
                        </a>
                      </Button>
                    )}

                    {/* Suite Link */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-2">Part of:</p>
                      <Link
                        href={`/training#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-hampton-blue hover:underline font-medium"
                      >
                        {category.name}
                      </Link>
                    </div>

                    {/* Corporate Enquiry */}
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-3">
                        Need training for multiple employees?
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full justify-start text-hampton-blue hover:text-hampton-blue hover:bg-hampton-blue/10"
                        asChild
                      >
                        <Link href="/contact">
                          Request Corporate Quote →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card className="mt-6 bg-hampton-light/50 border-hampton-blue/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-6 w-6 text-hampton-blue flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Professional Certification</h4>
                      <p className="text-xs text-gray-600">
                        All courses provide accredited certification upon successful completion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg text-gray-900 mb-4">
            Explore More Courses
          </h2>
          <p className="hampton-body text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover additional training opportunities in {category.name} and other categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/training">
                Browse All Courses
              </Link>
            </Button>
            <Button size="lg" className="hampton-button-primary" asChild>
              <a href={category.purchase_url} target="_blank" rel="noopener noreferrer">
                View {category.name} Suite
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
