import { useState } from 'react';
import { Button } from '~/components/Button/Button';

import { Card } from '~/components/Card/Card';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { Toggle } from '~/components/Toggle/Toggle';
import { View } from '~/components/View/View';
import { spacing } from '~/theme/spacing';
import { useAppTheme } from '~/theme/useAppTheme';

type ToggleSectionProps = {
  title: string;
  description: string;
};

const ToggleSection = ({ title, description }: ToggleSectionProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View flexDirection="row" gap={spacing.$4} alignItems="center">
      <View flexShrink={1}>
        <Text title={title} size="sm" weight="medium" />
        <Text title={description} color="mutedForeground" size="xs" />
      </View>
      <Toggle checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
    </View>
  );
};

const OverviewScreen = () => {
  const { colors } = useAppTheme();
  return (
    <Screen>
      <Card>
        <Text title="Total Revenue" size="sm" tracking="tight" />
        <Text title="$15231.89" size="2xl" weight="bold" />
        <Text title="+20.1% from last month" color="mutedForeground" size="sm" />
      </Card>
      <Card>
        <Text
          title="Create an account"
          size="2xl"
          weight="semibold"
          color="foreground"
          tracking="tight"
        />
        <Text
          title="Enter your email below to create your account"
          size="sm"
          color="mutedForeground"
          weight="light"
        />
        <View flexDirection="row" alignItems="center" gap={spacing.$6}>
          <View height={1} backgroundColor={colors.border} flex={1} />
          <Text
            title="Or continue with"
            color="mutedForeground"
            size="xs"
            textTransform="uppercase"
          />
          <View height={1} backgroundColor={colors.border} flex={1} />
        </View>
      </Card>
      <Card>
        <View gap={spacing.$16}>
          <View>
            <Text title="Cookie Settings" size="sm" tracking="tight" weight="semibold" />
            <Text title="Manage your cookie settings here" size="sm" color="mutedForeground" />
          </View>
          <ToggleSection
            title="Strictly Necessary"
            description="These cookies are essential to use the website and use its features"
          />
          <ToggleSection
            title="Functional Cookies"
            description="These cookies allow the website to provide personalized functionality"
          />
          <ToggleSection
            title="Performance Cookies"
            description="These cookies help to improve the performance of the website"
          />
          <Button title="Save preferences" onPress={() => {}} />
        </View>
      </Card>
    </Screen>
  );
};

export default OverviewScreen;
