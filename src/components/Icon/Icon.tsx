import { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

type IconProperties = {
  readonly color?: string;
  readonly name: IconName;
  readonly size: number;
};

export const Icon = ({ color = '#000', name, size }: IconProperties) => {
  return <Ionicons color={color} name={name} size={size} />;
};
