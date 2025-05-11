import { Pressable } from 'react-native';
import { View } from '~/components/View/View';
import { spacing } from '~/theme/spacing';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  checked: boolean;
  onPress: () => void;
  size?: number;
};

export const Toggle = ({ checked, onPress, size = 16 }: Props) => {
  const { colors } = useAppTheme();

  return (
    <Pressable onPress={onPress}>
      <View
        flexDirection="row"
        alignItems="center"
        backgroundColor={checked ? colors.foreground : colors.border}
        borderRadius={size}
        padding={spacing.$2}>
        <View
          height={size}
          width={size}
          backgroundColor={checked ? colors.foreground : colors.primaryForeground}
          borderRadius={size}
        />
        <View
          height={size}
          width={size}
          backgroundColor={checked ? colors.primaryForeground : colors.border}
          borderRadius={size}
        />
      </View>
    </Pressable>
  );
};
