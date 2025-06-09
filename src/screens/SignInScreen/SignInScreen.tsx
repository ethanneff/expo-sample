import { useNavigation } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Input, type InputReference } from '~/components/Input/Input';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useStoreAuth } from '~/store/useStoreAuth';

const noop = () => false;

const SignInScreen = () => {
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const emailReference = useRef<InputReference>(null);
  const passwordReference = useRef<InputReference>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = useCallback(() => {
    login({ email: 'john.doe@example.com', id: '1', name: 'John Doe', token: '1234567890' });
  }, [login]);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);

  const handleTerms = useCallback(() => {
    navigation.navigate('Terms');
  }, [navigation]);

  const handlePrivacyPolicy = useCallback(() => {
    navigation.navigate('PrivacyPolicy');
  }, [navigation]);

  const handleSubmitEditingEmail = useCallback(() => {
    passwordReference.current?.focus();
  }, []);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Text title="Enter your details" />
        <Input
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          defaultValue={email}
          editable
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={handleSubmitEditingEmail}
          placeholder="Email"
          ref={emailReference}
          returnKeyType="next"
          submitBehavior="submit"
          textContentType="emailAddress"
        />
        <Input
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          defaultValue={password}
          editable
          keyboardType="visible-password"
          onChangeText={setPassword}
          onSubmitEditing={handleSignIn}
          placeholder="Password"
          ref={passwordReference}
          returnKeyType="done"
          secureTextEntry
          submitBehavior="submit"
          textContentType="password"
        />
        <Button fitContent onPress={handleSignIn} title="Sign In" variant="primary" />
        <Button
          fitContent
          onPress={handleForgotPassword}
          title="Forgot Password"
          variant="outline"
        />
        <Button
          fitContent
          icon="logo-google"
          onPress={noop}
          title="Sign in with Google"
          variant="outline"
        />
        <Button
          fitContent
          icon="logo-facebook"
          onPress={noop}
          title="Sign in with Facebook"
          variant="outline"
        />
        <Button
          fitContent
          icon="logo-apple"
          onPress={noop}
          title="Sign in with Apple"
          variant="outline"
        />
        <View flexDirection="row" flexWrap="wrap">
          <Text title="By signing in to Duolingo, you agree to our " />
          <Pressable onPress={handleTerms}>
            <Text fontFamily="Geist-Bold" title="Terms" />
          </Pressable>
          <Text title=" and " />
          <Pressable onPress={handlePrivacyPolicy}>
            <Text fontFamily="Geist-Bold" title="Privacy Policy" />
          </Pressable>
          <Text title="." />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default SignInScreen;
