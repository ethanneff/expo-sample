import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '~/components/Loader/Loader';
import { Text } from '~/components/Text/Text';
import { getTabBarIcon } from '~/navigation/getTabBarIcon';
import { useNavTheme } from '~/navigation/useNavTheme';
import ActionSheetScreen from '~/screens/ActionSheetScreen/ActionSheetScreen';
import DebugScreen from '~/screens/DebugScreen/DebugScreen';
import DetailsScreen from '~/screens/DetailsScreen/DetailsScreen';
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen/ForgotPasswordScreen';
import GameBejeweled from '~/screens/GamesScreen/Games/GameBejeweled';
import GameFlappyBird from '~/screens/GamesScreen/Games/GameFlappyBird';
import GameOfLife from '~/screens/GamesScreen/Games/GameOfLife';
import GamePapiJump from '~/screens/GamesScreen/Games/GamePapiJump';
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
import TemplateScreen from '~/screens/TemplateScreen/TemplateScreen';
import TermsScreen from '~/screens/TermsScreen/TermsScreen';
import { useStoreAuth } from '~/store/useStoreAuth';

// Lazy load all screens (does not work on web)

const useAuth = () => useStoreAuth((state) => state.user !== null);
const useUnAuth = () => useStoreAuth((state) => state.user === null);

const Tabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  options: { headerShown: false },
  screens: {
    Details: { options: { tabBarIcon: getTabBarIcon('list') }, screen: DetailsScreen },
    Games: { options: { tabBarIcon: getTabBarIcon('game-controller') }, screen: GamesScreen },
    Home: { options: { tabBarIcon: getTabBarIcon('home') }, screen: HomeScreen },
    Overview: { options: { tabBarIcon: getTabBarIcon('bar-chart') }, screen: OverviewScreen },
    Profile: { options: { tabBarIcon: getTabBarIcon('person') }, screen: ProfileScreen },
    Settings: { options: { tabBarIcon: getTabBarIcon('cog') }, screen: SettingsScreen },
  },
});

export const RootStack = createNativeStackNavigator({
  groups: {
    ActionSheets: {
      screenOptions: {
        presentation: 'formSheet',
        sheetAllowedDetents: [0.25, 0.75],
        sheetCornerRadius: 16,
        sheetExpandsWhenScrolledToEdge: false,
        sheetGrabberVisible: true,
      } as NativeStackNavigationOptions,
      screens: {
        ActionSheet: ActionSheetScreen,
      },
    },
    Guest: {
      if: useUnAuth,
      screens: {
        ForgotPassword: ForgotPasswordScreen,
        Landing: { options: { headerBackVisible: false }, screen: LandingScreen },
        Onboarding: OnboardingScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        Splash: SplashScreen,
      },
    },
    Modals: {
      screenOptions: { presentation: 'modal' },
      screens: {
        Debug: DebugScreen,
        GameBejeweled,
        GameFlappyBird,
        GameOfLife,
        GamePapiJump,
        GameTicTacToe,
        PrivacyPolicy: PrivacyPolicyScreen,
        SurveyCsat: SurveyCsatScreen,
        SurveyNps: SurveyNpsScreen,
        Template: {
          options: { headerShown: false },
          screen: TemplateScreen,
        },
        Terms: TermsScreen,
      },
    },
    User: {
      if: useAuth,
      initialRouteName: 'Tabs',
      screenOptions: { headerShown: false },
      screens: {
        Splash: SplashScreen,
        Tabs: {
          options: { headerBackVisible: false },
          screen: Tabs,
        },
      },
    },
  },
  initialRouteName: 'Splash',
  screenLayout: ({ children }) => (
    <ErrorBoundary fallback={<Text title="Something went wrong" />}>
      <Suspense fallback={<Loader color="primary" visible />}>{children}</Suspense>
    </ErrorBoundary>
  ),
});

const RootNavigation = createStaticNavigation(RootStack);

export const Navigation = () => {
  const navigationTheme = useNavTheme();

  return <RootNavigation theme={navigationTheme} />;
};
