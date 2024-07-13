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
    updateNewWorkoutTitle: (state, action: PayloadAction<INewWorkout['title']>) => {
      state.title = action.payload;
    },
    updateSetWeight: (state, action: PayloadAction<{ exerciseIndex: number; setIndex: number; weight: number }>) => {
      const newEs = state.exercises;
      if (newEs) {
        const newE = newEs[action.payload.exerciseIndex];
        newE.sets[action.payload.setIndex].weight = action.payload.weight;
        newEs[action.payload.exerciseIndex] = newE;
        state.exercises = newEs;
      }
    },
    updateSetReps: (state, action: PayloadAction<{ exerciseIndex: number; setIndex: number; reps: number }>) => {
      const newEs = state.exercises;
      if (newEs) {
        const newE = newEs[action.payload.exerciseIndex];
        newE.sets[action.payload.setIndex].reps = action.payload.reps;
        newEs[action.payload.exerciseIndex] = newE;
        state.exercises = newEs;
      }
    },
    addSetToNewExercise: (state, action: PayloadAction<number>) => {
      if (state.exercises) {
        const index = action.payload;
        const numOfSets = state.exercises[index].sets.length;
        const newSet = numOfSets ? state.exercises[index].sets[numOfSets - 1] : { reps: 0, weight: 0 };
        state.exercises[index].sets.push(newSet);
      }
    },
    removeSetFromNewExercise: (state, action: PayloadAction<{ exerciseIndex: number; setIndex: number }>) => {
      const result = state.exercises?.map((e, i) => {
        if (i === action.payload.exerciseIndex) {
          const newE = e;
          newE.sets = e.sets.filter((_, i) => i !== action.payload.setIndex);
        }
        return e;
      });
      state.exercises = result;
    },
    resetNewWorkout: () => {
      return initialState;
    },
  },
});

export const {
  createExercise,
  resetNewWorkout,
  updateNewWorkoutTitle,
  addSetToNewExercise,
  removeSetFromNewExercise,
  updateSetWeight,
  updateSetReps,
} = newWorkoutSlice.actions;

export const newWorkoutReducer = newWorkoutSlice.reducer;
