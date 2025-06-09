import { useCallback, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Pressable } from 'react-native';
import { type ButtonVariant } from '~/components/Button/types';
import { useButtonStyles } from '~/components/Button/useButtonStyles';
import { Icon, type IconName } from '~/components/Icon/Icon';
import { Loader } from '~/components/Loader/Loader';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Properties = {
  readonly disabled?: boolean;
  readonly fitContent?: boolean;
  readonly icon?: IconName;
  readonly loading?: boolean;
  readonly onPress: () => void;
  readonly title: string;
  readonly variant: ButtonVariant;
};

export const Button = ({
  disabled,
  fitContent,
  icon,
  loading,
  onPress,
  title,
  variant = 'primary',
}: Properties) => {
  const { colors, spacing } = useAppTheme();
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled ?? loading;
  const { backgroundColor, borderColor, color } = useButtonStyles(variant);

  const togglePressed = useCallback(
    (value: boolean) => () => {
      setIsPressed(value);
    },
    []
  );

  return (
    <Pressable
      disabled={isDisabled}
      onHoverIn={togglePressed(true)}
      onHoverOut={togglePressed(false)}
      onPress={onPress}
      onPressIn={togglePressed(true)}
      onPressOut={togglePressed(false)}
      style={({ pressed }) => ({
        cursor: isDisabled ? 'auto' : 'pointer',
        opacity: pressed ? 0.25 : 1,
      })}>
      <View
        alignSelf={fitContent ? 'center' : 'auto'}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={spacing.$8}
        borderWidth={1}
        opacity={isDisabled ? 0.5 : 1}
        paddingHorizontal={spacing.$16}
        paddingVertical={spacing.$6}>
        <Loader absoluteFillObject color={color} visible={loading ?? false} />
        <View
          alignItems="center"
          flexDirection="row"
          gap={spacing.$8}
          justifyContent="center"
          opacity={loading ? 0 : 1}>
          {icon ? (
            <View
              alignItems="center"
              justifyContent="center"
              position={title.length === 0 ? 'absolute' : 'relative'}>
              <Icon color={colors[color]} name={icon} size={18} />
            </View>
          ) : null}
          <Text
            color={color}
            textDecorationLine={variant === 'link' && isPressed ? 'underline' : 'none'}
            title={title}
            variant="small"
          />
        </View>
      </View>
    </Pressable>
  );
};
