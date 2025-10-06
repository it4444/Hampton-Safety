'use client'

import { useState } from 'react'
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
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logos/Logo_black_text.fw.png"
              alt="Hampton Safety Ltd"
              width={180}
              height={45}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
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

            {/* Desktop CTA Button */}
            <Button asChild size="sm" className="text-base px-4 py-2 bg-hampton-blue text-white hover:bg-hampton-blue/90">
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-900 hover:text-hampton-blue"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/services/consultancy"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-hampton-blue hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Health & Safety Consultancy
                    </Link>
                    <Link
                      href="/services/risk-assessments"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-hampton-blue hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Risk Assessments & Audits
                    </Link>
                    <Link
                      href="/services/iso-certification"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-hampton-blue hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Management Systems
                    </Link>
                    <Link
                      href="/services/training"
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-hampton-blue hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Safety Training
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile CTA Button */}
              <div className="pt-4">
                <Button asChild size="lg" className="w-full bg-hampton-blue text-white hover:bg-hampton-blue/90">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Request a Consultation
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
