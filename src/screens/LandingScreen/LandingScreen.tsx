import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Icon } from '~/components/Icon/Icon';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { useAppTheme } from '~/theme/useAppTheme';

const LandingScreen = () => {
  const navigation = useNavigation();
  const { spacing, colors } = useAppTheme();

  return (
    <Screen>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: spacing.$12,
        }}>
        <Icon name="trophy-outline" size={100} color={colors.primary} />
        <Text title="Duolingo" />
        <Text title="Learn for free. Forever." />
      </KeyboardAwareScrollView>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Onboarding')}
        variant="primary"
      />
      <Button
        title="I already have an account"
        onPress={() => navigation.navigate('SignIn')}
        variant="secondary"
      />
    </Screen>
  );
};

export default LandingScreen;
