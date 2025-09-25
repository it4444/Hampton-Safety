import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Shield, CheckCircle, Users, Award, Clock, FileText, Phone, Target } from 'lucide-react'

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 hampton-gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-hampton-blue/20 mb-6">
              <Shield className="w-4 h-4 text-hampton-blue mr-2" />
              <span className="text-sm font-medium text-hampton-blue">Retained H&S Consultants</span>
            </div>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Health & Safety Consultancy
            </h1>
            <p className="hampton-body-lg text-gray-600 mb-8">
              Appoint Hampton Safety Ltd as your retained Health and Safety consultant to help fulfil your statutory requirements.
              Expert guidance tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="hampton-heading-lg text-gray-900 mb-6">
                Your Dedicated Safety Partner
              </h2>
              <p className="hampton-body text-gray-600 mb-6">
                Our retained consultancy service provides you with dedicated access to senior health and safety expertise.
                We become an extension of your team, understanding your business inside and out to deliver practical,
                proportionate solutions that keep you compliant and your people safe.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Statutory Compliance</p>
                    <p className="text-sm text-gray-600">Fulfil all your legal H&S obligations with confidence</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Senior Consultant Access</p>
                    <p className="text-sm text-gray-600">Direct access to experienced professionals, not junior staff</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Bespoke Solutions</p>
                    <p className="text-sm text-gray-600">Tailored strategies that fit your operational requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hampton-image-hero">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Users className="w-16 h-16 text-hampton-blue/50 mx-auto mb-4" />
                  <p className="text-hampton-blue/70 font-medium">Your Extended Safety Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-hampton-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Comprehensive Consultancy Services
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Our retained consultancy package provides everything you need to maintain excellence in health and safety management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hampton-card-hover">
              <CardHeader>
                <FileText className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Policy Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Creation and maintenance of comprehensive H&S policies tailored to your operations.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Health & Safety Policy</li>
                  <li>• Safe systems of work</li>
                  <li>• Emergency procedures</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Target className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Regular Site Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Scheduled visits to monitor compliance and identify improvement opportunities.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Workplace inspections</li>
                  <li>• Safety observations</li>
                  <li>• Progress reviews</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Shield className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive risk assessment and control measure implementation.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Risk assessments</li>
                  <li>• Method statements</li>
                  <li>• Control measures</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Users className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Staff Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Ongoing support and guidance for your team on H&S matters.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• H&S committee support</li>
                  <li>• Toolbox talks</li>
                  <li>• Incident investigation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Award className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Compliance Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Stay ahead of regulatory changes and maintain full compliance.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Legislation updates</li>
                  <li>• Audit preparation</li>
                  <li>• HSE liaison</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Phone className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Round-the-clock access to expert advice when you need it most.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Emergency helpline</li>
                  <li>• Incident response</li>
                  <li>• Expert guidance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Hampton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hampton-image-card">
              <div className="flex items-center justify-center h-full">
                <Award className="w-12 h-12 text-hampton-blue/50" />
              </div>
            </div>
            <div>
              <h2 className="hampton-heading-lg text-gray-900 mb-6">
                Why Choose Hampton Safety?
              </h2>
              <p className="hampton-body text-gray-600 mb-6">
                What sets Hampton Safety apart is our people-first approach. While many companies offer off-the-shelf solutions,
                we believe that health and safety needs a personal touch.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-green mt-1 flex-shrink-0" />
                  <p className="hampton-body">
                    <span className="font-semibold">Experienced Team:</span> Years of experience across complex, high-risk projects including major infrastructure initiatives
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-green mt-1 flex-shrink-0" />
                  <p className="hampton-body">
                    <span className="font-semibold">Sector Expertise:</span> Deep understanding of construction, manufacturing, infrastructure and retail sectors
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-green mt-1 flex-shrink-0" />
                  <p className="hampton-body">
                    <span className="font-semibold">IOSH Accredited:</span> Fully accredited by recognised industry bodies, ensuring the highest standards
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-green mt-1 flex-shrink-0" />
                  <p className="hampton-body">
                    <span className="font-semibold">Partnership Approach:</span> We're here to build lasting partnerships that protect your people and enhance productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              How Our Retained Service Works
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              A straightforward process designed to integrate seamlessly with your operations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Initial Consultation</h3>
                  <p className="text-gray-600">We start with a comprehensive review of your current H&S arrangements and identify areas for improvement</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tailored Service Agreement</h3>
                  <p className="text-gray-600">We develop a bespoke service package that matches your specific needs, size and sector requirements</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Implementation & Integration</h3>
                  <p className="text-gray-600">Your dedicated consultant works with your team to implement improvements and establish robust H&S systems</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-hampton-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ongoing Support & Review</h3>
                  <p className="text-gray-600">Regular visits, continuous monitoring, and proactive support ensure you maintain compliance and best practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Flexible Service Packages
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Choose the level of support that suits your business size and requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle>Essential</CardTitle>
                <CardDescription>For smaller businesses needing core compliance support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Quarterly site visits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Core policy development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Risk assessment support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Email & phone support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover border-hampton-blue">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle>Professional</CardTitle>
                  <Badge className="bg-hampton-blue text-white">Popular</Badge>
                </div>
                <CardDescription>Comprehensive support for growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly site visits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Full policy suite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Training coordination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Incident investigation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>24/7 emergency support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Tailored solutions for complex operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Weekly/fortnightly visits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dedicated consultant team</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Board-level reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Multi-site coordination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-hampton-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Bespoke solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hampton-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg text-white mb-4">
            Ready to Transform Your H&S Management?
          </h2>
          <p className="hampton-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join the businesses that trust Hampton Safety as their retained health and safety consultant.
            Get expert support tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-hampton-blue hover:bg-gray-100">
              <Link href="/contact">Schedule Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hampton-blue">
              <Link href="/services/training">View Training Services</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}