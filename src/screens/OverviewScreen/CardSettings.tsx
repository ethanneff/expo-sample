import { useState } from 'react';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { Toggle } from '~/components/Toggle/Toggle';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type ToggleSectionProps = {
  title: string;
  description: string;
  checked?: boolean;
};

const ToggleSection = ({ title, description, checked }: ToggleSectionProps) => {
  const { spacing } = useAppTheme();
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <View flexDirection="row" gap={spacing.$12} alignItems="center">
      <View flexShrink={1}>
        <Text title={title} />
        <Text title={description} variant="muted" />
      </View>
      <Toggle checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
    </View>
  );
};

export const CardSettings = () => {
  const { spacing } = useAppTheme();
  return (
    <Card>
      <View gap={spacing.$16}>
        <View>
          <Text title="Cookie Settings" variant="h3" />
          <Text title="Manage your cookie settings here" variant="muted" />
        </View>
        <ToggleSection
          title="Strictly Necessary"
          description="These cookies are essential to use the website and use its features"
        />
        <ToggleSection
          title="Functional Cookies"
          description="These cookies allow the website to provide personalized functionality"
          checked={true}
        />
        <ToggleSection
          title="Performance Cookies"
          description="These cookies help to improve the performance of the website"
        />
        <Button title="Save preferences" onPress={() => {}} variant="primary" />
      </View>
    </Card>
  );
};
