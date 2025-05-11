import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { lazy } from 'react';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useAppTheme } from '~/theme/useAppTheme';

// Lazy load all screens
const DebugScreen = lazy(() => import('~/screens/DebugScreen/DebugScreen'));
const DetailsScreen = lazy(() => import('~/screens/DetailsScreen/DetailsScreen'));
const ForgotPasswordScreen = lazy(
  () => import('~/screens/ForgotPasswordScreen/ForgotPasswordScreen')
);
const HomeScreen = lazy(() => import('~/screens/HomeScreen/HomeScreen'));
const LandingScreen = lazy(() => import('~/screens/LandingScreen/LandingScreen'));
const ModalScreen = lazy(() => import('~/screens/ModalScreen/ModalScreen'));
const OverviewScreen = lazy(() => import('~/screens/OverviewScreen/OverviewScreen'));
const ProfileScreen = lazy(() => import('~/screens/ProfileScreen/ProfileScreen'));
const SignInScreen = lazy(() => import('~/screens/SignInScreen/SignInScreen'));
const SignUpScreen = lazy(() => import('~/screens/SignUpScreen/SignUpScreen'));
const SplashScreen = lazy(() => import('~/screens/SplashScreen/SplashScreen'));

const useAuth = () => useStoreAuth((state) => state.user !== null);
const useUnAuth = () => useStoreAuth((state) => state.user === null);

const Tabs = createBottomTabNavigator({
  options: { headerShown: false },
  screens: {
    Home: HomeScreen,
    Overview: OverviewScreen,
    Details: DetailsScreen,
    Profile: ProfileScreen,
  },
});

const RootStack = createNativeStackNavigator({
  groups: {
    Guest: {
      if: useUnAuth,
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

const RootNavigation = createStaticNavigation(RootStack);

export const Navigation = () => {
  const { colors, theme } = useAppTheme();
  const navigationTheme: Theme = {
    dark: theme === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.foreground,
      border: colors.border,
      notification: colors.destructive,
    },
    fonts: {
      regular: { fontFamily: 'Geist', fontWeight: '400' },
      medium: { fontFamily: 'Geist', fontWeight: '500' },
      bold: { fontFamily: 'Geist', fontWeight: '600' },
      heavy: { fontFamily: 'Geist', fontWeight: '700' },
    },
  };
  return <RootNavigation theme={navigationTheme} />;
};
