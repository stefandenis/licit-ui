import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureName = 'auth';

export interface DisplayProfile {
  displayName: string;
}

export interface AuthState {
  profile: DisplayProfile | null;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  profile: null,
};

const authReducerInternal = createReducer(
  initialAuthState,

  on(authActions.loginComplete, (state, { isLoggedIn }) => {
    return {
      ...state,
      isLoggedIn,
    };
  }),
  on(authActions.checkAuthComplete, (state, { isLoggedIn }) => {
    return {
      ...state,
      isLoggedIn,
    };
  }),
  on(authActions.logoutComplete, (state, {}) => {
    return {
      ...state,
      isLoggedIn: false,
    };
  }),
  on(authActions.getDisplayProfile, (state, { profile }) => {
    return {
      ...state,
      profile,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}
