import { useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { ButtonVariant } from '~/components/Button/types';
import { useButtonStyles } from '~/components/Button/useButtonStyles';
import { Icon, IconName } from '~/components/Icon/Icon';
import { Loader } from '~/components/Loader/Loader';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  title: string;
  icon?: IconName;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant: ButtonVariant;
  fitContent?: boolean;
};

export const Button = ({
  title,
  onPress,
  disabled,
  icon,
  loading,
  variant = 'primary',
  fitContent,
}: Props) => {
  const { colors, spacing } = useAppTheme();
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled || loading;
  const { backgroundColor, borderColor, color } = useButtonStyles(variant);

  const togglePressed = useCallback(
    (value: boolean) => () => {
      setIsPressed(value);
    },
    []
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={togglePressed(true)}
      onPressOut={togglePressed(false)}
      onHoverIn={togglePressed(true)}
      onHoverOut={togglePressed(false)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.25 : 1,
        cursor: isDisabled ? 'auto' : 'pointer',
      })}>
      <View
        backgroundColor={backgroundColor}
        opacity={isDisabled ? 0.5 : 1}
        borderColor={borderColor}
        alignSelf={fitContent ? 'center' : 'auto'}
        borderWidth={1}
        paddingHorizontal={spacing.$16}
        paddingVertical={spacing.$6}
        borderRadius={spacing.$8}>
        <Loader absoluteFillObject visible={loading ?? false} color={color} />
        <View
          gap={spacing.$8}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          opacity={loading ? 0 : 1}>
          {icon ? (
            <View
              position={title.length === 0 ? 'absolute' : 'relative'}
              justifyContent="center"
              alignItems="center">
              <Icon name={icon} size={18} color={colors[color]} />
            </View>
          ) : null}
          <Text
            title={title}
            size="sm"
            weight="medium"
            color={color}
            decoration={variant === 'link' && isPressed ? 'underline' : 'none'}
          />
        </View>
      </View>
    </Pressable>
  );
};
