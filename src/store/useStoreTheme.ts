import { Appearance } from 'react-native';
import { create } from 'zustand';

type ThemeStore = {
  actions: {
    toggleTheme: () => void;
  };
  theme: 'dark' | 'light';
};

export const useStoreTheme = create<ThemeStore>((set) => ({
  actions: {
    toggleTheme: () => {
      set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
    },
  },
  theme: Appearance.getColorScheme() ?? 'light',
}));
