import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
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

  const handleDebug = useCallback(() => {
    navigation.navigate('Debug');
  }, [navigation]);

  const handleActionSheet = useCallback(() => {
    navigation.navigate('ActionSheet');
  }, [navigation]);

  const handleNps = useCallback(() => {
    navigation.navigate('SurveyNps');
  }, [navigation]);

  const handleCsat = useCallback(() => {
    navigation.navigate('SurveyCsat');
  }, [navigation]);

  const handleTemplate = useCallback(() => {
    navigation.navigate('Template');
  }, [navigation]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleLogoutAlert = useCallback(() => {
    Alert.alert(
      'Do you want to logout?',
      'This will clear your session and you will need to login again.',
      [
        {
          style: 'cancel',
          text: 'Cancel',
        },
        {
          onPress: handleLogout,
          text: 'Logout',
        },
      ]
    );
  }, [handleLogout]);

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <View gap={spacing.$16} padding={spacing.$16}>
          <Card>
            <View gap={spacing.$12}>
              <Text title="Navigation" variant="h1" />
              <Button onPress={handleDebug} title="Debug" variant="outline" />
              <Button onPress={handleActionSheet} title="ActionSheet" variant="outline" />
              <Button onPress={handleNps} title="NPS" variant="outline" />
              <Button onPress={handleCsat} title="CSAT" variant="outline" />
              <Button onPress={handleTemplate} title="Template" variant="outline" />
            </View>
          </Card>
          <Card>
            <View gap={spacing.$12}>
              <Text title="Settings" variant="h1" />
              <Button onPress={handleToggleTheme} title={`theme: ${theme}`} variant="outline" />
              <Button onPress={handleLogoutAlert} title={`user: ${user?.name}`} variant="outline" />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default HomeScreen;
