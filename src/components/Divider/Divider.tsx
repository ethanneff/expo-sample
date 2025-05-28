import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const Divider = () => {
  const { colors } = useAppTheme();
  return <View height={1} backgroundColor={colors.border} flex={1} />;
};
