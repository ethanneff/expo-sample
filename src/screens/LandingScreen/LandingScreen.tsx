import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Placeholder } from '~/components/Placeholder/Placeholder';
import { Text } from '~/components/Text/Text';
import { useStoreTheme } from '~/store/useStoreTheme';

const LandingScreen = () => {
  const navigation = useNavigation();

  const toggleTheme = useStoreTheme((state) => state.actions.toggleTheme);
  const theme = useStoreTheme((state) => state.theme);

  return (
    <Placeholder title="Landing Screen">
      <Text
        title={`Theme: ${theme}`}
        color="chart1"
        size="lg"
        family="Geist"
        weight="medium"
        align="center"
      />
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </Placeholder>
  );
};

export default LandingScreen;
