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

  const logout = useStoreAuth((state) => state.actions.logout);
  const user = useStoreAuth((state) => state.user);
  const toggleTheme = useStoreTheme((state) => state.actions.toggleTheme);
  const theme = useStoreTheme((state) => state.theme);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View padding={spacing.$12} gap={spacing.$12}>
          <Card>
            <Text title="Navigation" variant="h1" />
            <View gap={spacing.$8}>
              <Button
                title="Debug"
                onPress={() => navigation.navigate('Debug')}
                variant="outline"
              />
              <Button
                title="ActionSheet"
                onPress={() => navigation.navigate('ActionSheet')}
                variant="outline"
              />
              <Button
                title="NPS"
                onPress={() => navigation.navigate('SurveyNps')}
                variant="outline"
              />
              <Button
                title="CSAT"
                onPress={() => navigation.navigate('SurveyCsat')}
                variant="outline"
              />
              <Button
                title="Template"
                onPress={() => navigation.navigate('Template')}
                variant="outline"
              />
            </View>
          </Card>
          <Card>
            <Text title="Settings" variant="h1" />
            <View gap={spacing.$8}>
              <Button title={`theme: ${theme}`} onPress={() => toggleTheme()} variant="outline" />
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
                variant="outline"
              />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default HomeScreen;
