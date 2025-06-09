import { Icon, type IconName } from '~/components/Icon/Icon';

type TabBarIconProperties = {
  readonly color: string;
  readonly size: number;
};

export const getTabBarIcon = (icon: IconName) => {
  const TabBarIcon = ({ color, size }: TabBarIconProperties) => (
    <Icon color={color} name={icon} size={size - 8} />
  );
  TabBarIcon.displayName = `TabBarIcon(${icon})`;
  return TabBarIcon;
};
