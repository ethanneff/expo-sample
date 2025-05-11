import { Appearance } from 'react-native';
import { create } from 'zustand';

type ThemeStore = {
  theme: 'light' | 'dark';
  actions: {
    toggleTheme: () => void;
  };
};

export const useStoreTheme = create<ThemeStore>((set) => ({
  theme: Appearance.getColorScheme() ?? 'light',
  actions: {
    toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  },
}));
