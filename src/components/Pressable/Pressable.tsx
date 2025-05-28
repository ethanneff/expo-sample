import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

type PressableProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Pressable = ({ children, onPress, style }: PressableProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};
