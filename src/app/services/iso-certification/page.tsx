import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Award, CheckCircle, Target, Users, FileCheck, Clock } from 'lucide-react'

export default function ManagementSystemsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 hampton-gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-hampton-blue/20 mb-6">
              <Award className="w-4 h-4 text-hampton-blue mr-2" />
              <span className="text-sm font-medium text-hampton-blue">Management System Specialists</span>
            </div>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Management Systems Support
            </h1>
            <p className="hampton-body-lg text-gray-600 mb-8">
              Expert guidance to design, implement, and maintain effective management systems. Streamline your organisation&apos;s processes with proven methodologies aligned to international standards.
            </p>
          </div>
        </div>
      </section>

      {/* Management Systems Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="hampton-heading-lg text-gray-900 mb-6">
                Management Systems
              </h2>
              <p className="hampton-body text-gray-600 mb-6">
                A robust management system helps organisations improve performance, meet compliance requirements, and demonstrate commitment to best practice. Our consultants provide end-to-end support tailored to your industry and certification goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Gap Analysis & Planning</p>
                    <p className="text-sm text-gray-600">Comprehensive assessment of your current systems against chosen management system requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Implementation Support</p>
                    <p className="text-sm text-gray-600">Step-by-step guidance through system development, documentation, and integration with existing processes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Audit Preparation</p>
                    <p className="text-sm text-gray-600">Pre-assessment audits and certification body liaison to ensure smooth certification journeys</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video w-full min-h-[250px] md:min-h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/services/iso-certification-hero.png"
                alt="Professional reviewing ISO certification documentation and quality management materials"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-hampton-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Benefits of Implementing a Management System
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Achieve measurable improvements in organisational performance while demonstrating commitment to best practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <Target className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Improved Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Structured frameworks to enhance efficiency, reduce risks, and drive measurable improvements.
                </p>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <Users className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Enhanced Reputation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Demonstrate commitment to internationally recognised standards and attract clients who value quality and responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <FileCheck className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Legal & Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Ensure your organisation stays aligned with relevant legislation and industry obligations.
                </p>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <Clock className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Operational Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Streamlined processes that reduce waste, prevent incidents, and improve productivity.
                </p>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <Award className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Competitive Advantage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Meet tender requirements and win more business with certified management systems.
                </p>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover text-center">
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-hampton-blue mx-auto mb-2" />
                <CardTitle className="text-hampton-blue">Continuous Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Built-in review and feedback cycles ensure your system evolves with your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Our Management System Implementation Process
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              A proven, step-by-step approach to achieving certification with minimal disruption to your operations.
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="hampton-heading-md text-gray-900">Initial Assessment & Gap Analysis</h3>
                </div>
                <p className="hampton-body text-gray-600 mb-4">
                  Review of your current practices against the relevant ISO standards. We identify gaps and create a tailored implementation roadmap.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Current system documentation review</li>
                  <li>• Stakeholder interviews</li>
                  <li>• Gap analysis report with prioritised actions</li>
                  <li>• Implementation timeline and resource planning</li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden md:order-2">
                <Image
                  src="/images/services/gap-analysis.png"
                  alt="Gap analysis documentation and assessment process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/services/system-development.png"
                  alt="System development and documentation process"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="hampton-heading-md text-gray-900">System Development & Documentation</h3>
                </div>
                <p className="hampton-body text-gray-600 mb-4">
                  Development of compliant policies, procedures, and supporting documentation. We work with your team to ensure practical, user-friendly systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Policy and objective development</li>
                  <li>• Procedure writing and process mapping</li>
                  <li>• Training material creation</li>
                  <li>• Risk and opportunity registers</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="hampton-heading-md text-gray-900">Training & Implementation</h3>
                </div>
                <p className="hampton-body text-gray-600 mb-4">
                  Engaging training for your team, followed by guided implementation with ongoing support.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Management and staff training programmes</li>
                  <li>• Implementation coaching and support</li>
                  <li>• Internal audit training</li>
                  <li>• System monitoring and adjustment</li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden md:order-2">
                <Image
                  src="/images/services/training-implementation.png"
                  alt="Training and implementation with team engagement"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/services/certification-support.png"
                  alt="Certification support and audit preparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="hampton-heading-md text-gray-900">Audit Preparation & Certification</h3>
                </div>
                <p className="hampton-body text-gray-600 mb-4">
                  Support throughout the certification process.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pre-assessment internal audits</li>
                  <li>• Certification body liaison</li>
                  <li>• Audit preparation and support</li>
                  <li>• Post-certification maintenance and improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hampton-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg text-white mb-4">
            Start Your Management System Journey Today
          </h2>
          <p className="hampton-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join the organisations achieving excellence with our expert management system implementation support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-hampton-blue hover:bg-gray-100">
              <Link href="/contact">Request Management System Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
              <Link href="/services/training">Explore Training Services</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}