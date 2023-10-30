import { configureStore, PreloadedState } from '@reduxjs/toolkit';
// eslint-disable-next-line import/named
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import { authReducer, authSlice } from '~redux/authSlice';
import { planReducer } from '~redux/planSlice';
import { themeReducer } from '~redux/themeSlice';
import { workoutReducer } from '~redux/workoutSlice';

export const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  plans: planReducer,
  workout: workoutReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// persist auth data
const preloadedState = {
  auth: { ...authSlice.getInitialState() },
};

export const store = setupStore(preloadedState);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
