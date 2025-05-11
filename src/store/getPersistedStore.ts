import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

type Key = 'auth';

type PersistStoreProps<T> = {
  key: Key;
  version?: number;
  partialize: (state: T) => Partial<T>;
};

export const getPersistedStore = <T>({ key, version = 4, partialize }: PersistStoreProps<T>) => ({
  name: key,
  version,
  partialize,
  storage: createJSONStorage(() => AsyncStorage),
});
