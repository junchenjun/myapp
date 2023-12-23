import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IExerciseForm = {
  title: string;
  targets: string[];
};

const initialState: {
  exercises?: IExerciseForm[];
} = {
  exercises: [],
};

export const createWorkoutSlice = createSlice({
  name: 'createWorkout',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExerciseForm>) => {
      state.exercises?.unshift(action.payload);
    },
    resetCreateWorkout: () => {
      return initialState;
    },
  },
});

export const { addExercise, resetCreateWorkout } = createWorkoutSlice.actions;

export const createWorkoutReducer = createWorkoutSlice.reducer;
