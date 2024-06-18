import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubscribedArticles } from '../../axios/sourcesAndArticles';

export const fetchSubscribedArticles = createAsyncThunk(
  'articles/fetchSubscribedArticles',
  async ({ page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await getSubscribedArticles(page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    subscribedArticles: [],
    status: 'idle',
    error: null,
    totalResults: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribedArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscribedArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscribedArticles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchSubscribedArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectSubscribedArticles = (state) => state.articles.subscribedArticles;
export const selectTotalResults = (state) => state.articles.totalResults;

export default articleSlice.reducer;
