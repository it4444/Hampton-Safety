'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import {
  Shield,
  CheckCircle,
  Users,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4" variant="secondary">
                Trusted by Infrastructure & Construction Leaders
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Keep Your People Safe.
                <span className="text-blue-600"> Keep Your Business Compliant.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Tailored health and safety solutions for medium to enterprise businesses.
                From London Underground to local construction - we ensure your supply chain due diligence meets the highest standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
                <Button variant="outline" size="lg" className="group">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="ml-3 text-sm text-gray-600">Trusted by 100+ businesses</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">5-star service</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="bg-white/80 backdrop-blur border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-blue-600" />
                    Quick Compliance Check
                  </CardTitle>
                  <CardDescription>
                    Does your business meet current H&S requirements?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Assessments Updated</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Staff Training Current</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ISO 45001 Certified</span>
                      <span className="text-sm text-orange-500">Recommended</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Get Full Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-gray-600">Businesses Protected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">IOSH</div>
              <div className="text-sm text-gray-600">Licensed Training</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Health & Safety Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From retained consultancy to specialist training, we provide everything
              your procurement team needs to demonstrate due diligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Shield className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Retained Consultancy</CardTitle>
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
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Risk Assessments</CardTitle>
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
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Award className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">ISO 45001 Support</CardTitle>
                <CardDescription>
                  Achieve industry-standard certification to enhance competitiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Certification guidance</li>
                  <li>• Implementation support</li>
                  <li>• Audit preparation</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Safety Training</CardTitle>
                <CardDescription>
                  IOSH-accredited courses delivered on-site to your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Managing Safely courses</li>
                  <li>• Face-fit testing</li>
                  <li>• Bespoke programs</li>
                </ul>
                <Button variant="ghost" className="mt-4 p-0 h-auto group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why procurement teams choose Hampton Safety
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Proven Track Record</h3>
                    <p className="text-gray-600">
                      Extensive experience on critical infrastructure including London Underground and national rail networks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personalized Approach</h3>
                    <p className="text-gray-600">
                      Unlike larger competitors, we provide bespoke solutions tailored to your specific operational needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Referral-Based Reputation</h3>
                    <p className="text-gray-600">
                      Much of our business comes through recommendations from satisfied clients across various sectors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Ready to ensure compliance?</CardTitle>
                <CardDescription>
                  Schedule your free consultation with our safety experts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">30-minute consultation</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">Same-day response</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm">No obligation quote</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Book Consultation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Hampton Safety Ltd</h3>
              <p className="text-gray-400 text-sm mb-4">
                Professional health and safety consultancy for businesses across the UK.
              </p>
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-sm">[Phone Number]</span>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">[Email Address]</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">[Office Address]</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/services/consultancy" className="hover:text-white">Health & Safety Consultancy</Link></li>
                <li><Link href="/services/risk-assessments" className="hover:text-white">Risk Assessments</Link></li>
                <li><Link href="/services/iso-certification" className="hover:text-white">ISO 45001 Certification</Link></li>
                <li><Link href="/services/training" className="hover:text-white">Safety Training</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/case-studies" className="hover:text-white">Case Studies</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Get Started</h3>
              <p className="text-gray-400 text-sm mb-4">
                Ready to improve your workplace safety?
              </p>
              <Button variant="outline" className="text-black border-white hover:bg-white">
                Free Consultation
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Hampton Safety Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}