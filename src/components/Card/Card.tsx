import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { colors, borderRadius, spacing } = useAppTheme();

  return (
    <View
      dropShadowColor="card"
      backgroundColor={colors.card}
      borderRadius={borderRadius.$4}
      padding={spacing.$4}
      borderColor={colors.border}
      borderWidth={1}>
      {children}
    </View>
  );
};
