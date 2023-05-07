import { createSlice } from '@reduxjs/toolkit';

import { Workout } from '../firebase/plans';

const initialState: {
  workout: Workout;
} = {
  workout: null,
};

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkout: (state, action) => {
      state.workout = action.payload;
    },
  },
});

export const { setWorkout } = workoutSlice.actions;

export const workoutReducer = workoutSlice.reducer;
