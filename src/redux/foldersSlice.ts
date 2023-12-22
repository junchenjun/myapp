import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IWorkout } from '~redux/workoutSlice';

export interface IFolder {
  name: string;
  workouts?: IWorkout[];
  id: string;
}

const initialState: IFolder[] = [];

export const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (_, action: PayloadAction<IFolder[] | undefined>) => {
      if (action.payload) {
        return action.payload;
      } else {
        return initialState;
      }
    },
  },
});

export const { setFolders } = folderSlice.actions;

export const folderReducer = folderSlice.reducer;
