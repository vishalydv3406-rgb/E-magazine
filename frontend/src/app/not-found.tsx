'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, BookOpen, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4 leading-none">
          404
        </div>
        <h1 className="text-2xl font-black mb-3">Page not found</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            href="/magazines"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <BookOpen size={16} /> Browse Magazines <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
