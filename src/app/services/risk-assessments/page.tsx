import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Shield, FileText } from 'lucide-react'

export default function RiskAssessmentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 hampton-gradient-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-hampton-blue/20 mb-6">
              <Shield className="w-4 h-4 text-hampton-blue mr-2" />
              <span className="text-sm font-medium text-hampton-blue">Professional Risk Management</span>
            </div>
            <h1 className="hampton-heading-xl text-gray-900 mb-6">
              Comprehensive Risk Assessments
            </h1>
            <p className="hampton-body-lg text-gray-600 mb-8">
              Expert risk assessment services that identify workplace hazards, ensure legal compliance, and protect your workforce.
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
                Statutory Compliance Made Simple
              </h2>
              <p className="hampton-body text-gray-600 mb-6">
                Our systematic approach to risk assessment ensures your organisation meets all health and safety requirements while creating a safer workplace for your teams.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">HSE-Compliant Methodology</p>
                    <p className="text-sm text-gray-600">Following best practice guidelines and legal requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Industry-Specific Expertise</p>
                    <p className="text-sm text-gray-600">Tailored assessments for your sector and operational needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-hampton-blue mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Actionable Recommendations</p>
                    <p className="text-sm text-gray-600">Clear, prioritised action plans with implementation support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video w-full min-h-[250px] md:min-h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/services/risk-assessments-hero.png"
                alt="Professional consultant reviewing risk assessment documentation with laptop and organized binders"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Risk Assessment Types */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Comprehensive Risk Assessment Services
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              Covering all aspects of workplace safety with detailed documentation and expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">General Workplace</CardTitle>
                <CardDescription>Comprehensive workplace risk identification, including</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Comprehensive workplace/document assessments</li>
                  <li>• Manual handling assessments</li>
                  <li>• Workstation evaluations</li>
                  <li>• Environmental factors</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">Fire Safety</CardTitle>
                <CardDescription>Fire risk assessments and prevention</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Fire hazard identification</li>
                  <li>• Evacuation procedures</li>
                  <li>• Fire safety equipment</li>
                  <li>• Emergency planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">COSHH Assessments</CardTitle>
                <CardDescription>Hazardous substance safety</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Hazardous substance identification</li>
                  <li>• Exposure control measures</li>
                  <li>• PPE requirements</li>
                  <li>• Health surveillance needs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">Common Workplace Hazards</CardTitle>
                <CardDescription>Manual handling and working at height</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Manual handling assessments</li>
                  <li>• Working at height evaluation</li>
                  <li>• Control measures</li>
                  <li>• Safety equipment requirements</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">Construction Sites</CardTitle>
                <CardDescription>Specialist construction safety</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Regular site inspections</li>
                  <li>• Working at height risks</li>
                  <li>• Plant and machinery safety</li>
                  <li>• Site-specific hazards</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hampton-card-hover">
              <CardHeader>
                <CardTitle className="text-hampton-blue">Stress & Wellbeing</CardTitle>
                <CardDescription>Psychological risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Work-related stress factors</li>
                  <li>• Mental health considerations</li>
                  <li>• Workload assessments</li>
                  <li>• Support system evaluation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="hampton-heading-lg text-gray-900 mb-4">
              Our Risk Assessment Process
            </h2>
            <p className="hampton-body text-gray-600 max-w-2xl mx-auto">
              A structured, professional approach ensuring thorough analysis and practical solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Site Survey</h3>
              <p className="text-sm text-gray-600">Comprehensive workplace inspection and hazard identification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk Analysis</h3>
              <p className="text-sm text-gray-600">Evaluation of likelihood and severity of identified risks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-sm text-gray-600">Detailed reports with clear findings and recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-hampton-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Implementation</h3>
              <p className="text-sm text-gray-600">Ongoing support and review to ensure effective risk control</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hampton-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="hampton-heading-lg text-white mb-4">
            Ensure Legal Compliance Today
          </h2>
          <p className="hampton-body-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Protect your business and workforce with professional risk assessments that meet HSE standards and industry best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-hampton-blue hover:bg-gray-100">
              <Link href="/contact">Request Risk Assessment Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white/10">
              <Link href="/services/consultancy">Explore Consultancy Services</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}