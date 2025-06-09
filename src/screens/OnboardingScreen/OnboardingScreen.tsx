import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Button } from '~/components/Button/Button';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Placeholder title="Onboarding Screen">
      <Button onPress={handleSignUp} title="Sign Up" variant="primary" />
    </Placeholder>
  );
};

export default OnboardingScreen;
