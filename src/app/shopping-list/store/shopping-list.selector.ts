import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './shopping-list.reducer';

export const INGREDIENTS = 'shoppingList';

export const selectShoppingListState = createFeatureSelector(INGREDIENTS);

export const selectIngredients = createSelector(
  selectShoppingListState,
  (state: State) => {
    console.log(state.ingredients);
    return state.ingredients;
  }
);

export const selectEditedItem = createSelector(
  selectShoppingListState,
  (state: State) => state.editedItem
);

export const selectEditIndex = createSelector(
  selectShoppingListState,
  (state: State) => state.editIndex
);
export const shoppingListSelectors = createSelector(
  selectIngredients,
  selectEditIndex,
  selectEditedItem,
  (selectIngredients: any, selectEditIndex: any, selectEditedItem: any) => [
    selectIngredients,
    selectEditIndex,
    selectEditedItem,
  ]
);
