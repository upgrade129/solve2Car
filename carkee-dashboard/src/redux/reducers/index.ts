import { combineReducers } from 'redux';

// Types
import { RootState } from '@/types/redux';

// Reducers
import themeReducer from './theme';
import authReducer from './auth';

const reducers = combineReducers<RootState>({
  theme: themeReducer,
  auth: authReducer,
});

export default reducers;
