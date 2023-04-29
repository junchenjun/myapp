import { createSlice } from '@reduxjs/toolkit';

import { Plan } from '../firebase/plans';

const initialState: {
  list: Plan[];
} = {
  list: null,
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
