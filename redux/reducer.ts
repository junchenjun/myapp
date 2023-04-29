import { combineReducers } from 'redux';

import { authReducer } from './authSlice';
import { planReducer } from './planSlice';
import { themeReducer } from './themeSlice';

export const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  plans: planReducer,
});
