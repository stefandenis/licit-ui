import { AuthState, authFeatureName } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAuthFeatureState =
  createFeatureSelector<AuthState>(authFeatureName);

export const isAuthenticated = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.isLoggedIn
);

export const displayProfile = createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.profile
);
