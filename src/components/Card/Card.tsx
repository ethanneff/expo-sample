import { View } from '~/components/View/View';
import { useStoreTheme } from '~/store/useStoreTheme';
import { useAppTheme } from '~/theme/useAppTheme';

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { colors, borderRadius, spacing } = useAppTheme();
  const theme = useStoreTheme((state) => state.theme);

  return (
    <View
      dropShadow={theme === 'light'}
      backgroundColor={colors.card}
      borderRadius={borderRadius.$12}
      borderColor={colors.border}
      padding={spacing.$12}
      borderWidth={1.5}>
      {children}
    </View>
  );
};
