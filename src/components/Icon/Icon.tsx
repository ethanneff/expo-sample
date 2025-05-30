import { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

type IconProps = {
  name: IconName;
  size: number;
  color?: string;
};

export const Icon = ({ name, size, color = '#000' }: IconProps) => {
  return <Icon name={name} size={size} color={color} />;
};
