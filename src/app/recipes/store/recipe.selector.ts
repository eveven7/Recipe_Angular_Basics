import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './recipe.reducer';

export const RECIPES = 'recipes';

export const selectRecipeListState = createFeatureSelector(RECIPES);

export const selectedRecipe = createSelector(
  selectRecipeListState,
  (state: State) => {
    return state.recipes;
  }
);
export const selectIngredientsByName = (name: string) =>
  createSelector(selectRecipeListState, (state: State) => {
    console.log(state.recipes);
    return state.recipes.filter((recipe) => recipe.name === name);
  });
export const selectedOneRecipe = (recipeName: string) =>
  createSelector(selectRecipeListState, (state: State) => {
    return state.recipes.filter((recipe) => recipe.name === recipeName);
  });
export const selectEditedItem = createSelector(
  selectRecipeListState,
  (state: State) => state.editedItem
);

export const selectEditIndex = createSelector(
  selectRecipeListState,
  (state: State) => state.editIndex
);
export const shoppingListSelectors = createSelector(
  selectedRecipe,
  selectEditIndex,
  selectEditedItem,
  (selectedRecipe: any, selectEditIndex: any, selectEditedItem: any) => [
    selectedRecipe,
    selectEditIndex,
    selectEditedItem,
  ]
);
