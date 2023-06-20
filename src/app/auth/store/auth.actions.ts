import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>
);
export const signUpStart = createAction(
  '[Auth] SignUp',
  props<{ email: string; password: string }>
);
export const logout = createAction('[Auth] Logout');

export const authenticateSuccess = createAction(
  '[Auth] AuthSucces',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);
