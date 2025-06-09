// eslint-disable-next-line no-restricted-imports
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native';

type PressableProperties = {
  readonly children: React.ReactNode;
  readonly onPress: () => void;
  readonly style?: StyleProp<ViewStyle>;
};

export const Pressable = ({ children, onPress, style }: PressableProperties) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};
