import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Placeholder } from '~/components/Placeholder/Placeholder';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <Placeholder title="Privacy Policy">
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </Placeholder>
  );
};

export default PrivacyPolicyScreen;
