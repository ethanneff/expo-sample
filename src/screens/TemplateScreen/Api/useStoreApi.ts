import { create } from 'zustand';

type ApiStore = {
  baseUrl:
    | 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v1'
    | 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v2';
  actions: {
    setBaseUrl: (baseUrl: ApiStore['baseUrl']) => void;
  };
};

export const useStoreApi = create<ApiStore>((set) => ({
  baseUrl: 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v1',
  actions: {
    setBaseUrl: (baseUrl: ApiStore['baseUrl']) => set({ baseUrl }),
  },
}));
