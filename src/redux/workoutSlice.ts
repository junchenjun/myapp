import { createSlice } from '@reduxjs/toolkit';

export type IMuscleTarget =
  | 'fullBody'
  | 'other'
  | 'arms'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'back'
  | 'lats'
  | 'midBack'
  | 'lowerBack'
  | 'lowerChest'
  | 'upperChest'
  | 'midChest'
  | 'core'
  | 'obliques'
  | 'legs'
  | 'glutes'
  | 'hamstrings'
  | 'calves'
  | 'quads'
  | 'hips'
  | 'shoulders'
  | 'traps'
  | 'chest';

export interface IExerciseSet {
  weight: string;
  reps: number;
}

export interface IExercise {
  title: string;
  restTime?: number;
  sets?: IExerciseSet[];
  targets: IMuscleTarget[];
}

export interface IWorkout {
  title: string;
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
