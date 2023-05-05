import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';

const initialState: {
  userInfo: UserInfo;
} = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;

export const authReducer = authSlice.reducer;
