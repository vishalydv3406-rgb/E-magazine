'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { useState } from 'react';
import { BookMarked, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

const categories = [
  { label: 'Technology', href: '/magazines?category=Technology', emoji: '💻' },
  { label: 'AI', href: '/magazines?category=AI', emoji: '🤖' },
  { label: 'Business', href: '/magazines?category=Business', emoji: '📈' },
  { label: 'Health & Fitness', href: '/magazines?category=Health%20%26%20Fitness', emoji: '🏃' },
  { label: 'Education', href: '/magazines?category=Education', emoji: '🎓' },
  { label: 'History', href: '/magazines?category=History', emoji: '🏛️' },
  { label: 'Psychology', href: '/magazines?category=Personality%20Disorders', emoji: '🧠' },
  { label: 'Travel', href: '/magazines?category=Travel', emoji: '✈️' },
  { label: 'Love', href: '/magazines?category=Love', emoji: '💖' },
  { label: 'Relationships', href: '/magazines?category=Relationships', emoji: '🤝' },
  { label: 'Emotions', href: '/magazines?category=Emotions', emoji: '🌊' },
];

export default function Navbar() {
  const { user, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo + Categories Dropdown */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <Sparkles size={20} className="text-blue-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">E-Mag</span>
          </Link>

          {/* Categories dropdown — desktop */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Browse <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 grid grid-cols-2 gap-0.5">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
                  >
                    <span>{cat.emoji}</span> {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Direct links — top 4 */}
          <nav className="hidden lg:flex gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/magazines?category=Technology" className="px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">Tech</Link>
            <Link href="/magazines?category=AI" className="px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-blue-500 transition-colors">AI</Link>
            <Link href="/magazines?category=Business" className="px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors">Business</Link>
            <Link href="/magazines?category=Love" className="px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-pink-500 transition-colors">Love</Link>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/saved"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <BookMarked size={16} className="text-blue-500" /> Saved
              </Link>
              <div className="hidden sm:flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-700 pl-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden md:block">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
              >
                <span>{cat.emoji}</span> {cat.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/saved" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <BookMarked size={16} className="text-blue-500" /> My Saved Articles
                </Link>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium">👋 {user.name}</span>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-red-400 hover:text-red-500 font-medium">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full text-center py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
