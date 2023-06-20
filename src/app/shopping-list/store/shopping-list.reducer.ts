import { Ingredient } from '../../shared/ingredients.model';
import * as ShoppingListActions from './shopping-list.actions';

import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  ingredients: Ingredient[];
  editedItem: Ingredient;
  editIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Potatoes', 8), new Ingredient('Tomatoes', 3)],
  editIndex: -1,
  editedItem: null,
};
console.log('Initial state:', initialState);

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(action.ingredient),
  })),

  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: state.ingredients.concat(...action.ingredients),
  })),

  on(ShoppingListActions.deleteIngredient, (state, action) => ({
    ...state,
    editIndex: -1,
    ingredients: state.ingredients.filter((_, index) => index !== action.index),
  })),
  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    // editIndex: -1,
    ingredients: state.ingredients.map((ingredient, index) =>
      index === state.editIndex  ? { ...action.ingredient } : ingredient
    ),//edit index matchinti su esamu ingredientu ir ji pakeisti
  })),
  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
    editedItem: state.ingredients[action.index],
  })),
  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);
