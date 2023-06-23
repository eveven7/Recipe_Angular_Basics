// import { recipeListReducer } from './../recipes/store/recipe.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from './../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { INGREDIENTS } from '../shopping-list/store/shopping-list.selector';
import { AUTH } from '../auth/store/auth.selector';
import { RECIPES } from '../recipes/store/recipe.selector';

export interface AppState {
  [INGREDIENTS]: fromShoppingList.State;
  [AUTH]: fromAuth.State;
  [RECIPES]:fromRecipes.State
}
export const appReducer: ActionReducerMap<AppState> = {
  [INGREDIENTS]: fromShoppingList.shoppingListReducer,
  [AUTH]: fromAuth.authReducer,
  [RECIPES]: fromRecipes.recipeListReducer
};
