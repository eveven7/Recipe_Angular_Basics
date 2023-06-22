import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectedRecipe } from '../store/recipe.selector';
import { selectedOneRecipe } from '../store/recipe.selector';
import { tap } from 'rxjs/operators';
import { addIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipeName: string;
  @Input() recipeObject: Recipe;
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (!this.recipeObject) {
      this.recipeObject = new Recipe('', '', '', []);
    }
  }
  onAddToShoppingList() {
    console.log(this.recipeObject.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
