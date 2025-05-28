import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useStoreTheme } from '~/store/useStoreTheme';
import { useAppTheme } from '~/theme/useAppTheme';

const HomeScreen = () => {
  const { spacing } = useAppTheme();
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const logout = useStoreAuth((state) => state.actions.logout);
  const user = useStoreAuth((state) => state.user);
  const toggleTheme = useStoreTheme((state) => state.actions.toggleTheme);
  const theme = useStoreTheme((state) => state.theme);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View padding={spacing.$12} gap={spacing.$12}>
          <Card>
            <Text title="Navigation" size="4xl" weight="light" />
            <View alignSelf="center">
              <Button title="Debug" onPress={() => navigation.navigate('Debug')} />
              <Button title="ActionSheet" onPress={() => navigation.navigate('ActionSheet')} />
              <Button title="NPS" onPress={() => navigation.navigate('SurveyNps')} />
              <Button title="CSAT" onPress={() => navigation.navigate('SurveyCsat')} />
            </View>
          </Card>
          <Card>
            <Text title="Settings" size="4xl" weight="light" />

            <Button title={`theme: ${theme}`} onPress={() => toggleTheme()} />
            <Button
              title={`user: ${user?.name}`}
              onPress={() => {
                Alert.alert(
                  'Do you want to logout?',
                  'This will clear your session and you will need to login again.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    { text: 'Logout', onPress: () => logout() },
                  ]
                );
              }}
            />
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default HomeScreen;
