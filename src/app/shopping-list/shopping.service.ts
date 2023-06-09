import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

export class ShoppingService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>(); //listening to shopiing edit component
  private ingredients: Ingredient[] = [
    new Ingredient('Potatoes', 8),
    new Ingredient('Tomatoes', 3),
  ];

  getIngredient(index) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // spread operator , array in to a list
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngrediemt(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
