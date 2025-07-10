import { Icon, type IconName } from '~/components/Icon/Icon';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { ProgressBar } from '~/screens/ProfileScreen/ProgressBar';
import { useAppTheme } from '~/theme/useAppTheme';

type SectionProperties = {
  readonly current: number;
  readonly icon: IconName;
  readonly title: string;
  readonly total: number;
};

export const Section = ({ current, icon, title, total }: SectionProperties) => {
  const { colors, spacing } = useAppTheme();
  return (
    <View gap={spacing.$8} padding={spacing.$16}>
      <Text title={title} variant="lead" />
      <View alignItems="center" flexDirection="row" gap={spacing.$8}>
        <ProgressBar color="chart1" current={current} total={total} />
        <Icon color={colors.chart1} name={icon} size={spacing.$32} />
      </View>
    </View>
  );
};
