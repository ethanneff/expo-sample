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
import { ColorName, useAppTheme } from '~/theme/useAppTheme';

type DotProps = {
  size: number;
  color: ColorName;
};

const Dot = ({ size = 16, color }: DotProps) => {
  const { colors } = useAppTheme();
  return (
    <View width={size} height={size} borderRadius={size / 2} backgroundColor={colors[color]} />
  );
};

type LoaderProps = {
  size?: number;
  duration?: number;
  absoluteFillObject?: boolean;
  visible: boolean;
  color: ColorName;
};

export const Loader = ({
  size = 8,
  duration = 1500,
  absoluteFillObject,
  visible,
  color = 'primary',
}: LoaderProps) => {
  const progress = useSharedValue(0);
  const { spacing } = useAppTheme();

  useEffect(() => {
    if (visible) {
      progress.value = withRepeat(
        withTiming(4, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      progress.value = withTiming(0, {
        duration,
        easing: Easing.linear,
      });
    }
  }, [duration, progress, visible]);

  const dot1Style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1, 2, 3, 4], [1, 0.4, 0.2, 0.4, 1], 'clamp'),
      transform: [
        { scale: interpolate(progress.value, [0, 1, 2, 3, 4], [1, 0.85, 0.7, 0.85, 1], 'clamp') },
      ],
    };
  });

  const dot2Style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1, 2, 3, 4], [0.4, 1, 0.4, 0.2, 0.4], 'clamp'),
      transform: [
        {
          scale: interpolate(progress.value, [0, 1, 2, 3, 4], [0.85, 1, 0.85, 0.7, 0.85], 'clamp'),
        },
      ],
    };
  });

  const dot3Style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1, 2, 3, 4], [0.2, 0.4, 1, 0.4, 0.2], 'clamp'),
      transform: [
        {
          scale: interpolate(progress.value, [0, 1, 2, 3, 4], [0.85, 1, 0.85, 0.7, 0.85], 'clamp'),
        },
      ],
    };
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
        <Dot size={size} color={color} />
      </Animated.View>
      <Animated.View style={dot2Style}>
        <Dot size={size} color={color} />
      </Animated.View>
      <Animated.View style={dot3Style}>
        <Dot size={size} color={color} />
      </Animated.View>
    </View>
  );
};
