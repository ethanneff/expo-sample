export type FontFamily =
  | 'Geist-Bold'
  | 'Geist-ExtraBold'
  | 'Geist-Light'
  | 'Geist-Medium'
  | 'Geist-Regular'
  | 'Geist-SemiBold'
  | 'GeistMono-Bold'
  | 'GeistMono-Regular';

export type Variant =
  | 'blockquote'
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'large'
  | 'lead'
  | 'list'
  | 'muted'
  | 'p'
  | 'small'
  | 'xsmall';

type TextLetterSpacing = 'normal' | 'tight' | 'tighter' | 'wide' | 'wider' | 'widest';

type TextSize =
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xl'
  | 'xs';

type TextWeight = 'bold' | 'extrabold' | 'light' | 'medium' | 'regular' | 'semibold';

export const textSize: Record<TextSize, { fontSize: number; lineHeight: number }> = {
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 36 },
  '4xl': { fontSize: 36, lineHeight: 40 },
  '5xl': { fontSize: 48, lineHeight: 48 },
  '6xl': { fontSize: 60, lineHeight: 60 },
  '7xl': { fontSize: 72, lineHeight: 72 },
  '8xl': { fontSize: 96, lineHeight: 96 },
  '9xl': { fontSize: 128, lineHeight: 128 },
  lg: { fontSize: 18, lineHeight: 28 },
  md: { fontSize: 16, lineHeight: 24 },
  sm: { fontSize: 14, lineHeight: 20 },
  xl: { fontSize: 20, lineHeight: 28 },
  xs: { fontSize: 12, lineHeight: 16 },
};

export const letterSpacing: Record<TextLetterSpacing, { letterSpacing: number }> = {
  normal: { letterSpacing: 0 },
  tight: { letterSpacing: -0.4 },
  tighter: { letterSpacing: -0.8 },
  wide: { letterSpacing: 0.04 },
  wider: { letterSpacing: 0.08 },
  widest: { letterSpacing: 1.6 },
};

export const geistFontFamily: Record<TextWeight, { fontFamily: FontFamily }> = {
  bold: { fontFamily: 'Geist-Bold' },
  extrabold: { fontFamily: 'Geist-ExtraBold' },
  light: { fontFamily: 'Geist-Light' },
  medium: { fontFamily: 'Geist-Medium' },
  regular: { fontFamily: 'Geist-Regular' },
  semibold: { fontFamily: 'Geist-SemiBold' },
};

export const geistMonoFontFamily: Record<TextWeight, { fontFamily: FontFamily }> = {
  bold: { fontFamily: 'GeistMono-Bold' },
  extrabold: { fontFamily: 'GeistMono-Bold' },
  light: { fontFamily: 'GeistMono-Regular' },
  medium: { fontFamily: 'GeistMono-Regular' },
  regular: { fontFamily: 'GeistMono-Regular' },
  semibold: { fontFamily: 'GeistMono-Bold' },
};
