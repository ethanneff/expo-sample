import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation, StaticParamList, Theme } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ActivityIndicator } from 'react-native';
import { Icon, IconName } from '~/components/Icon/Icon';
import ActionSheetScreen from '~/screens/ActionSheetScreen/ActionSheetScreen';
import DebugScreen from '~/screens/DebugScreen/DebugScreen';
import DetailsScreen from '~/screens/DetailsScreen/DetailsScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import GameOfLife from '~/screens/GamesScreen/Games/GameOfLife';
import GameTicTacToe from '~/screens/GamesScreen/Games/GameTicTacToe';
import GamesScreen from '~/screens/GamesScreen/GamesScreen';
import HomeScreen from '~/screens/HomeScreen/HomeScreen';
import LandingScreen from '~/screens/LandingScreen/LandingScreen';
import OnboardingScreen from '~/screens/OnboardingScreen/OnboardingScreen';
import OverviewScreen from '~/screens/OverviewScreen/OverviewScreen';
import PrivacyPolicyScreen from '~/screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import ProfileScreen from '~/screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import SignInScreen from '~/screens/SignInScreen/SignInScreen';
import SignUpScreen from '~/screens/SignUpScreen/SignUpScreen';
import SplashScreen from '~/screens/SplashScreen/SplashScreen';
import { SurveyCsatScreen } from '~/screens/SurveyCsatScreen/SurveyCsatScreen';
import { SurveyNpsScreen } from '~/screens/SurveyNpsScreen/SurveyNpsScreen';
import TermsScreen from '~/screens/TermsScreen/TermsScreen';
import { useStoreAuth } from '~/store/useStoreAuth';
import { useAppTheme } from '~/theme/useAppTheme';

// Lazy load all screens (does not work on web)

const useAuth = () => useStoreAuth((state) => state.user !== null);
const useUnAuth = () => useStoreAuth((state) => state.user === null);

const getTabBarIcon =
  (icon: IconName) =>
  ({ color, size }: { color: string; size: number }) => (
    <Icon name={icon} size={size - 8} color={color} />
  );

const Tabs = createBottomTabNavigator({
  options: { headerShown: false },
  screens: {
    Home: { screen: HomeScreen, options: { tabBarIcon: getTabBarIcon('home') } },
    Overview: { screen: OverviewScreen, options: { tabBarIcon: getTabBarIcon('bar-chart') } },
    Details: { screen: DetailsScreen, options: { tabBarIcon: getTabBarIcon('list') } },
    Profile: { screen: ProfileScreen, options: { tabBarIcon: getTabBarIcon('person') } },
    Settings: { screen: SettingsScreen, options: { tabBarIcon: getTabBarIcon('cog') } },
    Games: { screen: GamesScreen, options: { tabBarIcon: getTabBarIcon('game-controller') } },
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
        Onboarding: OnboardingScreen,
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
    Modals: {
      screens: {
        Debug: DebugScreen,
        SurveyNps: SurveyNpsScreen,
        SurveyCsat: SurveyCsatScreen,
        Terms: TermsScreen,
        PrivacyPolicy: PrivacyPolicyScreen,
        GameTicTacToe: GameTicTacToe,
        GameOfLife: GameOfLife,
      },
      screenOptions: { presentation: 'modal' },
    },
    ActionSheets: {
      screens: {
        ActionSheet: ActionSheetScreen,
      },
      screenOptions: {
        presentation: 'formSheet',
        sheetExpandsWhenScrolledToEdge: false,
        sheetCornerRadius: 16,
        sheetGrabberVisible: true,
        sheetAllowedDetents: [0.25, 0.75],
      } as NativeStackNavigationOptions,
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

export type Route = keyof RootStackParamList;

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
