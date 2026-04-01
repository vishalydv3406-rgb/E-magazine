/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen } from 'lucide-react';

const categoryEmojis: Record<string, string> = {
  Technology: '💻', AI: '🤖', Business: '📈',
  'Health & Fitness': '🏃', Travel: '✈️', History: '🏛️',
  Education: '🎓', Love: '💖', 'Personality Disorders': '🧠',
  Relationships: '🤝', Emotions: '🌊',
};

function MagazinesContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [magazines, setMagazines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('/magazines', { params: { category: category || undefined } })
      .then((res: any) => setMagazines(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = search.trim()
    ? magazines.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
      )
    : magazines;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          {category && (
            <span className="text-3xl">{categoryEmojis[category] || '📚'}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            {category ? `${category}` : 'All Magazines'}
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          {loading ? 'Loading...' : `${filtered.length} magazine${filtered.length !== 1 ? 's' : ''} available`}
        </p>
      </div>

      {/* Search Bar */}
      {!loading && magazines.length > 3 && (
        <div className="relative mb-8 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search magazines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-72 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <BookOpen size={48} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
          <h2 className="text-xl font-bold text-zinc-600 dark:text-zinc-400 mb-2">No magazines found</h2>
          <p className="text-zinc-400 text-sm">Try a different search or browse all categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((mag: any, i) => (
            <Link href={`/magazines/${mag._id}`} key={mag._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 cursor-pointer h-full flex flex-col transition-all group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={mag.coverImage}
                    alt={mag.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-blue-500 px-2.5 py-1 rounded-full">
                    {mag.category}
                  </span>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-base font-bold mb-1 group-hover:text-blue-500 transition-colors line-clamp-2">{mag.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{mag.description}</p>
                </div>
                <div className="px-4 pb-3 flex items-center gap-1 text-xs text-blue-500 font-semibold">
                  Read Articles <ArrowRight size={12} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MagazinesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-10 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-72 rounded-2xl" />
          ))}
        </div>
      </div>
    }>
      <MagazinesContent />
    </Suspense>
  );
}
