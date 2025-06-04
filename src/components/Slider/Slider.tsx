import { useCallback } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useAppTheme } from '../../theme/useAppTheme';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40;
const KNOB_SIZE = 30;

interface SliderProps {
  onChange: (value: number) => void;
  min: number;
  max: number;
  value: number;
  step: number;
}

export const Slider = ({ onChange, min = 0, max = 1, value, step = 1 }: SliderProps) => {
  const { colors } = useAppTheme();
  const translateX = useSharedValue(((value - min) / (max - min)) * (SLIDER_WIDTH - KNOB_SIZE));
  const context = useSharedValue(0);

  const onGestureEnd = useCallback(
    (val: number) => {
      onChange(val);
    },
    [onChange]
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = translateX.value;
    })
    .onUpdate((e) => {
      translateX.value = Math.min(
        Math.max(0, context.value + e.translationX),
        SLIDER_WIDTH - KNOB_SIZE
      );
    })
    .onEnd(() => {
      const percent = translateX.value / (SLIDER_WIDTH - KNOB_SIZE);
      let value = min + percent * (max - min);
      value = Math.round(value / step) * step;
      runOnJS(onGestureEnd)(value);
    });

  const tap = Gesture.Tap().onEnd((e) => {
    const newX = Math.min(Math.max(0, e.x - KNOB_SIZE / 2), SLIDER_WIDTH - KNOB_SIZE);
    translateX.value = withSpring(newX);
    const percent = newX / (SLIDER_WIDTH - KNOB_SIZE);
    let value = min + percent * (max - min);
    value = Math.round(value / step) * step;
    runOnJS(onGestureEnd)(value);
  });

  const composed = Gesture.Race(pan, tap);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={composed}>
        <Animated.View
          style={{
            width: SLIDER_WIDTH,
            height: KNOB_SIZE,
            backgroundColor: colors.primaryForeground,
            borderRadius: KNOB_SIZE / 2,
            justifyContent: 'center',
          }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: KNOB_SIZE,
                height: KNOB_SIZE,
                backgroundColor: colors.primaryForeground,
                borderColor: colors.primary,
                borderWidth: 2,
                borderRadius: KNOB_SIZE / 2,
              },
              knobStyle,
            ]}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
