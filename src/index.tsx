import 'react-native-get-random-values';
// first
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';
import { Navigation } from './navigation/Navigation';

void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });
// if (__DEV__) require('./utils/reactotron');

const fonts = {
  ...Ionicons.font,
  ...(Platform.OS === 'web'
    ? {
        'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
        'Geist-ExtraBold': require('../assets/fonts/Geist-ExtraBold.ttf'),
        'Geist-Light': require('../assets/fonts/Geist-Light.ttf'),
        'Geist-Medium': require('../assets/fonts/Geist-Medium.ttf'),
        'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
        'Geist-SemiBold': require('../assets/fonts/Geist-SemiBold.ttf'),
        'GeistMono-Bold': require('../assets/fonts/GeistMono-Bold.ttf'),
        'GeistMono-Regular': require('../assets/fonts/GeistMono-Regular.ttf'),
      }
    : {}),
};

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { colors } = useAppTheme();

  const initializeApp = useCallback(async () => {
    try {
      await Font.loadAsync(fonts);
    } catch (error) {
      console.warn(error);
    } finally {
      setAppIsReady(true);
    }
  }, []);

  const handleLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    void initializeApp();
  }, [initializeApp]);

  if (!appIsReady) return null;

  return (
    <View backgroundColor={colors.background} flex={1}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider
          onLayout={handleLayout}
          style={{
            alignSelf: 'center',
            borderColor: colors.border,
            borderWidth: 1,
            maxWidth: 1280,
            width: '100%',
          }}>
          <KeyboardProvider>
            <Navigation />
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
};
