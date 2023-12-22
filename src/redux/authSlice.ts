import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

const initialState: {
  user?: IUser;
  authed: boolean;
} = {
  user: undefined,
  authed: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser | undefined>) => {
      if (action.payload) {
        state.user = action.payload;
        state.authed = !!action.payload;
      } else {
        return initialState;
      }
    },
  },
});

export const { setAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
