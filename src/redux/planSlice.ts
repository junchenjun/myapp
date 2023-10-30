import { createSlice } from '@reduxjs/toolkit';

import { IWorkout } from '~redux/workoutSlice';

export interface IPlan {
  name: string;
  owner: string;
  workouts: IWorkout[];
  id: string;
}

const initialState: {
  list?: IPlan[];
} = {
  list: undefined,
};

export const planSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPlans: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setPlans } = planSlice.actions;

export const planReducer = planSlice.reducer;
