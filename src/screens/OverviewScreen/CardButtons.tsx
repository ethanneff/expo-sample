import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const CardButtons = () => {
  const { spacing } = useAppTheme();
  return (
    <Card>
      <View gap={spacing.$12}>
        <Button title="Full Width" onPress={() => {}} variant="outline" />
        <View gap={spacing.$12} flexDirection="row" flexWrap="wrap" justifyContent="center">
          <Button title="Primary" onPress={() => {}} variant="primary" />
          <Button title="Secondary" onPress={() => {}} variant="secondary" />
          <Button title="Destructive" onPress={() => {}} variant="destructive" />
          <Button title="Outline" onPress={() => {}} variant="outline" />
          <Button title="Ghost" onPress={() => {}} variant="ghost" />
          <Button title="Link" onPress={() => {}} variant="link" />
          <Button title="Disabled" onPress={() => {}} variant="primary" disabled />
          <Button title="Loading" onPress={() => {}} variant="outline" loading />
          <Button title="" onPress={() => {}} variant="outline" icon="logo-google" />
          <Button title="With Icon" onPress={() => {}} variant="outline" icon="logo-google" />
        </View>
      </View>
    </Card>
  );
};
