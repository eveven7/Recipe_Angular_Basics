import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { INGREDIENTS } from '../shopping-list/store/shopping-list.selector';

export interface AppState {
  [INGREDIENTS]: fromShoppingList.State;
  // auth: fromAuth.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  [INGREDIENTS]: fromShoppingList.shoppingListReducer,
  // auth: fromAuth.authReducer,
};
// export function shoppingListReducer(
//   state: fromShoppingList.State,
//   action: any
// ) {
//   console.log('Shopping List State:', state);

//   return state;
// }
