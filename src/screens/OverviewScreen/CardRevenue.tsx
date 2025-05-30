import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';

export const CardRevenue = () => {
  return (
    <Card>
      <Text title="Total Revenue" size="sm" tracking="tight" />
      <Text title="$15231.89" size="2xl" weight="bold" />
      <Text title="+20.1% from last month" color="mutedForeground" size="sm" />
    </Card>
  );
};
