import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const cryptoThunk = createAsyncThunk('cryptoinfo/cryptoThunk', async () => {
  try {
    const response = await fetch('https://api.coincap.io/v2/assets', {
      method: 'GET',
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
});
const initialState = {
  crypto: [],
  loadingStatus: 'idel',
};

const cryptoReducer = createSlice({
  name: 'cryptoinfo',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(cryptoThunk.fulfilled, (state, { payload }) => {
        state.crypto = payload;
        state.loadingStatus = 'success';
      })
      .addCase(cryptoThunk.pending, (state) => {
        state.loadingStatus = 'pending';
      })
      .addCase(cryptoThunk.rejected, (state) => {
        state.loadingStatus = 'rejected';
      });
  },
});

const getLoading = (state) => state.crypto.loadingStatus;
const getCryptoInfo = (state) => state.crypto.crypto;

export { getLoading, getCryptoInfo, cryptoThunk };
export default cryptoReducer.reducer;
