import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Allyti - IIT/IIM Professional Network',
    template: '%s | Allyti'
  },
  description: 'Connect with fellow IIT/IIM alumni in a secure professional network with anonymous community features.',
  keywords: ['IIT', 'IIM', 'alumni', 'networking', 'professional', 'community'],
  authors: [{ name: 'Allyti Team' }],
  creator: 'Allyti',
  publisher: 'Allyti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Allyti - IIT/IIM Professional Network',
    description: 'Connect with fellow IIT/IIM alumni in a secure professional network with anonymous community features.',
    url: 'https://allyti.com',
    siteName: 'Allyti',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Allyti - IIT/IIM Professional Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allyti - IIT/IIM Professional Network',
    description: 'Connect with fellow IIT/IIM alumni in a secure professional network with anonymous community features.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <Providers>
          <div className="min-h-full">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
