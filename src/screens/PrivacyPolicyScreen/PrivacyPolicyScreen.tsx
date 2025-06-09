import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Button } from '~/components/Button/Button';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const handlePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <Placeholder title="Privacy Policy">
      <Button onPress={handlePress} title="Back" variant="outline" />
    </Placeholder>
  );
};

export default PrivacyPolicyScreen;
