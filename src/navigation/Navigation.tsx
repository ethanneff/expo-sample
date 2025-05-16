import { FontAwesome6 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ActivityIndicator } from 'react-native';
import DebugScreen from '~/screens/DebugScreen/DebugScreen';
import DetailsScreen from '~/screens/DetailsScreen/DetailsScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import HomeScreen from '~/screens/HomeScreen/HomeScreen';
import LandingScreen from '~/screens/LandingScreen/LandingScreen';
import OverviewScreen from '~/screens/OverviewScreen/OverviewScreen';
import ProfileScreen from '~/screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import SignInScreen from '~/screens/SignInScreen/SignInScreen';
import SignUpScreen from '~/screens/SignUpScreen/SignUpScreen';
import SplashScreen from '~/screens/SplashScreen/SplashScreen';
import { SurveyCsatScreen } from '~/screens/SurveyCsatScreen/SurveyCsatScreen';
import { SurveyNpsScreen } from '~/screens/SurveyNpsScreen/SurveyNpsScreen';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useAppTheme } from '~/theme/useAppTheme';

// Lazy load all screens (does not work on web)

const useAuth = () => useStoreAuth((state) => state.user !== null);
const useUnAuth = () => useStoreAuth((state) => state.user === null);

const getTabBarIcon =
  (icon: string) =>
  ({ color, size }: { color: string; size: number }) => (
    <FontAwesome6 name={icon} size={size - 8} color={color} />
  );

const Tabs = createBottomTabNavigator({
  options: { headerShown: false },
  screens: {
    Home: { screen: HomeScreen, options: { tabBarIcon: getTabBarIcon('house') } },
    Overview: { screen: OverviewScreen, options: { tabBarIcon: getTabBarIcon('chart-line') } },
    Details: { screen: DetailsScreen, options: { tabBarIcon: getTabBarIcon('list') } },
    Profile: { screen: ProfileScreen, options: { tabBarIcon: getTabBarIcon('user') } },
    Settings: { screen: SettingsScreen, options: { tabBarIcon: getTabBarIcon('gear') } },
  },
});

const RootStack = createNativeStackNavigator({
  screenLayout: ({ children }) => (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<ActivityIndicator />}>{children}</Suspense>
    </ErrorBoundary>
  ),
  groups: {
    Guest: {
      if: useUnAuth,
      screens: {
        Splash: SplashScreen,
        Landing: {
          screen: LandingScreen,
          options: {
            headerBackVisible: false,
          },
        },
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        ForgotPassword: ForgotPasswordScreen,
      },
    },
    User: {
      if: useAuth,
      screens: {
        Splash: SplashScreen,
        Tabs: {
          screen: Tabs,
          options: { headerBackVisible: false },
        },
      },
      screenOptions: { headerShown: false },
    },
    Modal: {
      screens: {
        Debug: DebugScreen,
        SurveyNps: SurveyNpsScreen,
        SurveyCsat: SurveyCsatScreen,
      },
      screenOptions: { presentation: 'modal' },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
      regular: { fontFamily: 'Geist-Regular', fontWeight: '400' },
      medium: { fontFamily: 'Geist-Medium', fontWeight: '500' },
      bold: { fontFamily: 'Geist-SemiBold', fontWeight: '600' },
      heavy: { fontFamily: 'Geist-Bold', fontWeight: '700' },
    },
  };

  return <RootNavigation theme={navigationTheme} />;
};
