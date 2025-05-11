import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { useStoreAuth } from '~/store/useStoreAuth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const logout = useStoreAuth((state) => state.actions.logout);
  const user = useStoreAuth((state) => state.user);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Show Profile" onPress={() => navigation.navigate('Debug')} />
      <Text>{user?.name}</Text>
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
