import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPersistedStore } from '~/store/getPersistedStore';

type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthStore = {
  user: User | null;
  actions: {
    login: (user: User) => void;
    logout: () => void;
  };
};

export const useStoreAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      actions: {
        login: (user: User) => set({ user }),
        logout: () => set({ user: null }),
      },
    }),
    getPersistedStore({ key: 'auth', partialize: (state) => ({ user: state.user }) })
  )
);
