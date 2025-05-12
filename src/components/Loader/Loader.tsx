import { useEffect } from 'react';

import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type DotProps = {
  size: number;
};

const Dot = ({ size = 16 }: DotProps) => {
  const { colors } = useAppTheme();
  return (
    <View width={size} height={size} borderRadius={size / 2} backgroundColor={colors.primary} />
  );
};

type LoaderProps = {
  size?: number;
  duration?: number;
  absoluteFillObject?: boolean;
  visible: boolean;
};

export const Loader = ({ size = 8, duration = 1500, absoluteFillObject, visible }: LoaderProps) => {
  const progress = useSharedValue(0);
  const { spacing } = useAppTheme();

  useEffect(() => {
    if (visible) {
      progress.value = withRepeat(
        withTiming(1, {
          duration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        false
      );
    } else {
      progress.value = withTiming(0, {
        duration,
        easing: Easing.inOut(Easing.quad),
      });
    }
  }, [duration, progress, visible]);

  const dot1Style = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.25, 0.5], [0.2, 1, 0.2], 'clamp');
    return { opacity };
  });

  const dot2Style = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0.25, 0.5, 0.75], [0.2, 1, 0.2], 'clamp');
    return { opacity };
  });

  const dot3Style = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0.5, 0.75, 1], [0.2, 1, 0.2], 'clamp');
    return { opacity };
  });

  return (
    <View
      opacity={visible ? 1 : 0}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap={spacing.$4}
      absoluteFillObject={absoluteFillObject}>
      <Animated.View style={dot1Style}>
        <Dot size={size} />
      </Animated.View>
      <Animated.View style={dot2Style}>
        <Dot size={size} />
      </Animated.View>
      <Animated.View style={dot3Style}>
        <Dot size={size} />
      </Animated.View>
    </View>
  );
};
