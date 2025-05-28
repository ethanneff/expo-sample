import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const TermsScreen = () => {
  const navigation = useNavigation();
  return (
    <Placeholder title="Terms of Service">
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Placeholder>
  );
};

export default TermsScreen;
