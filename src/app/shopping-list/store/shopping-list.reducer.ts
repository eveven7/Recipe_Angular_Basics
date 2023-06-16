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
  })),

  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),
  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editIndex ? { ...action.ingredient } : ingredient
    ),
  })),
  on(ShoppingListActions.deleteIngredient, (state,action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.filter(
      (_, index) => index !== action.index
    ),
  }))
);
