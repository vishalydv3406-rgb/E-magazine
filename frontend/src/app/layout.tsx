import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import StoreHydration from '@/components/ui/StoreHydration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Magazine Platform — Discover the Future of Reading',
  description: 'Premium modern e-magazine platform with 275+ deep-dive articles across Technology, AI, Business, Health, Travel, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col`}>
        <StoreHydration />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} E-Magazine Platform. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
