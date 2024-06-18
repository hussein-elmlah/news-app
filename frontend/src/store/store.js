import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import sourcesReducer from './slices/sourceSlice.js';
import articleReducer from './slices/articleSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sources: sourcesReducer,
    articles: articleReducer,
  },
});
