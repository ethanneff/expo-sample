import 'react-native-gesture-handler';
import RootStack from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });

export const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const initializeApp = useCallback(async () => {
    try {
      await Font.loadAsync({ ...Ionicons.font });
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
      <RootStack />
    </SafeAreaProvider>
  );
};
