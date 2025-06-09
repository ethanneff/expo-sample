import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

export const CardButtons = () => {
  const { spacing } = useAppTheme();
  return (
    <Card>
      <View gap={spacing.$12}>
        <Button onPress={noop} title="Full Width" variant="outline" />
        <View flexDirection="row" flexWrap="wrap" gap={spacing.$12} justifyContent="center">
          <Button onPress={noop} title="Primary" variant="primary" />
          <Button onPress={noop} title="Secondary" variant="secondary" />
          <Button onPress={noop} title="Destructive" variant="destructive" />
          <Button onPress={noop} title="Outline" variant="outline" />
          <Button onPress={noop} title="Ghost" variant="ghost" />
          <Button onPress={noop} title="Link" variant="link" />
          <Button disabled onPress={noop} title="Disabled" variant="primary" />
          <Button loading onPress={noop} title="Loading" variant="outline" />
          <Button icon="logo-google" onPress={noop} title="" variant="outline" />
          <Button icon="logo-google" onPress={noop} title="With Icon" variant="outline" />
        </View>
      </View>
    </Card>
  );
};
