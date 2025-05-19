import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Loader } from '~/components/Loader/Loader';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  title: string;
  icon?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({ title, onPress, disabled, icon, loading = false }: Props) => {
  const { colors, spacing } = useAppTheme();
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onHoverIn={() => setIsPressed(true)}
      onHoverOut={() => setIsPressed(false)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
        cursor: isDisabled ? 'auto' : 'pointer',
      })}>
      <View
        backgroundColor={isPressed ? colors.accent : colors.background}
        borderColor={colors.border}
        borderWidth={1}
        paddingHorizontal={spacing.$12}
        paddingVertical={spacing.$6}
        borderRadius={spacing.$8}>
        <Loader absoluteFillObject visible={loading} />
        <View
          gap={spacing.$8}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          opacity={loading ? 0 : 1}>
          {icon ? <Ionicons name={icon} size={16} color={colors.foreground} /> : null}
          <Text title={title} size="sm" weight="medium" />
        </View>
      </View>
    </Pressable>
  );
};
