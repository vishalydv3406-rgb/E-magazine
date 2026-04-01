'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { Bookmark, Clock, ArrowRight, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    axios.get('/articles/saved')
      .then((res: any) => setSavedArticles(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  const filtered = search.trim()
    ? savedArticles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    : savedArticles;

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-10 w-56 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Bookmark className="text-blue-500" size={20} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Saved Articles</h1>
            <p className="text-sm text-zinc-500">{savedArticles.length} article{savedArticles.length !== 1 ? 's' : ''} bookmarked</p>
          </div>
        </div>

        {savedArticles.length > 3 && (
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search saved..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
        )}
      </div>

      {savedArticles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800"
        >
          <Bookmark size={52} className="mx-auto text-zinc-200 dark:text-zinc-700 mb-4" />
          <h2 className="text-2xl font-black text-zinc-600 dark:text-zinc-400 mb-2">Nothing saved yet</h2>
          <p className="text-zinc-400 text-sm mb-8">Browse magazines and bookmark articles to read later.</p>
          <Link href="/magazines" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
            Start Exploring <ArrowRight size={16} />
          </Link>
        </motion.div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-sm">No articles match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article: any, i: number) => (
            <Link href={`/articles/${article._id}`} key={article._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all h-full flex flex-col group cursor-pointer"
              >
                <div className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                  {article.magazineId?.category || 'Article'}
                </div>
                <h3 className="text-base font-bold mb-auto group-hover:text-blue-500 transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <div className="mt-4 pt-4 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readingTime} min
                  </span>
                  <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
