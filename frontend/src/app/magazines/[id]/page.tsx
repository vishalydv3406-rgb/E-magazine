/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { BookOpen, Clock, ArrowLeft, ArrowRight, Star } from 'lucide-react';

export default function MagazineDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [magazine, setMagazine] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`/magazines/${id}`),
      axios.get(`/articles?magazineId=${id}&limit=50`)
    ])
      .then(([magRes, artRes]) => {
        setMagazine(magRes.data);
        setArticles(artRes.data.articles || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/3 aspect-[3/4] bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          <div className="flex-1 space-y-4 pt-4">
            <div className="h-4 w-20 bg-blue-200 dark:bg-blue-900 rounded-full" />
            <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-900 rounded" />
            <div className="h-4 w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!magazine) return (
    <div className="text-center py-20">
      <p className="text-xl font-bold mb-4">Magazine not found</p>
      <Link href="/magazines" className="text-blue-500 hover:underline">Browse all magazines →</Link>
    </div>
  );

  const totalReadingTime = articles.reduce((sum, a) => sum + (a.readingTime || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      {/* Magazine Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 mb-16 items-start"
      >
        {/* Cover */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-500/20 border border-zinc-200 dark:border-zinc-800">
            <img
              src={magazine.coverImage}
              alt={magazine.title}
              className="w-full aspect-[3/4] object-cover"
              onError={(e: any) => {
                e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold text-white bg-blue-500 px-2.5 py-1 rounded-full">{magazine.category}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            {magazine.title}
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
            {magazine.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Articles', value: articles.length, icon: BookOpen },
              { label: 'Min. Read', value: totalReadingTime, icon: Clock },
              { label: 'Rating', value: '5.0', icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-center">
                <Icon size={16} className="text-blue-500 mx-auto mb-1" />
                <div className="text-xl font-black">{value}</div>
                <div className="text-xs text-zinc-500 font-medium">{label}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-medium">
            Published {new Date(magazine.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </motion.div>

      {/* Articles List */}
      <section>
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          <BookOpen className="text-blue-500" size={22} />
          In This Issue
        </h2>

        {articles.length === 0 ? (
          <div className="p-10 text-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <BookOpen size={36} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
            <p className="text-zinc-500 text-sm">No articles published yet in this magazine.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {articles.map((article: any, index: number) => (
              <Link href={`/articles/${article._id}`} key={article._id}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.06, 0.5) }}
                  whileHover={{ x: 4 }}
                  className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group flex items-center gap-4"
                >
                  <div className="text-2xl font-black text-zinc-200 dark:text-zinc-800 min-w-[2.5rem] text-center">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold mb-1 group-hover:text-blue-500 transition-colors line-clamp-1">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {article.readingTime} min
                      </span>
                      {article.isPremium && (
                        <span className="text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">
                          ★ Premium
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-zinc-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
