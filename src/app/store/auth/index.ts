import { authReducer } from './auth.reducer';
import { AuthEffects } from './auth.effects';

export const appReducer = {
  auth: authReducer,
};

export const appEffects = [AuthEffects];
