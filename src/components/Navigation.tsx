'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Phone, Mail } from 'lucide-react'

export default function Navigation() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/Logo_black_text.fw.png"
              alt="Hampton Safety Ltd"
              width={200}
              height={50}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-80 p-4">
                    <div className="grid gap-2">
                      <Link href="/services/consultancy" className="block p-2 hover:bg-gray-50 rounded">
                        <div className="font-medium text-blue-600">Health & Safety Consultancy</div>
                        <div className="text-sm text-gray-600">Retained consultant services & compliance</div>
                      </Link>
                      <Link href="/services/risk-assessments" className="block p-2 hover:bg-gray-50 rounded">
                        <div className="font-medium text-blue-600">Risk Assessments & Audits</div>
                        <div className="text-sm text-gray-600">Comprehensive workplace risk evaluation</div>
                      </Link>
                      <Link href="/services/iso-certification" className="block p-2 hover:bg-gray-50 rounded">
                        <div className="font-medium text-blue-600">ISO 45001 Certification</div>
                        <div className="text-sm text-gray-600">Achieve industry-standard certifications</div>
                      </Link>
                      <Link href="/services/training" className="block p-2 hover:bg-gray-50 rounded">
                        <div className="font-medium text-blue-600">Safety Training</div>
                        <div className="text-sm text-gray-600">IOSH-accredited courses & face-fit testing</div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>Call for consultation</span>
            </div>
            <Button asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}