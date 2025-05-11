import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation/Navigation';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

const fonts = {
  ...Ionicons.font,
  ...(Platform.OS === 'web'
    ? {
        'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
        'Geist-Medium': require('../assets/fonts/Geist-Medium.ttf'),
        'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
        'Geist-SemiBold': require('../assets/fonts/Geist-SemiBold.ttf'),
        'Geist-Light': require('../assets/fonts/Geist-Light.ttf'),
        'GeistMono-Bold': require('../assets/fonts/GeistMono-Bold.ttf'),
        'GeistMono-Regular': require('../assets/fonts/GeistMono-Regular.ttf'),
      }
    : {}),
};

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const initializeApp = useCallback(async () => {
    try {
      await Font.loadAsync(fonts);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }, []);

  const handleLayout = useCallback(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!appIsReady) return null;

  return (
    <SafeAreaProvider onLayout={handleLayout}>
      <Navigation />
    </SafeAreaProvider>
  );
};
