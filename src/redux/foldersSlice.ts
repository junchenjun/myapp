import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IWorkout } from '~redux/workoutSlice';

export interface IFolder {
  name: string;
  workouts?: IWorkout[];
  id: string;
}

export interface IFolders {
  all?: IFolder[];
  selected?: string;
}

const initialState: IFolders = {
  all: undefined,
  selected: undefined,
};

export const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<IFolder[] | undefined>) => {
      if (action.payload) {
        state.all = action.payload;
      } else {
        return initialState;
      }
    },
    setSelectedFolder: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
    },
  },
});

export const { setFolders, setSelectedFolder } = folderSlice.actions;

export const folderReducer = folderSlice.reducer;
