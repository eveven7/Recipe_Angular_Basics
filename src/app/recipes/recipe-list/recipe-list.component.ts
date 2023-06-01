import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg'
    ),

    new Recipe(
      'A test Recipe',
      'This is simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg'
    ),

    new Recipe(
      'A test Recipe',
      'This is simply test',
      'https://assets.bonappetit.com/photos/61b775620fb3fcc4cbf036c1/3:2/w_3000,h_2000,c_limit/20211208%20Spaghetti%20Squash%20with%20Tomato%20Sauce%20and%20Mozarella%20LEDE.jpg'
    ),
  ];
  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
