import { StyleProp, ViewStyle } from 'react-native';
import { View } from '~/components/View/View';
import { useStoreTheme } from '~/store/useStoreTheme';
import { useAppTheme } from '~/theme/useAppTheme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => {
  const { colors, borderRadius, spacing } = useAppTheme();
  const theme = useStoreTheme((state) => state.theme);

  return (
    <View
      overflow="hidden"
      dropShadow={theme === 'light'}
      backgroundColor={colors.card}
      borderRadius={borderRadius.$12}
      borderColor={colors.border}
      padding={spacing.$12}
      borderWidth={1.5}
      style={style}>
      {children}
    </View>
  );
};
