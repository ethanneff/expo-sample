import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

type Key = 'auth';

type PersistStoreProperties<T> = {
  key: Key;
  partialize: (state: T) => Partial<T>;
  version?: number;
};

export const getPersistedStore = <T>({
  key,
  partialize,
  version = 4,
}: PersistStoreProperties<T>) => ({
  name: key,
  partialize,
  storage: createJSONStorage(() => AsyncStorage),
  version,
});
