import { useState } from 'react';
import { Pressable } from 'react-native';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ title, onPress, disabled }: Props) => {
  const { colors, spacing } = useAppTheme();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsPressed(true)}
      onHoverOut={() => setIsPressed(false)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        cursor: disabled ? 'auto' : 'pointer',
      })}>
      <View
        backgroundColor={isPressed ? colors.accent : colors.background}
        borderColor={colors.border}
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        paddingHorizontal={spacing.$12}
        paddingVertical={spacing.$6}
        borderRadius={spacing.$8}>
        <Text title={title} size="sm" weight="medium" />
      </View>
    </Pressable>
  );
};
