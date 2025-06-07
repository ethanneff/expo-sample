import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';

export const CardSubscriptions = () => {
  return (
    <Card>
      <Text title="Subscriptions" variant="muted" />
      <Text title="+2350" variant="h3" />
      <Text title="+180.1% from last month" variant="muted" />
    </Card>
  );
};
