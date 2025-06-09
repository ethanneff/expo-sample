import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPersistedStore } from '~/store/getPersistedStore';

type AuthStore = {
  actions: {
    login: (user: User) => void;
    logout: () => void;
  };
  user: null | User;
};

type User = {
  email: string;
  id: string;
  name: string;
  token: string;
};

export const useStoreAuth = create<AuthStore>()(
  persist(
    (set) => ({
      actions: {
        login: (user: User) => {
          set({ user });
        },
        logout: () => {
          set({ user: null });
        },
      },
      user: null,
    }),
    getPersistedStore({ key: 'auth', partialize: (state) => ({ user: state.user }) })
  )
);
