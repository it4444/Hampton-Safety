import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
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
              <span className="text-sm">+44 20 7946 0958</span>
            </div>
            <div className="flex items-center mb-2">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm">info@hamptonsafety.co.uk</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">London & UK-wide service</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/services/consultancy" className="hover:text-white">Health & Safety Consultancy</Link></li>
              <li><Link href="/services/risk-assessments" className="hover:text-white">Risk Assessments</Link></li>
              <li><Link href="/services/iso-certification" className="hover:text-white">Management Systems</Link></li>
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
            <Button variant="outline" className="text-white border-white bg-transparent hover:bg-white/10" asChild>
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Hampton Safety Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}