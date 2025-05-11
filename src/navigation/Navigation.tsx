import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useStoreAuth } from '~/store/useStoreAuth';

const Placeholder = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
      {children}
    </View>
  );
};

function HomeScreen() {
  const navigation = useNavigation();
  const login = useStoreAuth((state) => state.actions.login);
  const logout = useStoreAuth((state) => state.actions.logout);
  const user = useStoreAuth((state) => state.user);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Show Modal" onPress={() => navigation.navigate('Modal')} />
      <Button title="Show Profile" onPress={() => navigation.navigate('Debug')} />
      <Text>{user?.name}</Text>
      {user ? (
        <Button title="Logout" onPress={() => logout()} />
      ) : (
        <Button
          title="Login"
          onPress={() =>
            login({ id: '1', name: 'John Doe', email: 'john.doe@example.com', token: '1234567890' })
          }
        />
      )}
    </View>
  );
}
const DetailsScreen = () => <Placeholder title="Details Screen" />;
const DebugScreen = () => <Placeholder title="Debug Screen" />;
const OverviewScreen = () => <Placeholder title="Overview Screen" />;
const ModalScreen = () => <Placeholder title="Modal Screen" />;
const ProfileScreen = () => <Placeholder title="Profile Screen" />;
const ForgotPasswordScreen = () => <Placeholder title="Forgot Password Screen" />;
const SignUpScreen = () => <Placeholder title="Sign Up Screen" />;

const SignInScreen = () => {
  const login = useStoreAuth((state) => state.actions.login);
  return (
    <Placeholder title="Sign In Screen">
      <Button
        title="Login"
        onPress={() => {
          login({ id: '1', name: 'John Doe', email: 'john.doe@example.com', token: '1234567890' });
        }}
      />
    </Placeholder>
  );
};

const SplashScreen = () => {
  const navigation = useNavigation();
  const user = useStoreAuth((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(user ? 'Tabs' : 'Landing');
    }, 1000);
  }, [navigation, user]);
  return <Placeholder title="Splash Screen" />;
};

const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <Placeholder title="Landing Screen">
      <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
    </Placeholder>
  );
};

const Tabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  options: {
    headerShown: false,
  },
  screens: {
    Home: HomeScreen,
    Overview: OverviewScreen,
    Details: DetailsScreen,
    Profile: ProfileScreen,
  },
});

const useAuth = () => {
  const user = useStoreAuth((state) => state.user);
  return !!user;
};

const useUnAuth = () => {
  const user = useStoreAuth((state) => state.user);
  return !user;
};

const RootStack = createNativeStackNavigator({
  groups: {
    Guest: {
      if: useUnAuth,
      screenOptions: { headerShown: false },
      screens: {
        Splash: SplashScreen,
        Landing: LandingScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        ForgotPassword: ForgotPasswordScreen,
      },
    },
    User: {
      if: useAuth,
      screens: {
        Splash: SplashScreen,
        Tabs: Tabs,
      },
      screenOptions: { headerShown: false },
    },
    Modal: {
      screens: {
        Debug: DebugScreen,
        Modal: ModalScreen,
      },
      screenOptions: { presentation: 'modal' },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const Navigation = createStaticNavigation(RootStack);
