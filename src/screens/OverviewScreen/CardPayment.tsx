import { useCallback, useRef } from 'react';
import { type TextInput } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

export const CardPayment = () => {
  const { spacing } = useAppTheme();
  const nameReference = useRef<TextInput>(null);
  const cityReference = useRef<TextInput>(null);
  const cardNumberReference = useRef<TextInput>(null);
  const expiresReference = useRef<TextInput>(null);
  const yearReference = useRef<TextInput>(null);
  const cvcReference = useRef<TextInput>(null);

  const handleInputSubmit = useCallback(
    (type: 'cardNumber' | 'city' | 'cvc' | 'expires' | 'name' | 'year') => () => {
      switch (type) {
        case 'cardNumber': {
          expiresReference.current?.focus();
          break;
        }
        case 'city': {
          cardNumberReference.current?.focus();
          break;
        }
        case 'cvc': {
          cvcReference.current?.blur();
          break;
        }
        case 'expires': {
          yearReference.current?.focus();
          break;
        }
        case 'name': {
          cityReference.current?.focus();
          break;
        }
        case 'year': {
          cvcReference.current?.focus();
          break;
        }
      }
    },
    []
  );

  return (
    <Card>
      <View marginBottom={spacing.$12}>
        <Text title="Upgrade your subscription" variant="h3" />
        <Text
          title="You are currently on the free plan. Upgrade to the pro plan to get access to all features."
          variant="muted"
        />
      </View>
      <Input
        autoCapitalize="none"
        autoComplete="name"
        autoCorrect={false}
        defaultValue=""
        editable
        keyboardType="default"
        label="Name"
        onChangeText={noop}
        onSubmitEditing={handleInputSubmit('name')}
        placeholder="John Doe"
        ref={nameReference}
        returnKeyType="next"
        submitBehavior="submit"
        textContentType="name"
      />
      <Input
        autoCapitalize="none"
        autoComplete="address-line2"
        autoCorrect={false}
        defaultValue=""
        editable
        keyboardType="default"
        label="City"
        onChangeText={noop}
        onSubmitEditing={handleInputSubmit('city')}
        placeholder="New York"
        ref={cityReference}
        returnKeyType="next"
        submitBehavior="submit"
        textContentType="addressCity"
      />
      <Input
        autoCapitalize="none"
        autoComplete="cc-number"
        autoCorrect={false}
        defaultValue=""
        editable
        keyboardType="number-pad"
        label="Card number"
        onChangeText={noop}
        onSubmitEditing={handleInputSubmit('cardNumber')}
        placeholder="1234 5678 9012 3456"
        ref={cardNumberReference}
        returnKeyType="next"
        submitBehavior="submit"
        textContentType="creditCardNumber"
      />
      <View flexDirection="row" gap={spacing.$6}>
        <View flex={1}>
          <Input
            autoCapitalize="none"
            autoComplete="cc-exp-month"
            autoCorrect={false}
            defaultValue=""
            editable
            keyboardType="number-pad"
            label="Expires"
            onChangeText={noop}
            onSubmitEditing={handleInputSubmit('expires')}
            placeholder="Month"
            ref={expiresReference}
            returnKeyType="next"
            submitBehavior="submit"
            textContentType="creditCardExpirationMonth"
          />
        </View>
        <View flex={1}>
          <Input
            autoCapitalize="none"
            autoComplete="cc-exp-year"
            autoCorrect={false}
            defaultValue=""
            editable
            keyboardType="number-pad"
            label="Year"
            onChangeText={noop}
            onSubmitEditing={handleInputSubmit('year')}
            placeholder="Year"
            ref={yearReference}
            returnKeyType="next"
            submitBehavior="submit"
            textContentType="creditCardExpirationYear"
          />
        </View>
        <View flex={1}>
          <Input
            autoCapitalize="none"
            autoComplete="cc-csc"
            autoCorrect={false}
            defaultValue=""
            editable
            keyboardType="number-pad"
            label="CVC"
            onChangeText={noop}
            onSubmitEditing={handleInputSubmit('cvc')}
            placeholder="123"
            ref={cvcReference}
            returnKeyType="next"
            secureTextEntry
            submitBehavior="submit"
            textContentType="creditCardSecurityCode"
          />
        </View>
      </View>
      <Button onPress={() => {}} title="Continue" variant="primary" />
    </Card>
  );
};
