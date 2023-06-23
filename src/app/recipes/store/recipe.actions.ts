import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';

export const triggerActionFromStore1 = createAction('[Store 1] Trigger Action');

export const addRecipe = createAction(
  '[Recipe List] Add Recipe',
  props<{ recipe: Recipe }>()
);

export const selectOneRecipe = createAction(
  '[Recipe List] Select Recipe',
  props<{ name: string }>()
);
export const updateRecipe = createAction(
  '[Recipe List] Update Recipe',
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipe List] Delete Recipe',
  props<{ recipe: Recipe }>()
);
