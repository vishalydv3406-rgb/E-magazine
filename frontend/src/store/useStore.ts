import { create } from 'zustand';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  bookmarks?: any[];
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
    set({ user });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    set({ user: null });
  },
  hydrate: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          set({ user: JSON.parse(stored) });
        } catch {
          localStorage.removeItem('user');
        }
      }
    }
  },
}));
