import { createReducer, on } from '@ngrx/store';
import * as RecipesAction from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
export interface State {
  recipes: Recipe[];

  editedItem: Recipe;
  editIndex: number;
}

const initialState: State = {
  recipes: [
    new Recipe(
      'A test Recipe',
      'This is simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('eggs', 1),
        new Ingredient('tomatoe', 6),
      ]
    ),

    new Recipe(
      'A second test Recipe',
      'This is second simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg',
      [
        new Ingredient('potatoe', 1),
        new Ingredient('cucumber', 5),
        new Ingredient('source', 1),
      ]
    ),

    new Recipe(
      'A third test Recipe',
      'This is third simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg',
      [
        new Ingredient('potatoe', 1),
        new Ingredient('raspeberyy', 5),
        new Ingredient('lime', 6),
      ]
    ),
  ],

  editIndex: -1,
  editedItem: null,
};

export const recipeListReducer = createReducer(
  initialState,

  on(RecipesAction.addRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.concat(action.recipe),
  })),
  on(RecipesAction.selectOneRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((i) => i.name == action.name),
  })),

  on(RecipesAction.deleteRecipe, (state, action) => {
    const recipe = state.recipes.filter((item) => item !== state.editedItem);
    return {
      ...state,
      editIndex: -1,
      recipe: recipe,
    };
  }),

  on(RecipesAction.updateRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((recipe) => {
      recipe.name == state.editedItem.name;
    }),
  }))
);
