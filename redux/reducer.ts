import { combineReducers } from 'redux';

import { authReducer } from './authSlice';
import { themeReducer } from './themeSlice';

export const rootReducer = combineReducers({ theme: themeReducer, auth: authReducer });
