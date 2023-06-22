import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  selectedName: string;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {

  }
  onRecipeSelected(recipe: Recipe) {
    console.log('parent',recipe);
    this.selectedRecipe = recipe
    console.log(this.selectedRecipe, "xdlol");


  }
}
