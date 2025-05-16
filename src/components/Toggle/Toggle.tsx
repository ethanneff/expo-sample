import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  checked: boolean;
  onPress: () => void;
  size?: number;
};

export const Toggle = ({ checked, onPress, size = 16 }: Props) => {
  const { colors, spacing } = useAppTheme();
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: withTiming(checked ? size : 0, { duration: 200 }) }] };
  });

  return (
    <Pressable onPressIn={onPress}>
      <View
        flexDirection="row"
        alignItems="center"
        backgroundColor={checked ? colors.foreground : colors.border}
        borderRadius={size}
        padding={spacing.$2}>
        <Animated.View style={animatedStyle} entering={FadeIn} exiting={FadeOut}>
          <View
            height={size}
            width={size}
            backgroundColor={colors.primaryForeground}
            borderRadius={size}
          />
        </Animated.View>
        <View height={size} width={size} borderRadius={size} opacity={0} />
      </View>
    </Pressable>
  );
};
