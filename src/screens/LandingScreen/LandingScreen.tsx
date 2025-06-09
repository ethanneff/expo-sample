import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { useAppTheme } from '~/theme/useAppTheme';

const LandingScreen = () => {
  const navigation = useNavigation();
  const { colors, spacing } = useAppTheme();

  const handleGetStarted = useCallback(() => {
    navigation.navigate('Onboarding');
  }, [navigation]);

  const handleSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  return (
    <Screen>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
          gap: spacing.$12,
          justifyContent: 'center',
        }}>
        <Icon color={colors.primary} name="trophy-outline" size={100} />
        <Text title="Duolingo" />
        <Text title="Learn for free. Forever." />
      </KeyboardAwareScrollView>
      <Button onPress={handleGetStarted} title="Get Started" variant="primary" />
      <Button onPress={handleSignIn} title="I already have an account" variant="secondary" />
    </Screen>
  );
};

export default LandingScreen;
