import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Button } from '~/components/Button/Button';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const TermsScreen = () => {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Placeholder title="Terms of Service">
      <Button onPress={handlePress} title="Back" variant="outline" />
    </Placeholder>
  );
};

export default TermsScreen;
