// eslint-disable-next-line no-restricted-imports
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

export const Pressable = ({ children, ...rest }: TouchableOpacityProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>;
};
