import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSources, getTopFiveSources, subscribeSource, unsubscribeSource } from '../../axios/sourcesAndArticles';

export const fetchSources = createAsyncThunk('sources/fetchSources', async () => {
  const response = await getAllSources();
  return response;
});

export const fetchTopFiveSources = createAsyncThunk('sources/topFive', async () => {
  const response = await getTopFiveSources();
  return response;
});

const sourcesSlice = createSlice({
  name: 'sources',
  initialState: {
    sources: [],
    topFiveSources: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sources = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTopFiveSources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopFiveSources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.topFiveSources = action.payload;
      })
      .addCase(fetchTopFiveSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sourcesSlice.reducer;
export const selectSources = (state) => state.sources.sources;
export const selectTopFiveSources = (state) => state.sources.topFiveSources;
