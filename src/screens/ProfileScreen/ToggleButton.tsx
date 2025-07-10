import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { Pressable } from '~/components/Pressable/Pressable';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type ToggleButtonProperties = {
  readonly onPress: () => void;
  readonly title: string;
};

export const ToggleButton = ({ onPress, title }: ToggleButtonProperties) => {
  const { borderRadius, colors, spacing } = useAppTheme();
  const translateY = useRef(new Animated.Value(-spacing.$8)).current;

  const renderButton = useCallback(
    (buttonTitle: string, accessible: boolean) => {
      return (
        <View
          absoluteFillObject={!accessible}
          backgroundColor={accessible ? colors.chart1 : colors.border}
          borderRadius={borderRadius.$16}
          padding={spacing.$16}
          paddingHorizontal={spacing.$24}>
          <Text
            accessible={accessible}
            color="primaryForeground"
            fontFamily="Geist-Bold"
            textAlign="center"
            textTransform="uppercase"
            title={buttonTitle}
            variant="lead"
          />
        </View>
      );
    },
    [colors, borderRadius, spacing]
  );

  const handlePressIn = useCallback(() => {
    Animated.timing(translateY, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const handlePressOut = useCallback(() => {
    Animated.timing(translateY, {
      duration: 100,
      toValue: -spacing.$8,
      useNativeDriver: true,
    }).start();
    onPress();
  }, [translateY, onPress, spacing]);

  return (
    <Pressable activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{ translateY }],
          zIndex: 1,
        }}>
        {renderButton(title, true)}
      </Animated.View>
      {renderButton(title, false)}
    </Pressable>
  );
};
