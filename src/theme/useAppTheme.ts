import { useStoreTheme } from '../store/useStoreTheme';
import { colors } from './colors';
import { borderRadius, spacing } from './spacing';

export const useAppTheme = () => {
  const { theme } = useStoreTheme();
  return {
    theme,
    colors: colors[theme],
    spacing,
    borderRadius,
  };
};
