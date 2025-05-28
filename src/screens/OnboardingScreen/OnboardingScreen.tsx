import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Placeholder title="Onboarding Screen">
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      />
    </Placeholder>
  );
};

export default OnboardingScreen;
