import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { categoriesApiSlice } from '../features/categories/categorySlice';
import { castMemberApiSlice } from '../features/castMembers/castMembersSlice';
import { genresApiSlice } from '../features/genres/genreSlice';
import { apiSlice } from '../features/api/apiSlice';
import { videosApiSlice } from '../features/videos/videosSlice';


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMemberApiSlice.reducerPath]: apiSlice.reducer,
  [genresApiSlice.reducerPath]: apiSlice.reducer,
  [videosApiSlice.reducerPath]: apiSlice.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
  })
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
