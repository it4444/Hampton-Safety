import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

// Modern, professional sans-serif for UI and body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Elegant serif for headings and emphasis
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hampton Safety Ltd - Professional Health & Safety Consultancy",
  description: "Expert health and safety consultancy for medium to enterprise businesses. Specialising in risk assessments, management systems implementation, and compliance training.",
  keywords: "health safety consultancy, risk assessment, management systems, ISO implementation, safety training, workplace safety, compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
