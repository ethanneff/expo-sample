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
import { type ColorName, useAppTheme } from '~/theme/useAppTheme';

type DotProperties = {
  readonly color: ColorName;
  readonly size: number;
};

const Dot = ({ color, size = 16 }: DotProperties) => {
  const { colors } = useAppTheme();
  return (
    <View backgroundColor={colors[color]} borderRadius={size / 2} height={size} width={size} />
  );
};

type LoaderProperties = {
  readonly absoluteFillObject?: boolean;
  readonly color: ColorName;
  readonly duration?: number;
  readonly size?: number;
  readonly visible: boolean;
};

// eslint-disable-next-line react/no-multi-comp
export const Loader = ({
  absoluteFillObject,
  color = 'primary',
  duration = 1500,
  size = 8,
  visible,
}: LoaderProperties) => {
  const progress = useSharedValue(0);
  const { spacing } = useAppTheme();

  useEffect(() => {
    progress.value = visible
      ? withRepeat(
          withTiming(4, {
            duration,
            easing: Easing.linear,
          }),
          -1,
          false
        )
      : withTiming(0, {
          duration,
          easing: Easing.linear,
        });
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
      absoluteFillObject={absoluteFillObject}
      alignItems="center"
      flexDirection="row"
      gap={spacing.$4}
      justifyContent="center"
      opacity={visible ? 1 : 0}>
      <Animated.View style={dot1Style}>
        <Dot color={color} size={size} />
      </Animated.View>
      <Animated.View style={dot2Style}>
        <Dot color={color} size={size} />
      </Animated.View>
      <Animated.View style={dot3Style}>
        <Dot color={color} size={size} />
      </Animated.View>
    </View>
  );
};
