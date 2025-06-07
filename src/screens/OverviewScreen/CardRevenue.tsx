import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';

export const CardRevenue = () => {
  return (
    <Card>
      <Text title="Total Revenue" variant="muted" />
      <Text title="$15231.89" variant="h3" />
      <Text title="+20.1% from last month" variant="muted" />
    </Card>
  );
};
