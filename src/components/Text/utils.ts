export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'p'
  | 'blockquote'
  | 'list'
  | 'code'
  | 'lead'
  | 'small'
  | 'xsmall'
  | 'large'
  | 'muted';

export type TextSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

export type TextLetterSpacing = 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export type FontFamily =
  | 'Geist-Light'
  | 'Geist-Regular'
  | 'Geist-Medium'
  | 'Geist-SemiBold'
  | 'Geist-Bold'
  | 'Geist-ExtraBold'
  | 'GeistMono-Regular'
  | 'GeistMono-Bold';

export const textSize: Record<TextSize, { fontSize: number; lineHeight: number }> = {
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  md: { fontSize: 16, lineHeight: 24 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  '2xl': { fontSize: 24, lineHeight: 32 },
  '3xl': { fontSize: 30, lineHeight: 36 },
  '4xl': { fontSize: 36, lineHeight: 40 },
  '5xl': { fontSize: 48, lineHeight: 48 },
  '6xl': { fontSize: 60, lineHeight: 60 },
  '7xl': { fontSize: 72, lineHeight: 72 },
  '8xl': { fontSize: 96, lineHeight: 96 },
  '9xl': { fontSize: 128, lineHeight: 128 },
};

export const letterSpacing: Record<TextLetterSpacing, { letterSpacing: number }> = {
  tighter: { letterSpacing: -0.8 },
  tight: { letterSpacing: -0.4 },
  normal: { letterSpacing: 0 },
  wide: { letterSpacing: 0.04 },
  wider: { letterSpacing: 0.08 },
  widest: { letterSpacing: 1.6 },
};

export const geistFontFamily: Record<TextWeight, { fontFamily: FontFamily }> = {
  light: { fontFamily: 'Geist-Light' },
  regular: { fontFamily: 'Geist-Regular' },
  medium: { fontFamily: 'Geist-Medium' },
  semibold: { fontFamily: 'Geist-SemiBold' },
  bold: { fontFamily: 'Geist-Bold' },
  extrabold: { fontFamily: 'Geist-ExtraBold' },
};

export const geistMonoFontFamily: Record<TextWeight, { fontFamily: FontFamily }> = {
  light: { fontFamily: 'GeistMono-Regular' },
  regular: { fontFamily: 'GeistMono-Regular' },
  medium: { fontFamily: 'GeistMono-Regular' },
  semibold: { fontFamily: 'GeistMono-Bold' },
  extrabold: { fontFamily: 'GeistMono-Bold' },
  bold: { fontFamily: 'GeistMono-Bold' },
};
