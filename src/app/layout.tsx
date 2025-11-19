import React from 'react';
import { Metadata } from 'next';
import { ClientProviders } from './clientProviders';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s',
  },
  description: '',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
};