import { SafeAreaView } from 'react-native';

type ScreenProperties = {
  readonly children: React.ReactNode;
};

export const Screen = ({ children }: ScreenProperties) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};
