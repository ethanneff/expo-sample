import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';

export const CardSubscriptions = () => {
  return (
    <Card>
      <Text title="Subscriptions" size="sm" tracking="tight" />
      <Text title="+2350" size="2xl" weight="bold" />
      <Text title="+180.1% from last month" color="mutedForeground" size="sm" />
    </Card>
  );
};
