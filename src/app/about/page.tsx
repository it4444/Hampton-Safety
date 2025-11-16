'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Award,
  Building,
  Target,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hampton-light to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4" variant="secondary">
              About Hampton Safety Ltd
            </Badge>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Every Workplace Should Be a
              <span className="text-hampton-blue"> Safe One</span>
            </h1>
            <p className="hampton-body-lg mb-8">
              At Hampton Safety Ltd, we believe that a safer workplace is a more successful one.
              We&apos;re driven by a commitment to deliver personalised health and safety services
              that help businesses thrive while meeting regulatory standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-hampton-blue mx-auto mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="hampton-body">
                  Our core belief is that a safer workplace is a more successful one. We help each
                  organisation understand what is required to achieve and maintain a safe working environment.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-hampton-blue mx-auto mb-4" />
                <CardTitle>Our Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="hampton-body">
                  We take a people-first approach, offering bespoke solutions designed to fit your
                  operational requirements. We&apos;re here to build lasting partnerships that protect your people.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-hampton-blue mx-auto mb-4" />
                <CardTitle>Our Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="hampton-body">
                  With years of experience on blue chip and national infrastructure projects,
                  we bring expertise to every client we work with.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-hampton-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="hampton-heading-lg text-gray-900 mb-8 text-center">
              Why Choose Hampton Safety?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalised Touch</h3>
                  <p className="hampton-body">
                    While many companies offer off-the-shelf solutions, we believe that health and safety
                    needs a personal touch. Our consultants take the time to understand your specific business needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                  <p className="hampton-body">
                    Our reputation has been built on years of reliable service, with much of our business
                    coming through referrals and recommendations from satisfied clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-hampton-green mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Industry Expertise</h3>
                  <p className="hampton-body">
                    Extensive experience in various sectors, including construction, manufacturing, and housing,
                    with work on critical infrastructure projects where stringent safety standards are paramount.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="hampton-heading-lg text-gray-900 mb-8">
              Accreditations and Trust
            </h2>
            <p className="hampton-body-lg mb-12">
              Our company operates to the highest standards with IOSH membership as a Licensed IOSH Training Centre.
              Our training courses and consultancy services meet the highest standards of safety and compliance.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-hampton-blue mx-auto mb-2" />
                  <div className="font-semibold">IOSH</div>
                  <div className="text-sm text-gray-600">Licensed IOSH Training Centre</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">IIRSM</div>
                  <div className="text-sm text-gray-600">Accredited Courses</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">IATP</div>
                  <div className="text-sm text-gray-600">Recognised Training</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">CPD</div>
                  <div className="text-sm text-gray-600">Certified Courses</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your workplace into a safer, more productive environment?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us today to schedule your consultation and discover how Hampton Safety Ltd
            can help you achieve peace of mind while meeting all your health and safety obligations.
          </p>
          <Button size="lg" variant="outline" className="text-white border-white bg-transparent hover:bg-white/10" asChild>
            <Link href="/contact">Request a Consultation</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}