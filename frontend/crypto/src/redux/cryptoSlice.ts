import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CryptoAsset } from '../types';
import { fetchCryptoData } from '../services/cryptoService';
import { sampleData } from '../data/sampleData';

interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  assets: sampleData, // Start with sample data
  loading: false,
  error: null,
};

export const fetchAssets = createAsyncThunk(
  'crypto/fetchAssets',
  async () => {
    try {
      const data = await fetchCryptoData();
      return data;
    } catch (error) {
      console.error('Error in fetchAssets:', error);
      return sampleData; // Return sample data on error
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets(state, action: PayloadAction<CryptoAsset[]>) {
      state.assets = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch crypto data';
        state.assets = sampleData; // Fallback to sample data
      });
  }
});

export const { updateAssets } = cryptoSlice.actions;
export default cryptoSlice.reducer; 