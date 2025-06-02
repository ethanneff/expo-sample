import { useCallback, useRef } from 'react';
import { TextInput } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

export const CardPayment = () => {
  const { spacing } = useAppTheme();
  const nameRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const cardNumberRef = useRef<TextInput>(null);
  const expiresRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);
  const cvcRef = useRef<TextInput>(null);

  const handleInputSubmit = useCallback(
    (type: 'name' | 'city' | 'cardNumber' | 'expires' | 'year' | 'cvc') => () => {
      switch (type) {
        case 'name':
          cityRef.current?.focus();
          break;
        case 'city':
          cardNumberRef.current?.focus();
          break;
        case 'cardNumber':
          expiresRef.current?.focus();
          break;
        case 'expires':
          yearRef.current?.focus();
          break;
        case 'year':
          cvcRef.current?.focus();
          break;
        case 'cvc':
          cvcRef.current?.blur();
          break;
      }
    },
    []
  );

  return (
    <Card>
      <View marginBottom={spacing.$12}>
        <Text title="Upgrade your subscription" tracking="tight" weight="semibold" />
        <Text
          title="You are currently on the free plan. Upgrade to the pro plan to get access to all features."
          size="sm"
          color="mutedForeground"
        />
      </View>
      <Input
        label="Name"
        placeholder="John Doe"
        keyboardType="default"
        autoCapitalize="none"
        autoComplete="name"
        autoCorrect={false}
        defaultValue=""
        ref={nameRef}
        editable={true}
        onChangeText={noop}
        submitBehavior="submit"
        onSubmitEditing={handleInputSubmit('name')}
        returnKeyType="next"
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
        ref={cityRef}
        editable={true}
        onChangeText={noop}
        submitBehavior="submit"
        onSubmitEditing={handleInputSubmit('city')}
        returnKeyType="next"
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
        ref={cardNumberRef}
        editable={true}
        onChangeText={noop}
        submitBehavior="submit"
        onSubmitEditing={handleInputSubmit('cardNumber')}
        returnKeyType="next"
        textContentType="creditCardNumber"
      />
      <View flexDirection="row" gap={spacing.$6}>
        <View flex={1}>
          <Input
            label="Expires"
            placeholder="Month"
            keyboardType="number-pad"
            autoComplete="cc-exp-month"
            ref={expiresRef}
            editable={true}
            onChangeText={noop}
            defaultValue=""
            autoCorrect={false}
            autoCapitalize="none"
            submitBehavior="submit"
            onSubmitEditing={handleInputSubmit('expires')}
            returnKeyType="next"
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
            onChangeText={noop}
            defaultValue=""
            ref={yearRef}
            submitBehavior="submit"
            autoCapitalize="none"
            onSubmitEditing={handleInputSubmit('year')}
            returnKeyType="next"
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
            onChangeText={noop}
            ref={cvcRef}
            textContentType="creditCardSecurityCode"
            returnKeyType="next"
            onSubmitEditing={handleInputSubmit('cvc')}
            submitBehavior="submit"
            autoCapitalize="none"
          />
        </View>
      </View>
      <Button title="Continue" onPress={() => {}} variant="primary" />
    </Card>
  );
};
