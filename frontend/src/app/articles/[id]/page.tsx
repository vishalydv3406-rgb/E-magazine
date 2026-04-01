'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Bookmark, Heart, MessageCircle, Share2, Send, ArrowLeft, Clock, Eye } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Link from 'next/link';

export default function ArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, setUser } = useStore();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [shareText, setShareText] = useState('Share');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    Promise.all([
      axios.get(`/articles/${id}`),
      axios.get(`/comments/article/${id}`).catch(() => ({ data: [] }))
    ])
      .then(([articleRes, commentsRes]) => {
        setArticle(articleRes.data);
        setComments(commentsRes.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user?.bookmarks) {
      setIsSaved(user.bookmarks.some((b: any) => b === id || b._id === id));
    }
  }, [user, id]);

  const handleLike = async () => {
    if (!user) return router.push('/login');
    try {
      const res = await axios.post(`/articles/${id}/like`);
      setArticle({ ...article, likes: Array.from({ length: res.data.likes }).fill('id') });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!user) return router.push('/login');
    try {
      const res = await axios.post(`/articles/${id}/bookmark`);
      setIsSaved(res.data.isBookmarked);
      setUser({ ...user, bookmarks: res.data.bookmarks });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText('Copied!');
    setTimeout(() => setShareText('Share'), 2000);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/login');
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/comments', { content: newComment, articleId: id });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
        <div className="h-8 w-20 bg-blue-200 dark:bg-blue-900 rounded-full mb-6" />
        <div className="h-12 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
        <div className="h-12 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-zinc-100 dark:bg-zinc-900 rounded" />)}
        </div>
      </div>
    );
  }

  if (!article) return (
    <div className="text-center py-20">
      <p className="text-xl font-bold text-zinc-600 dark:text-zinc-400 mb-4">Article not found</p>
      <Link href="/" className="text-blue-500 hover:underline">Go home →</Link>
    </div>
  );

  const isLiked = user && article?.likes?.some?.((l: any) => l === user._id || l === 'id') || false;

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50" style={{ scaleX }} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Article Header */}
        <header className="mb-10">
          <span className="inline-block text-blue-500 font-bold uppercase tracking-wider text-xs mb-4 bg-blue-500/10 px-3 py-1 rounded-full">
            {article.magazineId?.category || 'Article'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {article.authorId?.name?.charAt(0) || 'A'}
              </div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{article.authorId?.name || 'Admin'}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {article.readingTime} min read</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1"><Eye size={13} /> {article.views?.toLocaleString()} views</span>
            {article.magazineId && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <Link href={`/magazines/${article.magazineId._id}`} className="text-blue-500 hover:underline font-medium">
                  {article.magazineId.title}
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-12 py-3 px-4 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-600 dark:text-zinc-400">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm font-medium transition-colors group px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
          >
            <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            <span>{article.likes?.length || 0}</span>
          </button>
          <a href="#comments" className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition-colors px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800">
            <MessageCircle size={18} /> <span>{comments.length}</span>
          </a>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-sm font-medium transition-colors px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800 ${isSaved ? 'text-green-500' : 'hover:text-green-500'}`}
          >
            <Bookmark size={18} className={isSaved ? 'fill-current' : ''} />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 text-sm font-medium hover:text-purple-500 transition-colors px-3 py-1.5 rounded-xl hover:bg-white dark:hover:bg-zinc-800">
            <Share2 size={18} /> <span className="hidden sm:inline">{shareText}</span>
          </button>
        </div>

        {/* Article Content */}
        <article className="article-content mb-16 text-zinc-800 dark:text-zinc-200" dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Comments Section */}
        <section id="comments" className="pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
            <MessageCircle size={22} className="text-blue-500" />
            Discussion <span className="text-zinc-400 font-normal text-lg">({comments.length})</span>
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-10">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm mt-1">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 pr-14 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px] transition-all text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute bottom-3 right-3 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={!newComment.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl text-center">
              <MessageCircle size={28} className="mx-auto text-blue-400 mb-3" />
              <p className="text-zinc-700 dark:text-zinc-300 font-medium mb-4">Sign in to join the discussion</p>
              <button onClick={() => router.push('/login')} className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                Sign In
              </button>
            </div>
          )}

          <div className="space-y-4">
            {comments.map((comment: any, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={comment._id}
                className="flex gap-3 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {comment.userId?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm">{comment.userId?.name || 'User'}</span>
                    <span className="text-xs text-zinc-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{comment.content}</p>
                </div>
              </motion.div>
            ))}

            {comments.length === 0 && (
              <div className="text-center py-10 text-zinc-400">
                <MessageCircle size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm italic">No comments yet. Be the first!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
