import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export const AUTH = 'auth';

export const selectAuthState = createFeatureSelector(AUTH);
export const selectIngredients = createSelector(
  selectAuthState,
  (state: State) => {
    console.log(state.user);
    return state.user;
  }
);
