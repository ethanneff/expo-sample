import { useStoreTheme } from '../store/useStoreTheme';

type Theme = 'light' | 'dark';

export type ColorName =
  | 'background'
  | 'foreground'
  | 'card'
  | 'cardForeground'
  | 'popover'
  | 'popoverForeground'
  | 'primary'
  | 'primaryForeground'
  | 'secondary'
  | 'secondaryForeground'
  | 'muted'
  | 'mutedForeground'
  | 'accent'
  | 'accentForeground'
  | 'destructive'
  | 'border'
  | 'input'
  | 'ring'
  | 'chart1'
  | 'chart2'
  | 'chart3'
  | 'chart4'
  | 'chart5'
  | 'sidebar'
  | 'sidebarForeground'
  | 'sidebarPrimary'
  | 'sidebarPrimaryForeground'
  | 'sidebarAccent'
  | 'sidebarAccentForeground'
  | 'sidebarBorder'
  | 'sidebarRing'
  | 'transparent';

const colors: Record<Theme, Record<ColorName, string>> = {
  light: {
    background: 'hsl(0 0% 95%)',
    foreground: 'hsl(240 5.9% 10%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(240 5.9% 10%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(240 5.9% 10%)',
    primary: 'hsl(240 5.9% 10%)',
    primaryForeground: 'hsl(0 0% 98%)',
    secondary: 'hsl(240 4.8% 95.9%)',
    secondaryForeground: 'hsl(240 5.9% 10%)',
    muted: 'hsl(240 4.8% 95.9%)',
    mutedForeground: 'hsl(240 3.8% 46.1%)',
    accent: 'hsl(240 4.8% 95.9%)',
    accentForeground: 'hsl(240 5.9% 10%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    border: 'hsl(240 5.9% 90%)',
    input: 'hsl(240 5.9% 90%)',
    ring: 'hsl(240 5.9% 10%)',
    chart1: 'hsl(41 100% 50%)',
    chart2: 'hsl(184 100% 50%)',
    chart3: 'hsl(227 100% 50%)',
    chart4: 'hsl(84 100% 50%)',
    chart5: 'hsl(70 100% 50%)',
    sidebar: 'hsl(0 0% 98%)',
    sidebarForeground: 'hsl(240 5.9% 10%)',
    sidebarPrimary: 'hsl(240 5.9% 10%)',
    sidebarPrimaryForeground: 'hsl(0 0% 98%)',
    sidebarAccent: 'hsl(240 4.8% 95.9%)',
    sidebarAccentForeground: 'hsl(240 5.9% 10%)',
    sidebarBorder: 'hsl(240 5.9% 90%)',
    sidebarRing: 'hsl(240 5.9% 10%)',
    transparent: 'transparent',
  },
  dark: {
    background: 'hsl(240 5.9% 5%)',
    foreground: 'hsl(0 0% 98%)',
    card: 'hsl(240 5.9% 10%)',
    cardForeground: 'hsl(0 0% 98%)',
    popover: 'hsl(240 5.9% 10%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(240 5.9% 90%)',
    primaryForeground: 'hsl(240 5.9% 10%)',
    secondary: 'hsl(240 3.7% 15.9%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    muted: 'hsl(240 3.7% 15.9%)',
    mutedForeground: 'hsl(240 5% 64.9%)',
    accent: 'hsl(240 3.7% 15.9%)',
    accentForeground: 'hsl(0 0% 98%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    border: 'hsl(240 3.7% 15.9%)',
    input: 'hsl(240 3.7% 15.9%)',
    ring: 'hsl(240 4.9% 83.9%)',
    chart1: 'hsl(264 100% 50%)',
    chart2: 'hsl(162 100% 50%)',
    chart3: 'hsl(70 100% 50%)',
    chart4: 'hsl(303 100% 50%)',
    chart5: 'hsl(16 100% 50%)',
    sidebar: 'hsl(240 5.9% 10%)',
    sidebarForeground: 'hsl(0 0% 98%)',
    sidebarPrimary: 'hsl(264 100% 50%)',
    sidebarPrimaryForeground: 'hsl(0 0% 98%)',
    sidebarAccent: 'hsl(240 3.7% 15.9%)',
    sidebarAccentForeground: 'hsl(0 0% 98%)',
    sidebarBorder: 'hsl(240 3.7% 15.9%)',
    sidebarRing: 'hsl(240 4.9% 83.9%)',
    transparent: 'transparent',
  },
};

const spacing = {
  $0: 0,
  $2: 2,
  $4: 4,
  $6: 6,
  $8: 8,
  $10: 10,
  $12: 12,
  $14: 14,
  $16: 16,
  $20: 20,
  $24: 24,
  $28: 28,
  $32: 32,
  $36: 36,
  $40: 40,
  $44: 44,
  $48: 48,
  $56: 56,
  $64: 64,
  $80: 80,
  $96: 96,
  $112: 112,
  $128: 128,
  $144: 144,
  $160: 160,
  $176: 176,
  $192: 192,
  $208: 208,
  $224: 224,
  $240: 240,
  $256: 256,
  $288: 288,
  $320: 320,
  $384: 384,
};

const borderRadius = {
  $0: 0,
  $2: 2,
  $4: 4,
  $6: 6,
  $8: 8,
  $12: 12,
  $16: 16,
  $24: 24,
  $9999: 9999,
};

export const useAppTheme = () => {
  const { theme } = useStoreTheme();
  return {
    theme,
    colors: colors[theme],
    spacing,
    borderRadius,
  };
};
