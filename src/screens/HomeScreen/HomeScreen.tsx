import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useStoreTheme } from '~/store/useStoreTheme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const logout = useStoreAuth((state) => state.actions.logout);
  const user = useStoreAuth((state) => state.user);
  const toggleTheme = useStoreTheme((state) => state.actions.toggleTheme);
  const theme = useStoreTheme((state) => state.theme);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Show Profile" onPress={() => navigation.navigate('Debug')} />
      <Text>{user?.name}</Text>
      <Button title={theme} onPress={() => toggleTheme()} />
      {user ? (
        <Button title="Logout" onPress={() => logout()} />
      ) : (
        <Button
          title="Login"
          onPress={() => {
            login({
              id: '1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              token: '1234567890',
            });
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
