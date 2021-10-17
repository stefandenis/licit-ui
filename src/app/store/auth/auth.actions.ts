import { createAction, props } from '@ngrx/store';
import { DisplayProfile } from './auth.reducer';

export const checkAuth = createAction('[Auth] checkAuth');
export const checkAuthComplete = createAction(
  '[Auth] checkAuthComplete',
  props<{ isLoggedIn: boolean }>()
);
export const login = createAction(
  '[Auth] login',
  props<{ email: string; password: string }>()
);
export const loginComplete = createAction(
  '[Auth] loginComplete',
  props<{ isLoggedIn: boolean }>()
);

export const getDisplayProfile = createAction(
  '[Auth] getDisplayProfile',
  props<{ profile: DisplayProfile | null }>()
);

export const logout = createAction('[Auth] logout');
export const logoutComplete = createAction('[Auth] logoutComplete');
