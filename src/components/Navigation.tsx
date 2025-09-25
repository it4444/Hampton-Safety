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
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/Logo_black_text.fw.png"
              alt="Hampton Safety Ltd"
              width={250}
              height={63}
              className="h-16 w-auto"
            />
          </Link>

          {/* Right side - Navigation and CTA */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="px-4 py-2 text-base font-medium text-gray-900 hover:text-hampton-blue">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-base font-medium">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-96 p-6">
                    <div className="grid gap-3">
                      <Link href="/services/consultancy" className="block p-4 hover:bg-gray-50 rounded-lg">
                        <div className="font-semibold text-lg text-hampton-blue">Health & Safety Consultancy</div>
                        <div className="text-base text-gray-600 mt-1">Retained consultant services & compliance</div>
                      </Link>
                      <Link href="/services/risk-assessments" className="block p-4 hover:bg-gray-50 rounded-lg">
                        <div className="font-semibold text-lg text-hampton-blue">Risk Assessments & Audits</div>
                        <div className="text-base text-gray-600 mt-1">Comprehensive workplace risk evaluation</div>
                      </Link>
                      <Link href="/services/iso-certification" className="block p-4 hover:bg-gray-50 rounded-lg">
                        <div className="font-semibold text-lg text-hampton-blue">Management Systems</div>
                        <div className="text-base text-gray-600 mt-1">ISO-aligned management system support</div>
                      </Link>
                      <Link href="/services/training" className="block p-4 hover:bg-gray-50 rounded-lg">
                        <div className="font-semibold text-lg text-hampton-blue">Safety Training</div>
                        <div className="text-base text-gray-600 mt-1">IOSH-accredited courses & face-fit testing</div>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className="px-4 py-2 text-base font-medium text-gray-900 hover:text-hampton-blue">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="px-4 py-2 text-base font-medium text-gray-900 hover:text-hampton-blue">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

            {/* CTA Button */}
            <Button asChild size="sm" className="text-base px-4 py-2">
              <Link href="/contact">Get Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
