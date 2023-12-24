import { configureStore, PreloadedState } from '@reduxjs/toolkit';
// eslint-disable-next-line import/named
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';

import { authReducer } from '~redux/authSlice';
import { folderReducer } from '~redux/foldersSlice';
import { workoutCreationReducer } from '~redux/workoutCreationSlice';
import { workoutReducer } from '~redux/workoutSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  folders: folderReducer,
  workout: workoutReducer,
  workoutCreation: workoutCreationReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

const preloadedState = {
  // auth: { ...authSlice.getInitialState() },
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
