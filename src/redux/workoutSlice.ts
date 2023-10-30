import { createSlice } from '@reduxjs/toolkit';

export interface IExerciseSet {
  weight: string;
  reps: number;
}

export interface IExercise {
  name: string;
  restTime: number;
  sets: IExerciseSet[];
}

export interface IWorkout {
  repeteOn?: string[];
  name: string;
  lastPerformed?: string;
  exercises: IExercise[];
  id: string;
}

const initialState: {
  workout?: IWorkout;
} = {
  workout: undefined,
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
