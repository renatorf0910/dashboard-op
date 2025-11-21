import React from 'react';
import { Metadata } from 'next';
import { ClientProviders } from './clientProviders';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

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
      { url: '/images/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body className="min-h-screen">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
};