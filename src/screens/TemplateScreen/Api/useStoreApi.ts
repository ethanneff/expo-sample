import { create } from 'zustand';

type ApiStore = {
  actions: {
    setBaseUrl: (baseUrl: ApiStore['baseUrl']) => void;
  };
  baseUrl:
    | 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v1'
    | 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v2';
};

export const useStoreApi = create<ApiStore>((set) => ({
  actions: {
    setBaseUrl: (baseUrl: ApiStore['baseUrl']) => {
      set({ baseUrl });
    },
  },
  baseUrl: 'https://67a180825bcfff4fabe290fd.mockapi.io/api/v1',
}));
