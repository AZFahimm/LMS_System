import { create } from 'zustand';
import { User } from '../types';

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  isGuardian: () => boolean;
  initMockUser: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user, error: null }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  logout: () => {
    localStorage.removeItem('mockUser');
    set({ user: null, error: null });
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'super_admin' || user?.role === 'admin';
  },

  isTeacher: () => {
    const { user } = get();
    return user?.role === 'teacher';
  },

  isStudent: () => {
    const { user } = get();
    return user?.role === 'student';
  },

  isGuardian: () => {
    const { user } = get();
    return user?.role === 'guardian';
  },

  isSuperAdmin: () => {
    const { user } = get();
    return user?.role === 'super_admin';
  },

  initMockUser: () => {
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      try {
        const user = JSON.parse(mockUser);
        set({ user });
      } catch (e) {
        console.error('Failed to parse mock user:', e);
      }
    }
  },
}))
