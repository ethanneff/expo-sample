import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

export const CardCreateAccount = () => {
  const { colors, spacing } = useAppTheme();

  return (
    <Card>
      <View gap={spacing.$16}>
        <View>
          <Text title="Create an account" variant="h3" />
          <Text title="Enter your email below to create your account" variant="muted" />
        </View>
        <View flexDirection="row" gap={spacing.$12} justifyContent="center">
          <View flex={1}>
            <Button icon="logo-google" onPress={noop} title="Google" variant="outline" />
          </View>
          <View flex={1}>
            <Button icon="logo-facebook" onPress={noop} title="Facebook" variant="outline" />
          </View>
        </View>
        <View alignItems="center" flexDirection="row" gap={spacing.$6}>
          <View backgroundColor={colors.border} flex={1} height={1} />
          <Text textTransform="uppercase" title="Or continue with" variant="muted" />
          <View backgroundColor={colors.border} flex={1} height={1} />
        </View>
        <Input
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          defaultValue=""
          editable
          keyboardType="email-address"
          label="Email"
          onChangeText={noop}
          onSubmitEditing={noop}
          placeholder="m@example.com"
          returnKeyType="done"
          submitBehavior="submit"
          textContentType="emailAddress"
        />
        <Input
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          defaultValue=""
          editable
          keyboardType="visible-password"
          label="Password"
          onChangeText={noop}
          onSubmitEditing={noop}
          placeholder="********"
          returnKeyType="done"
          secureTextEntry
          submitBehavior="submit"
          textContentType="password"
        />
        <Button onPress={noop} title="Create Account" variant="primary" />
      </View>
    </Card>
  );
};
