import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IExercise } from '~redux/workoutSlice';

interface INewWorkout {
  exercises?: IExercise[];
  title?: string;
}

const initialState: INewWorkout = {
  exercises: [],
  title: undefined,
};

export const newWorkoutSlice = createSlice({
  name: 'newWorkout',
  initialState,
  reducers: {
    createExercise: (state, action: PayloadAction<IExercise>) => {
      state.exercises?.unshift(action.payload);
    },
    setNewWorkoutTitle: (state, action: PayloadAction<INewWorkout['title']>) => {
      state.title = action.payload;
    },
    resetNewWorkout: () => {
      return initialState;
    },
  },
});

export const { createExercise, resetNewWorkout, setNewWorkoutTitle } = newWorkoutSlice.actions;

export const newWorkoutReducer = newWorkoutSlice.reducer;
