import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  setLoading: () => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  loading: false,
  setLoading: () => set((state) => ({ loading: !state.loading })),
}));

export default useLoadingStore;
