import type { Metadata } from 'next'
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rayol.ai'),
  title: 'RAYOL AI — Operational Governance by Design™',
  description: 'Responsible AI advisory, assurance and governance for regulated enterprise and mid-market teams.',
  icons: {
    icon: '/rayolpng.png',
    apple: '/rayolpng.png',
  },
  openGraph: {
    title: 'RAYOL AI — Operational Governance by Design™',
    description: 'Operational Governance by Design™ — Embedding human judgment, mathematical guardrails, and cryptographically verified audit trails into enterprise AI systems.',
    images: [{ url: '/rayolpng.png', width: 800, height: 800, alt: 'Rayol AI' }],
    siteName: 'Rayol AI Solutions',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="bg-[#fafafa] text-[#09090b] antialiased selection:bg-black selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
