import { useStoreTheme } from '../store/useStoreTheme';

export type ColorName =
  | 'accent'
  | 'accentForeground'
  | 'background'
  | 'border'
  | 'card'
  | 'cardForeground'
  | 'chart1'
  | 'chart2'
  | 'chart3'
  | 'chart4'
  | 'chart5'
  | 'destructive'
  | 'foreground'
  | 'input'
  | 'muted'
  | 'mutedForeground'
  | 'popover'
  | 'popoverForeground'
  | 'primary'
  | 'primaryForeground'
  | 'ring'
  | 'secondary'
  | 'secondaryForeground'
  | 'sidebar'
  | 'sidebarAccent'
  | 'sidebarAccentForeground'
  | 'sidebarBorder'
  | 'sidebarForeground'
  | 'sidebarPrimary'
  | 'sidebarPrimaryForeground'
  | 'sidebarRing'
  | 'transparent';

type Theme = 'dark' | 'light';

const colors: Record<Theme, Record<ColorName, string>> = {
  dark: {
    accent: 'hsl(240 3.7% 15.9%)',
    accentForeground: 'hsl(0 0% 98%)',
    background: 'hsl(240 5.9% 5%)',
    border: 'hsl(240 3.7% 15.9%)',
    card: 'hsl(240 5.9% 10%)',
    cardForeground: 'hsl(0 0% 98%)',
    chart1: 'hsl(264 100% 50%)',
    chart2: 'hsl(162 100% 50%)',
    chart3: 'hsl(70 100% 50%)',
    chart4: 'hsl(303 100% 50%)',
    chart5: 'hsl(16 100% 50%)',
    destructive: 'hsl(0 62.8% 30.6%)',
    foreground: 'hsl(0 0% 98%)',
    input: 'hsl(240 3.7% 15.9%)',
    muted: 'hsl(240 3.7% 15.9%)',
    mutedForeground: 'hsl(240 5% 64.9%)',
    popover: 'hsl(240 5.9% 10%)',
    popoverForeground: 'hsl(0 0% 98%)',
    primary: 'hsl(240 5.9% 90%)',
    primaryForeground: 'hsl(240 5.9% 10%)',
    ring: 'hsl(240 4.9% 83.9%)',
    secondary: 'hsl(240 3.7% 15.9%)',
    secondaryForeground: 'hsl(0 0% 98%)',
    sidebar: 'hsl(240 5.9% 10%)',
    sidebarAccent: 'hsl(240 3.7% 15.9%)',
    sidebarAccentForeground: 'hsl(0 0% 98%)',
    sidebarBorder: 'hsl(240 3.7% 15.9%)',
    sidebarForeground: 'hsl(0 0% 98%)',
    sidebarPrimary: 'hsl(264 100% 50%)',
    sidebarPrimaryForeground: 'hsl(0 0% 98%)',
    sidebarRing: 'hsl(240 4.9% 83.9%)',
    transparent: 'transparent',
  },
  light: {
    accent: 'hsl(240 4.8% 95.9%)',
    accentForeground: 'hsl(240 5.9% 10%)',
    background: 'hsl(0 0% 95%)',
    border: 'hsl(240 5.9% 90%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(240 5.9% 10%)',
    chart1: 'hsl(41 100% 50%)',
    chart2: 'hsl(184 100% 50%)',
    chart3: 'hsl(227 100% 50%)',
    chart4: 'hsl(84 100% 50%)',
    chart5: 'hsl(70 100% 50%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    foreground: 'hsl(240 5.9% 10%)',
    input: 'hsl(240 5.9% 90%)',
    muted: 'hsl(240 4.8% 95.9%)',
    mutedForeground: 'hsl(240 3.8% 46.1%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(240 5.9% 10%)',
    primary: 'hsl(240 5.9% 10%)',
    primaryForeground: 'hsl(0 0% 98%)',
    ring: 'hsl(240 5.9% 10%)',
    secondary: 'hsl(240 4.8% 95.9%)',
    secondaryForeground: 'hsl(240 5.9% 10%)',
    sidebar: 'hsl(0 0% 98%)',
    sidebarAccent: 'hsl(240 4.8% 95.9%)',
    sidebarAccentForeground: 'hsl(240 5.9% 10%)',
    sidebarBorder: 'hsl(240 5.9% 90%)',
    sidebarForeground: 'hsl(240 5.9% 10%)',
    sidebarPrimary: 'hsl(240 5.9% 10%)',
    sidebarPrimaryForeground: 'hsl(0 0% 98%)',
    sidebarRing: 'hsl(240 5.9% 10%)',
    transparent: 'transparent',
  },
};

const spacing = {
  $0: 0,
  $1: 1,
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
    borderRadius,
    colors: colors[theme],
    spacing,
    theme,
  };
};
