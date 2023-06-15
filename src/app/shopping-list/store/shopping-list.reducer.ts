import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Potatoes', 8), new Ingredient('Tomatoes', 3)],
  editIndex: -1,
};

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}

const _shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  }))
);
