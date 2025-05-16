import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Screen } from '~/components/Screen/Screen';
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
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.$12,
          gap: spacing.$16,
        }}>
        <Card>
          <Text title="Total Revenue" size="sm" tracking="tight" />
          <Text title="$15231.89" size="2xl" weight="bold" />
          <Text title="+20.1% from last month" color="mutedForeground" size="sm" />
        </Card>
        <Card>
          <View gap={spacing.$16}>
            <View>
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
            </View>
            <View gap={spacing.$12} flexDirection="row" justifyContent="center">
              <View flex={1}>
                <Button title="Google" onPress={() => {}} icon="google" />
              </View>
              <View flex={1}>
                <Button title="Facebook" onPress={() => {}} icon="facebook-f" />
              </View>
            </View>
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
            <Input label="Email" placeholder="m@example.com" />
            <Input label="Password" placeholder="********" secureTextEntry />
            <Button title="Create Account" onPress={() => {}} />
          </View>
        </Card>
        <Card>
          <View marginBottom={spacing.$12}>
            <Text title="Payment Method" tracking="tight" weight="semibold" />
            <Text
              title="Add a new payment method to your account"
              size="sm"
              color="mutedForeground"
            />
          </View>
          <Input label="Name" placeholder="John Doe" />
          <Input label="City" placeholder="New York" />
          <Input label="Card number" placeholder="1234 5678 9012 3456" />
          <View flexDirection="row" gap={spacing.$6}>
            <View flex={1}>
              <Input label="Expires" placeholder="Month" />
            </View>
            <View flex={1}>
              <Input label="Year" placeholder="Year" />
            </View>
            <View flex={1}>
              <Input label="CVC" placeholder="123" secureTextEntry />
            </View>
          </View>
          <Button title="Continue" onPress={() => {}} />
        </Card>
        <Card>
          <View gap={spacing.$16}>
            <View>
              <Text title="Cookie Settings" tracking="tight" weight="semibold" />
              <Text title="Manage your cookie settings here" size="sm" color="mutedForeground" />
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
            <Button title="Save preferences" onPress={() => {}} />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default OverviewScreen;
