import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const Divider = () => {
  const { colors } = useAppTheme();
  return <View backgroundColor={colors.border} flex={1} height={1} />;
};
