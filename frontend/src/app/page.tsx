/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { ArrowRight, Zap, BookOpen, TrendingUp, Users } from 'lucide-react';

const categories = [
  { label: 'Technology', href: '/magazines?category=Technology', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
  { label: 'AI', href: '/magazines?category=AI', emoji: '🤖', color: 'from-violet-500 to-purple-600' },
  { label: 'Business', href: '/magazines?category=Business', emoji: '📈', color: 'from-emerald-500 to-teal-600' },
  { label: 'Health & Fitness', href: '/magazines?category=Health%20%26%20Fitness', emoji: '🏃', color: 'from-rose-500 to-pink-600' },
  { label: 'Travel', href: '/magazines?category=Travel', emoji: '✈️', color: 'from-amber-500 to-orange-600' },
  { label: 'History', href: '/magazines?category=History', emoji: '🏛️', color: 'from-stone-500 to-zinc-600' },
  { label: 'Education', href: '/magazines?category=Education', emoji: '🎓', color: 'from-sky-500 to-blue-600' },
  { label: 'Love', href: '/magazines?category=Love', emoji: '💖', color: 'from-pink-500 to-rose-600' },
  { label: 'Psychology', href: '/magazines?category=Personality%20Disorders', emoji: '🧠', color: 'from-indigo-500 to-violet-600' },
  { label: 'Relationships', href: '/magazines?category=Relationships', emoji: '🤝', color: 'from-teal-500 to-emerald-600' },
  { label: 'Emotions', href: '/magazines?category=Emotions', emoji: '🌊', color: 'from-blue-400 to-indigo-500' },
];

const stats = [
  { icon: BookOpen, label: 'Articles', value: '275+' },
  { icon: TrendingUp, label: 'Magazines', value: '55+' },
  { icon: Users, label: 'Categories', value: '11' },
  { icon: Zap, label: 'Topics', value: 'Unlimited' },
];

export default function Home() {
  const [magazines, setMagazines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/magazines')
      .then((res: any) => setMagazines(res.data.slice(0, 6)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-36 px-4">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium mb-8">
              <Zap size={14} /> 275+ Premium Articles Available
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Discover
              </span>
              <br />
              <span className="text-zinc-900 dark:text-white">The Future of</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                Reading
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Deep-dive encyclopedia articles across Technology, Business, Health, AI, and more.
              Read, engage, and elevate your mind with premium content.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/magazines"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25"
              >
                Start Reading <ArrowRight size={18} />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 font-bold text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Join Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
              <Icon size={20} className="text-blue-500 mb-2" />
              <span className="text-2xl font-black text-zinc-900 dark:text-white">{value}</span>
              <span className="text-sm text-zinc-500">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Browse by Category</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Explore 11 curated knowledge domains</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={cat.href}>
                <div className="group p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md`}>
                    {cat.emoji}
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{cat.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: categories.length * 0.04 }}
          >
            <Link href="/magazines">
              <div className="group p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-center cursor-pointer h-full flex flex-col items-center justify-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  🔍
                </div>
                <span className="text-sm font-semibold text-zinc-500 group-hover:text-blue-500 transition-colors">All Magazines</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Magazines */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Trending Now</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Latest issues across all categories</p>
          </div>
          <Link href="/magazines" className="hidden sm:flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 animate-pulse">
                <div className="h-52 bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-blue-200 dark:bg-blue-900 rounded" />
                  <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
                  <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))
          ) : (
            magazines.map((mag: any, i) => (
              <Link href={`/magazines/${mag._id}`} key={mag._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 cursor-pointer h-full flex flex-col transition-shadow group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={mag.coverImage}
                      alt={mag.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-blue-500 px-2.5 py-1 rounded-full">
                      {mag.category}
                    </span>
                  </div>
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-500 transition-colors line-clamp-2">{mag.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{mag.description}</p>
                  </div>
                  <div className="px-5 pb-4 flex items-center gap-2 text-xs text-blue-500 font-semibold">
                    Read Articles <ArrowRight size={12} />
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link href="/magazines" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            View All Magazines <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
