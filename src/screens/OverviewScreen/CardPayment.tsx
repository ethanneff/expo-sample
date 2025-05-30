import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const CardPayment = () => {
  const { spacing } = useAppTheme();

  return (
    <Card>
      <View marginBottom={spacing.$12}>
        <Text title="Payment Method" tracking="tight" weight="semibold" />
        <Text title="Add a new payment method to your account" size="sm" color="mutedForeground" />
      </View>
      <Input
        label="Name"
        placeholder="John Doe"
        keyboardType="default"
        autoCapitalize="none"
        autoComplete="name"
        autoCorrect={false}
        defaultValue=""
        editable={true}
        onChangeText={() => {}}
        submitBehavior="submit"
        onSubmitEditing={() => {}}
        returnKeyType="done"
        textContentType="name"
      />
      <Input
        label="City"
        placeholder="New York"
        keyboardType="default"
        autoCapitalize="none"
        autoComplete="address-line2"
        autoCorrect={false}
        defaultValue=""
        editable={true}
        onChangeText={() => {}}
        submitBehavior="submit"
        onSubmitEditing={() => {}}
        returnKeyType="done"
        textContentType="addressCity"
      />
      <Input
        label="Card number"
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        autoCapitalize="none"
        autoComplete="cc-number"
        autoCorrect={false}
        defaultValue=""
        editable={true}
        onChangeText={() => {}}
        submitBehavior="submit"
        onSubmitEditing={() => {}}
        returnKeyType="done"
        textContentType="creditCardNumber"
      />
      <View flexDirection="row" gap={spacing.$6}>
        <View flex={1}>
          <Input
            label="Expires"
            placeholder="Month"
            keyboardType="number-pad"
            autoComplete="cc-exp-month"
            editable={true}
            onChangeText={() => {}}
            defaultValue=""
            autoCorrect={false}
            autoCapitalize="none"
            submitBehavior="submit"
            onSubmitEditing={() => {}}
            returnKeyType="done"
            textContentType="creditCardExpirationMonth"
          />
        </View>
        <View flex={1}>
          <Input
            label="Year"
            placeholder="Year"
            keyboardType="number-pad"
            autoComplete="cc-exp-year"
            autoCorrect={false}
            editable={true}
            onChangeText={() => {}}
            defaultValue=""
            submitBehavior="submit"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="done"
            textContentType="creditCardExpirationYear"
          />
        </View>
        <View flex={1}>
          <Input
            label="CVC"
            placeholder="123"
            secureTextEntry
            keyboardType="number-pad"
            autoComplete="cc-csc"
            autoCorrect={false}
            defaultValue=""
            editable={true}
            onChangeText={() => {}}
            textContentType="creditCardSecurityCode"
            returnKeyType="done"
            onSubmitEditing={() => {}}
            submitBehavior="submit"
            autoCapitalize="none"
          />
        </View>
      </View>
      <Button title="Continue" onPress={() => {}} variant="primary" />
    </Card>
  );
};
