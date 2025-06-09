import { Pressable } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Properties = {
  readonly checked: boolean;
  readonly onPress: () => void;
  readonly size?: number;
};

export const Toggle = ({ checked, onPress, size = 16 }: Properties) => {
  const { colors, spacing } = useAppTheme();
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: withTiming(checked ? size : 0, { duration: 200 }) }] };
  });

  return (
    <Pressable onPressIn={onPress}>
      <View
        alignItems="center"
        backgroundColor={checked ? colors.foreground : colors.border}
        borderRadius={size}
        flexDirection="row"
        padding={spacing.$2}>
        <Animated.View entering={FadeIn} exiting={FadeOut} style={animatedStyle}>
          <View
            backgroundColor={colors.primaryForeground}
            borderRadius={size}
            height={size}
            width={size}
          />
        </Animated.View>
        <View borderRadius={size} height={size} opacity={0} width={size} />
      </View>
    </Pressable>
  );
};
