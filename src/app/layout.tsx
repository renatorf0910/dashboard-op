import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import React from 'react';
import { ClientProviders } from './clientProviders';
import './globals.css';
import DetectIOSWrapper from './DetectIOSWrapper';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s',
  },
  icons: {
    icon: [
      { url: '/images/favicon1.png', sizes: '32x32', type: 'image/png' },
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body className="min-h-screen">
        <ClientProviders>
            <Toaster richColors />
            <DetectIOSWrapper />
            {children}
        </ClientProviders>
      </body>
    </html>
  )
};