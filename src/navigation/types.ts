import { type StaticParamList } from '@react-navigation/native';
import { type RootStack } from '~/navigation/Navigation';

export type Route = keyof StaticParamList<typeof RootStack>;

// eslint-disable-next-line unicorn/prevent-abbreviations
type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line unicorn/prevent-abbreviations, @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions
    interface RootParamList extends RootStackParamList {}
  }
}
