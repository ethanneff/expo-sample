import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const CardCreateAccount = () => {
  const { spacing, colors } = useAppTheme();

  return (
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
            <Button title="Google" onPress={() => {}} icon="logo-google" variant="outline" />
          </View>
          <View flex={1}>
            <Button title="Facebook" onPress={() => {}} icon="logo-facebook" variant="outline" />
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
        <Input
          label="Email"
          placeholder="m@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          defaultValue=""
          editable={true}
          onChangeText={() => {}}
          submitBehavior="submit"
          onSubmitEditing={() => {}}
          returnKeyType="done"
          textContentType="emailAddress"
        />
        <Input
          label="Password"
          placeholder="********"
          secureTextEntry
          keyboardType="visible-password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          defaultValue=""
          editable={true}
          onChangeText={() => {}}
          submitBehavior="submit"
          onSubmitEditing={() => {}}
          returnKeyType="done"
          textContentType="password"
        />
        <Button title="Create Account" onPress={() => {}} variant="primary" />
      </View>
    </Card>
  );
};
