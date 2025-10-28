'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import {
  Shield,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  Phone,
  Clock,
  Star,
  GraduationCap,
  BookOpen,
  Briefcase,
  Heart,
  Utensils
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative hampton-gradient-light py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 via-transparent to-hampton-light/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 hampton-trust-badge">
                Trusted Health & Safety Specialists
              </Badge>
              <h1 className="hampton-heading-xl text-gray-900 mb-6">
                Tailored Safety Solutions.
                <span className="text-hampton-blue"> People-First Approach.</span>
              </h1>
              <p className="hampton-body-lg mb-8">
                Bespoke health and safety consultancy that keeps your people protected and your business compliant.
                From growing enterprises to established organisations, we deliver solutions that fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="hampton-button-primary" asChild>
                  <Link href="/contact">Request a Consultation</Link>
                </Button>
                <Button variant="outline" size="lg" className="group border-hampton-blue text-hampton-blue hover:bg-hampton-blue hover:text-white" asChild>
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-hampton-blue rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-hampton-green rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-hampton-medium rounded-full border-2 border-white"></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">Trusted by blue-chip clients and governmental departments</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/images/Hampton safety_factory..png"
                alt="Hampton Safety consultant providing professional health and safety consultancy services"
                width={600}
                height={600}
                className="rounded-lg shadow-xl w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="hampton-heading-lg text-gray-900 mb-4 ">
              Comprehensive Health & Safety Solutions
            </h2>
            <p className="hampton-body-lg max-w-3xl mx-auto">
              Crafted to meet the specific needs of businesses across construction, manufacturing,
              infrastructure and beyond. Every solution tailored to your operational requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hampton-card-hover group cursor-pointer">
              <CardHeader>
                <div className="hampton-icon-card mb-4 relative overflow-hidden">
                  <Shield className="h-12 w-12 text-hampton-blue" />
                  <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 to-hampton-royal/5"></div>
                </div>
                <CardTitle className="hampton-heading-md">Retained Consultancy</CardTitle>
                <CardDescription>
                  Dedicated H&S consultant to fulfil your statutory requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Regular site visits</li>
                  <li>• Compliance monitoring</li>
                  <li>• Documentation support</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/services/consultancy">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover group cursor-pointer">
              <CardHeader>
                <div className="hampton-icon-card mb-4 relative overflow-hidden">
                  <CheckCircle className="h-12 w-12 text-hampton-blue" />
                  <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 to-hampton-royal/5"></div>
                </div>
                <CardTitle className="hampton-heading-md">Risk Assessments</CardTitle>
                <CardDescription>
                  Comprehensive workplace risk evaluation and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Detailed risk analysis</li>
                  <li>• Action plan creation</li>
                  <li>• Regular reviews</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/services/risk-assessments">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover group cursor-pointer">
              <CardHeader>
                <div className="hampton-icon-card mb-4 relative overflow-hidden">
                  <Award className="h-12 w-12 text-hampton-blue" />
                  <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 to-hampton-royal/5"></div>
                </div>
                <CardTitle className="hampton-heading-md">Management Systems</CardTitle>
                <CardDescription>
                  ISO-aligned management system implementation and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Certification guidance</li>
                  <li>• Implementation support</li>
                  <li>• Audit preparation</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/services/iso-certification">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover group cursor-pointer">
              <CardHeader>
                <div className="hampton-icon-card mb-4 relative overflow-hidden">
                  <Users className="h-12 w-12 text-hampton-blue" />
                  <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 to-hampton-royal/5"></div>
                </div>
                <CardTitle className="hampton-heading-md">Safety Training</CardTitle>
                <CardDescription>
                  Safety training on and off-site to your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Managing Safely courses</li>
                  <li>• <Link href="/services/training" className="text-hampton-blue hover:underline">Full list available here</Link></li>
                  <li>• Bespoke programs</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform" asChild>
                  <Link href="/services/training">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Online Training Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-hampton-light via-white to-hampton-green/5">
        <div className="absolute inset-0 bg-gradient-to-br from-hampton-blue/5 via-transparent to-hampton-green/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Badge className="mb-6 bg-hampton-green/10 text-hampton-green border-hampton-green/20">
                <GraduationCap className="mr-2 h-4 w-4" />
                140+ Professional Courses
              </Badge>

              <h2 className="hampton-heading-lg text-gray-900 mb-4">
                Professional Online Training
              </h2>

              <p className="hampton-body-lg max-w-3xl mx-auto mb-8 text-gray-700">
                Study at your own pace with our comprehensive e-learning platform. From IOSH and NEBOSH
                qualifications to Fire Safety, Food Hygiene, and Mental Health awareness courses.
              </p>

              {/* Category Preview Icons */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-hampton-blue/10 flex items-center justify-center mb-2">
                    <Shield className="h-7 w-7 text-hampton-blue" />
                  </div>
                  <span className="text-sm text-gray-600">Health & Safety</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-hampton-blue/10 flex items-center justify-center mb-2">
                    <Briefcase className="h-7 w-7 text-hampton-blue" />
                  </div>
                  <span className="text-sm text-gray-600">Business Skills</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-hampton-blue/10 flex items-center justify-center mb-2">
                    <Heart className="h-7 w-7 text-hampton-blue" />
                  </div>
                  <span className="text-sm text-gray-600">Health & Social Care</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-hampton-blue/10 flex items-center justify-center mb-2">
                    <BookOpen className="h-7 w-7 text-hampton-blue" />
                  </div>
                  <span className="text-sm text-gray-600">Mental Health</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-hampton-blue/10 flex items-center justify-center mb-2">
                    <Utensils className="h-7 w-7 text-hampton-blue" />
                  </div>
                  <span className="text-sm text-gray-600">Hospitality</span>
                </div>
              </div>

              {/* CTA Button with Green Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="hampton-button-primary shadow-lg shadow-hampton-green/20 hover:shadow-xl hover:shadow-hampton-green/30 transition-all"
                  asChild
                >
                  <Link href="/training">
                    Browse Online Training Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 hampton-gradient-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="hampton-heading-lg text-gray-900 mb-6 ">
                Why businesses choose our people-first approach
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="hampton-heading-md text-gray-900 mb-1">Proven Experience & Expertise</h3>
                    <p className="hampton-body">
                      Years of experience across complex, high-risk projects including major infrastructure initiatives.
                      Deep understanding of unique challenges faced by industries where compliance is critical.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="hampton-heading-md text-gray-900 mb-1">Bespoke Solutions, Not Box-Ticking</h3>
                    <p className="hampton-body">
                      While many companies offer off-the-shelf solutions, we take time to understand your specific needs.
                      Our consultants deliver tailored strategies that fit your operational requirements perfectly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="hampton-heading-md text-gray-900 mb-1">Building Lasting Partnerships</h3>
                    <p className="hampton-body">
                      We&apos;re here to build lasting partnerships that protect your people, enhance productivity,
                      and give you confidence in your compliance. Much of our business comes through referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="mb-6 relative">
                <Image
                  src="/images/why-choose-us.png"
                  alt="Why businesses choose our people-first approach"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
              <Card className="hampton-card-premium">
                <CardHeader>
                  <CardTitle className="hampton-heading-md">Ready to ensure compliance?</CardTitle>
                  <CardDescription>
                    Schedule your consultation with our safety experts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-hampton-blue mr-2" />
                      <span className="text-sm text-gray-600">30-minute consultation</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-hampton-blue mr-2" />
                      <span className="text-sm text-gray-600">Same-day response</span>
                    </div>
                    <Button className="w-full" size="lg" asChild>
                      <Link href="/contact">Request a Consultation</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="hampton-heading-lg text-gray-900 mb-4 ">
              What Our Clients Say
            </h2>
            <p className="hampton-body-lg">
              Real feedback from businesses we&apos;ve helped achieve safety excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hampton-card-hover relative">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-hampton-green">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="hampton-body italic mb-4">
                  &ldquo;Gary has worked with us for numerous years and has taken our Health &amp; Safety to the next level. With a keen eye for detail, his documentation and reports continue to impress both new and existing clients.&rdquo;
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold hampton-heading-md">Michael Murphy</div>
                  <div className="text-sm text-slate-500 hampton-body">Access International Security</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover relative">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-hampton-green">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="hampton-body italic mb-4">
                  &ldquo;Thank you for delivering this training course - it exceeded my expectations. Gary&apos;s professional approach and expertise made the session both informative and engaging.&rdquo;
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold hampton-heading-md">Alberto Moreno Montanes</div>
                  <div className="text-sm text-slate-500 hampton-body">Senior Quality and HSE Engineer, Emerson</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover relative">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-hampton-green">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="hampton-body italic mb-4">
                  &ldquo;Gary did an excellent job delivering our safety training. The session was well-presented, very informative, and perfectly tailored to our operational needs.&rdquo;
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold hampton-heading-md">Steven Nielsen</div>
                  <div className="text-sm text-slate-500 hampton-body">Night Operations Manager, Bakkavor Meals</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}