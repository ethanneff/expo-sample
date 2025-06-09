import { useCallback, useState } from 'react';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { Toggle } from '~/components/Toggle/Toggle';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type ToggleSectionProperties = {
  readonly checked?: boolean;
  readonly description: string;
  readonly title: string;
};

const ToggleSection = ({ checked, description, title }: ToggleSectionProperties) => {
  const { spacing } = useAppTheme();
  const [isChecked, setIsChecked] = useState(Boolean(checked));

  const handlePress = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <View alignItems="center" flexDirection="row" gap={spacing.$12}>
      <View flexShrink={1}>
        <Text title={title} />
        <Text title={description} variant="muted" />
      </View>
      <Toggle checked={isChecked} onPress={handlePress} />
    </View>
  );
};

const noop = () => false;

// eslint-disable-next-line react/no-multi-comp
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
          description="These cookies are essential to use the website and use its features"
          title="Strictly Necessary"
        />
        <ToggleSection
          checked
          description="These cookies allow the website to provide personalized functionality"
          title="Functional Cookies"
        />
        <ToggleSection
          description="These cookies help to improve the performance of the website"
          title="Performance Cookies"
        />
        <Button onPress={noop} title="Save preferences" variant="primary" />
      </View>
    </Card>
  );
};
