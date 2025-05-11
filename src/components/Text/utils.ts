import { Typescript } from '~/utils/Typescript';

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

export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

export type FontFamily = 'Geist' | 'GeistMono';

export const getTextSize = (size: TextSize) => {
  switch (size) {
    case 'xs':
      return { fontSize: 12, lineHeight: 16 };
    case 'sm':
      return { fontSize: 14, lineHeight: 20 };
    case 'md':
      return { fontSize: 16, lineHeight: 24 };
    case 'lg':
      return { fontSize: 18, lineHeight: 28 };
    case 'xl':
      return { fontSize: 20, lineHeight: 28 };
    case '2xl':
      return { fontSize: 24, lineHeight: 32 };
    case '3xl':
      return { fontSize: 30, lineHeight: 36 };
    case '4xl':
      return { fontSize: 36, lineHeight: 40 };
    case '5xl':
      return { fontSize: 48, lineHeight: 48 };
    case '6xl':
      return { fontSize: 60, lineHeight: 60 };
    case '7xl':
      return { fontSize: 72, lineHeight: 72 };
    case '8xl':
      return { fontSize: 96, lineHeight: 96 };
    case '9xl':
      return { fontSize: 128, lineHeight: 128 };
    default:
      return Typescript.assertNever(size);
  }
};

export const getLetterSpacing = (size: TextLetterSpacing) => {
  switch (size) {
    case 'tighter':
      return -0.8;
    case 'tight':
      return -0.4;
    case 'normal':
      return 0;
    case 'wide':
      return 0.04;
    case 'wider':
      return 0.08;
    case 'widest':
      return 1.6;
    default:
      return Typescript.assertNever(size);
  }
};

export const getFontFamily = (family: FontFamily, fontWeight: TextWeight) => {
  switch (family) {
    case 'Geist':
      switch (fontWeight) {
        case 'light':
          return 'Geist-Light';
        case 'regular':
          return 'Geist-Regular';
        case 'medium':
          return 'Geist-Medium';
        case 'semibold':
          return 'Geist-SemiBold';
        case 'bold':
          return 'Geist-Bold';
        default:
          return Typescript.assertNever(fontWeight);
      }
    case 'GeistMono':
      switch (fontWeight) {
        case 'regular':
        case 'medium':
        case 'light':
          return 'GeistMono-Regular';
        case 'semibold':
        case 'bold':
          return 'GeistMono-Bold';
        default:
          return Typescript.assertNever(fontWeight);
      }
  }
};
