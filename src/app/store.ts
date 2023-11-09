import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer, { categoriesApiSlice } from '../features/categories/categorySlice';
import { apiSlice } from '../features/api/apiSlice';

const reducers = {
  categories: categoriesReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
}

export const reducer = {
  ...reducers,
  [categoriesApiSlice.reducerPath]: reducers[apiSlice.reducerPath]
}

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
