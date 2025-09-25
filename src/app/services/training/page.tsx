import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { GraduationCap, Users, Clock, CheckCircle, BookOpen, Shield } from 'lucide-react'

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 hampton-gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-hampton-blue/20 mb-6">
              <GraduationCap className="w-4 h-4 text-hampton-blue mr-2" />
              <span className="text-sm font-medium text-hampton-blue">Professional Development</span>
            </div>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Health & Safety Training
            </h1>
            <p className="hampton-body-lg text-gray-600 mb-8">
              Comprehensive training programmes designed to build competence, ensure compliance, and create a positive safety culture across your organisation.
            </p>
          </div>
        </div>
      </section>

      {/* Training Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="hampton-heading-lg text-gray-900 mb-6">
                Expert-Led Training Solutions
              </h2>
              <p className="hampton-body text-gray-600 mb-6">
                Our training programmes combine regulatory compliance with practical application, delivered by experienced health and safety professionals who understand your industry challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Accredited Programmes</p>
                    <p className="text-sm text-gray-600">IOSH, NEBOSH, and industry-recognised qualifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Delivery</p>
                    <p className="text-sm text-gray-600">On-site, virtual, or blended learning options to suit your needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Practical Focus</p>
                    <p className="text-sm text-gray-600">Real-world scenarios and industry-specific case studies</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hampton-image-hero">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <GraduationCap className="w-16 h-16 text-hampton-blue/50 mx-auto mb-4" />
                  <p className="text-hampton-blue/70 font-medium">Professional Training Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Courses */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Comprehensive Training Portfolio
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              From management programmes to front-line awareness training, we cover all levels of your organisation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hampton-card-hover">
              <CardHeader>
                <Users className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">IOSH Managing Safely</CardTitle>
                <CardDescription>For managers and supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>4 days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Internationally recognised qualification covering legal responsibilities, risk management, and safety leadership.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Health and safety management systems</li>
                    <li>• Risk assessment and control</li>
                    <li>• Measuring performance</li>
                    <li>• Safety leadership skills</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">IOSH Working Safely</CardTitle>
                <CardDescription>For front-line employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>1 day</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Essential health and safety awareness for all employees, covering workplace hazards and safety responsibilities.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Workplace hazard identification</li>
                    <li>• Risk control measures</li>
                    <li>• Incident reporting</li>
                    <li>• Personal responsibility</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Shield className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">NEBOSH General Certificate</CardTitle>
                <CardDescription>Foundation-level qualification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>10 days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Comprehensive introduction to health and safety management for those with safety responsibilities.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Legal framework and duties</li>
                    <li>• Risk assessment principles</li>
                    <li>• Workplace hazards</li>
                    <li>• Control measures and monitoring</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Users className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">First Aid Training</CardTitle>
                <CardDescription>Emergency response skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>1-3 days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    HSE-approved first aid courses from basic awareness to full first aid at work certification.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Emergency action procedures</li>
                    <li>• CPR and AED use</li>
                    <li>• Injury and illness management</li>
                    <li>• Record keeping requirements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Fire Safety Training</CardTitle>
                <CardDescription>Fire prevention and response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Half day</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Comprehensive fire safety awareness including prevention, evacuation procedures, and fire warden training.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Fire triangle and prevention</li>
                    <li>• Evacuation procedures</li>
                    <li>• Extinguisher types and use</li>
                    <li>• Fire warden responsibilities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <Shield className="w-8 h-8 text-hampton-blue mb-2" />
                <CardTitle className="text-hampton-blue">Manual Handling</CardTitle>
                <CardDescription>Safe lifting and moving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Half day</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Practical training on safe manual handling techniques to prevent musculoskeletal disorders.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Risk assessment principles</li>
                    <li>• Safe lifting techniques</li>
                    <li>• Mechanical aids and equipment</li>
                    <li>• Back care and injury prevention</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Why Choose Our Training?
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Practical, engaging training that delivers real improvements in safety knowledge and behaviour.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-hampton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Trainers</h3>
              <p className="text-sm text-gray-600">Experienced professionals with real-world industry knowledge</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-light rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-hampton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tailored Content</h3>
              <p className="text-sm text-gray-600">Customised to your industry, risks, and organisational needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-light rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-hampton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Accredited Courses</h3>
              <p className="text-sm text-gray-600">Recognised qualifications that add value to your team</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-hampton-blue" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Delivery</h3>
              <p className="text-sm text-gray-600">On-site, virtual, or blended learning to suit your schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Flexible Training Delivery
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Choose the delivery method that works best for your organisation and schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hampton-card-premium text-center">
              <CardHeader>
                <Users className="w-10 h-10 text-hampton-blue mx-auto mb-4" />
                <CardTitle className="text-hampton-blue">On-Site Training</CardTitle>
                <CardDescription>Training delivered at your premises</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>• Convenient for your team</li>
                  <li>• Workplace-specific examples</li>
                  <li>• Cost-effective for groups</li>
                  <li>• No travel time or costs</li>
                  <li>• Familiar learning environment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-premium text-center">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-hampton-blue mx-auto mb-4" />
                <CardTitle className="text-hampton-blue">Virtual Training</CardTitle>
                <CardDescription>Interactive online learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>• Flexible scheduling options</li>
                  <li>• Reduced travel requirements</li>
                  <li>• Interactive digital tools</li>
                  <li>• Recorded sessions available</li>
                  <li>• Global accessibility</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-premium text-center">
              <CardHeader>
                <GraduationCap className="w-10 h-10 text-hampton-blue mx-auto mb-4" />
                <CardTitle className="text-hampton-blue">Blended Learning</CardTitle>
                <CardDescription>Combination of online and face-to-face</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 text-left">
                  <li>• Best of both worlds</li>
                  <li>• Self-paced theory elements</li>
                  <li>• Practical hands-on sessions</li>
                  <li>• Optimised learning outcomes</li>
                  <li>• Flexible progression</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Training Excellence
            </h2>
            <p className="hampton-body text-gray-600">
              Delivering measurable improvements in safety knowledge and competence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="hampton-metric text-center">
              <div className="hampton-metric-number">2,500+</div>
              <p className="text-gray-700 font-medium">Delegates trained annually</p>
            </div>
            <div className="hampton-metric text-center">
              <div className="hampton-metric-number">98%</div>
              <p className="text-gray-700 font-medium">Course satisfaction rating</p>
            </div>
            <div className="hampton-metric text-center">
              <div className="hampton-metric-number">95%</div>
              <p className="text-gray-700 font-medium">First-time pass rate</p>
            </div>
            <div className="hampton-metric text-center">
              <div className="hampton-metric-number">50+</div>
              <p className="text-gray-700 font-medium">Different course offerings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hampton-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg text-white mb-4">
            Invest in Your Team&apos;s Safety Knowledge
          </h2>
          <p className="hampton-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Build competence, ensure compliance, and create a positive safety culture with our expert training programmes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-hampton-blue hover:bg-gray-100">
              <Link href="/contact">Request Training Proposal</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hampton-blue">
              <Link href="/services/consultancy">Explore Consultancy Services</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}