import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { INGREDIENTS } from '../shopping-list/store/shopping-list.selector';
import { AUTH } from '../auth/store/auth.selector';

export interface AppState {
  [INGREDIENTS]: fromShoppingList.State;
  [AUTH]: fromAuth.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  [INGREDIENTS]: fromShoppingList.shoppingListReducer,
  [AUTH]: fromAuth.authReducer,
};
