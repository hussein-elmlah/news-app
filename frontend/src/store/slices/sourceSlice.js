import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaginatedSources, getTopFiveSources } from '../../axios/sourcesAndArticles';

export const fetchSources = createAsyncThunk(
  'sources/fetchSources',
  async ({ page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedSources(page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    totalResults: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sources = action.payload.sources;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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


export const selectSourcesStatus = (state) => state.sources.status;
export const selectTopFiveSources = (state) => state.sources.topFiveSources;
export const selectSources = (state) => state.sources.sources;
export const selectTotalResults = (state) => state.sources.totalResults;

export default sourcesSlice.reducer;
