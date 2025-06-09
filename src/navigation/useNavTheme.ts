import { type Theme } from '@react-navigation/native';
import { useAppTheme } from '~/theme/useAppTheme';

export const useNavTheme = () => {
  const { colors, theme } = useAppTheme();

  const navigationTheme: Theme = {
    colors: {
      background: colors.background,
      border: colors.border,
      card: colors.card,
      notification: colors.destructive,
      primary: colors.primary,
      text: colors.foreground,
    },
    dark: theme === 'dark',
    fonts: {
      bold: { fontFamily: 'Geist-Bold', fontWeight: '600' },
      heavy: { fontFamily: 'Geist-ExtraBold', fontWeight: '700' },
      medium: { fontFamily: 'Geist-Medium', fontWeight: '500' },
      regular: { fontFamily: 'Geist-Regular', fontWeight: '400' },
    },
  };

  return navigationTheme;
};
