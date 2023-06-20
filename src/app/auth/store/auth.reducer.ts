import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as authActions from './auth.actions';
export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
export interface State {
  user: User;
  authError: string;
  loading: boolean;
}
const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(authActions.loginStart, authActions.signUpStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authActions.logout, (state) => ({ ...state, user: null })),
  on(authActions.authenticateSuccess, (state, action) => ({
    ...state,
    authError: null,
    loading: true,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
  }))
);
