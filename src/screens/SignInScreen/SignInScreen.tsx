import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useStoreAuth } from '~/store/useStoreAuth';

const SignInScreen = () => {
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    login({ id: '1', name: 'John Doe', email: 'john.doe@example.com', token: '1234567890' });
  };

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Text title="Enter your details" />
        <Input
          defaultValue={email}
          editable={true}
          onChangeText={setEmail}
          submitBehavior="submit"
          textContentType="emailAddress"
          ref={emailRef}
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
        />
        <Input
          defaultValue={password}
          editable={true}
          onChangeText={setPassword}
          submitBehavior="submit"
          ref={passwordRef}
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          keyboardType="visible-password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleSignIn}
          textContentType="password"
        />
        <Button title="Sign In" onPress={handleSignIn} variant="primary" fitContent />
        <Button
          title="Forgot Password"
          onPress={() => navigation.navigate('ForgotPassword')}
          variant="outline"
          fitContent
        />

        <Button
          title="Sign in with Google"
          onPress={() => {}}
          variant="outline"
          icon="logo-google"
          fitContent
        />

        <Button
          title="Sign in with Facebook"
          onPress={() => {}}
          variant="outline"
          icon="logo-facebook"
          fitContent
        />
        <Button
          title="Sign in with Apple"
          onPress={() => {}}
          variant="outline"
          icon="logo-apple"
          fitContent
        />
        <View flexDirection="row" flexWrap="wrap">
          <Text title="By signing in to Duolingo, you agree to our " />
          <Pressable onPress={() => navigation.navigate('Terms')}>
            <Text title="Terms" weight="bold" />
          </Pressable>
          <Text title=" and " />
          <Pressable onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text title="Privacy Policy" weight="bold" />
          </Pressable>
          <Text title="." />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default SignInScreen;
