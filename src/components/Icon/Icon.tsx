import { Ionicons } from '@expo/vector-icons';

type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
};

export const Icon = ({ name, size, color = '#000' }: IconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};
