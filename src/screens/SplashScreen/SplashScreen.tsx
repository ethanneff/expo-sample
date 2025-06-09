import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Placeholder } from '~/components/Placeholder/Placeholder';
import { useStoreAuth } from '~/store/useStoreAuth';

const SplashScreen = () => {
  const navigation = useNavigation();
  const user = useStoreAuth((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate(user ? 'Tabs' : 'Landing');
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation, user]);

  return <Placeholder title="Splash Screen" />;
};

export default SplashScreen;
