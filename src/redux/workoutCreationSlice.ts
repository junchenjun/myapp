import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IExercise } from '~redux/workoutSlice';

// const targetMuscles: { group: IMuscleTarget; subs: IMuscleTarget[] }[] = [
//   {
//     group: 'fullBody',
//     subs: ['other'],
//   },
//   {
//     group: 'arms',
//     subs: ['biceps', 'triceps', 'forearms'],
//   },
//   {
//     group: 'back',
//     subs: ['lats', 'midBack', 'lowerBack'],
//   },
//   {
//     group: 'chest',
//     subs: ['lowerChest', 'upperChest', 'midChest'],
//   },
//   {
//     group: 'core',
//     subs: ['obliques'],
//   },
//   {
//     group: 'shoulders',
//     subs: ['traps'],
//   },
//   {
//     group: 'legs',
//     subs: ['glutes', 'hamstrings', 'calves', 'quads', 'hips'],
//   },
// ];

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
