import { useStoreTheme } from '../store/useStoreTheme';
import { colors } from './colors';
import { borderRadius, spacing } from './spacing';

export const useTheme = () => {
  const { theme } = useStoreTheme();
  return {
    colors: colors[theme],
    spacing,
    borderRadius,
  };
};
