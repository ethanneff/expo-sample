import { type StyleProp, type ViewStyle } from 'react-native';
import { View } from '~/components/View/View';
import { useStoreTheme } from '~/store/useStoreTheme';
import { useAppTheme } from '~/theme/useAppTheme';

type CardProperties = {
  readonly children: React.ReactNode;
  readonly style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProperties) => {
  const { borderRadius, colors, spacing } = useAppTheme();
  const theme = useStoreTheme((state) => state.theme);

  return (
    <View
      backgroundColor={colors.card}
      borderColor={colors.border}
      borderRadius={borderRadius.$12}
      borderWidth={1.5}
      dropShadow={theme === 'light'}
      overflow="hidden"
      padding={spacing.$12}
      style={style}>
      {children}
    </View>
  );
};
