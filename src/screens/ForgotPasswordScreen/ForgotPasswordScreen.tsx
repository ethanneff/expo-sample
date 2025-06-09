import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Button } from '~/components/Button/Button';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Placeholder title="Forgot Password Screen">
      <Button onPress={handleBack} title="Back to Sign In" variant="primary" />
    </Placeholder>
  );
};

export default ForgotPasswordScreen;
