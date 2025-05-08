import type { RootState } from './store';

export const selectAssets = (state: RootState) => state.crypto.assets;
export const selectLoading = (state: RootState) => state.crypto.loading;
export const selectError = (state: RootState) => state.crypto.error; 