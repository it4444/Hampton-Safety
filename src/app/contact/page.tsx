'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  Calendar
} from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4" variant="secondary">
              Get In Touch
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Let's Make Your Workplace
              <span className="text-blue-600"> Safer Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Whether you're looking for expert health and safety advice, tailored consultancy services,
              or accredited training programs, our team is here to help. Start with a free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-center p-6">
                    <Phone className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600">[Insert Phone Number]</p>
                      <p className="text-sm text-gray-500">Call for immediate consultation</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-6">
                    <Mail className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600">[Insert Email Address]</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-6">
                    <MapPin className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Office Address</h3>
                      <p className="text-gray-600">[Insert Address]</p>
                      <p className="text-sm text-gray-500">Serving businesses across the UK</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center p-6">
                    <Clock className="h-8 w-8 text-blue-600 mr-4" />
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-sm text-gray-500">Emergency support available</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Get Your Free Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below, and one of our safety experts will be in touch with you shortly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select your industry</option>
                        <option value="construction">Construction</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="logistics">Logistics</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interest
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">What service are you interested in?</option>
                        <option value="consultancy">Health & Safety Consultancy</option>
                        <option value="risk-assessment">Risk Assessments & Audits</option>
                        <option value="iso-certification">ISO 45001 Certification</option>
                        <option value="training">Safety Training</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about your health and safety requirements..."
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation Benefits */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What to Expect from Your Free Consultation
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>30-Minute Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Comprehensive discussion of your health and safety needs and current compliance status.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Expert Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Professional evaluation of your requirements with actionable recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Tailored Proposal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Customized solution proposal with transparent pricing and clear next steps.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center space-x-2 text-green-600 mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">No obligation • Same-day response • Expert guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Serving Businesses Across the UK
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              We serve businesses across the UK with offices in [Insert Cities/Regions].
              No matter where you are located, we're ready to bring our health and safety expertise to your doorstep.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>On-Site Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Site visits and assessments</li>
                    <li>• On-site training delivery</li>
                    <li>• Risk assessment walkthroughs</li>
                    <li>• Face-fit testing sessions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Remote Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li>• Virtual consultations</li>
                    <li>• Document reviews</li>
                    <li>• Policy development</li>
                    <li>• Compliance guidance</li>
                  </ul>
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
            Ready to Start Building a Safer Future for Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you're looking to improve workplace safety, achieve ISO certification,
            or receive tailored consultancy, Hampton Safety Ltd has the expertise to guide you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
              Call Now
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}