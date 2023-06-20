import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';

export const addIngredient = createAction(
  '[Shopping List] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  '[Shopping List] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  '[Shopping List] Update Ingredients',
  props<{ index: number; ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(
  '[Shopping List] Delete Ingredient',
  props<{ index: number }>()
);

export const startEdit = createAction(
  '[Shopping List] Start edit',
  props<{
    index: number;
  }>()
);
export const stopEdit = createAction('[Shopping List] Stop edit');
