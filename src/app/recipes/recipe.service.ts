import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class RecipeService {
  // recipeSeleced = new EventEmitter<Recipe>();
  recipeSeleced = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
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
  ];

  constructor(
    private shoppingService: ShoppingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShopping(ingredients: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients}));
  }
  getRecipe(index: number) {
    return this.recipes.slice()[index]; //slice - copy of the array
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
