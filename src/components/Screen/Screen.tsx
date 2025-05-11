import { SafeAreaView, ScrollView } from 'react-native';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

export const Screen = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useAppTheme();

  return (
    <View backgroundColor={colors.background} flex={1}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
