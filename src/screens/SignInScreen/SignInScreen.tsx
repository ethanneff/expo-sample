import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Input } from '~/components/Input/Input';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useAppTheme } from '~/theme/useAppTheme';

const SignInScreen = () => {
  const { spacing } = useAppTheme();
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Text title="Enter your details" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button
          title="Sign In"
          onPress={() =>
            login({ id: '1', name: 'John Doe', email: 'john.doe@example.com', token: '1234567890' })
          }
        />
        <Button title="Forgot Password" onPress={() => navigation.navigate('ForgotPassword')} />

        <View flexDirection="row" gap={spacing.$2}>
          <Icon name="logo-google" size={24} />
          <Button title=" Sign in with Google" onPress={() => {}} />
        </View>
        <View flexDirection="row" gap={spacing.$2}>
          <Icon name="logo-facebook" size={24} />
          <Button title="Sign in with Facebook" onPress={() => {}} />
        </View>
        <View flexDirection="row" gap={spacing.$2}>
          <Icon name="logo-apple" size={24} />
          <Button title="Sign in with Apple" onPress={() => {}} />
        </View>
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
