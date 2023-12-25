import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IExercise } from '~redux/workoutSlice';

const initialState: {
  exercises?: IExercise[];
} = {
  exercises: [],
};

export const workoutCreationSlice = createSlice({
  name: 'workoutCreation',
  initialState,
  reducers: {
    createExercise: (state, action: PayloadAction<IExercise>) => {
      state.exercises?.unshift(action.payload);
    },
    resetWorkoutCreation: () => {
      return initialState;
    },
  },
});

export const { createExercise, resetWorkoutCreation } = workoutCreationSlice.actions;

export const workoutCreationReducer = workoutCreationSlice.reducer;
