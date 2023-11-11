import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesReducer, { categoriesApiSlice } from '../features/categories/categorySlice';
import castMembersReducer from '../features/castMembers/castMembersSlice';
import { apiSlice } from '../features/api/apiSlice';
import { castMemberApiSlice } from '../features/castMembers/castMembersSlice';

const reducers = {
  categories: categoriesReducer,
  castMembers: castMembersReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
}

export const reducer = {
  ...reducers,
  [categoriesApiSlice.reducerPath]: reducers[apiSlice.reducerPath],
}

export const reducerss = {
  ...reducer,
  [castMemberApiSlice.reducerPath]: reducers[apiSlice.reducerPath]
}

export const store = configureStore({
  reducer: reducerss,
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
