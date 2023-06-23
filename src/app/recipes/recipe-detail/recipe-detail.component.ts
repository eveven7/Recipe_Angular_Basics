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
import { Store, select } from '@ngrx/store';
import { selectedRecipe } from '../store/recipe.selector';
import { selectedOneRecipe } from '../store/recipe.selector';
import { map, switchMap, tap, find } from 'rxjs/operators';
import { addIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import { selectIngredients } from 'src/app/shopping-list/store/shopping-list.selector';

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
    this.route.params
    .pipe(
      switchMap((params: Params) => {
        const name = params['name'];
        return this.store.pipe(select(selectedOneRecipe(name)));
      })
    )
    .subscribe((recipe: Recipe[]) => {
      this.recipe = recipe[0];
    });
  }
  onAddToShoppingList() {
    console.log('INGREDIENTS', this.recipeObject.ingredients);
    this.store.dispatch(
      ShoppingListActions.addIngredients({
        ingredients: this.recipeObject.ingredients,
      })
    );
  }
  onEditRecipe() {
    console.log('recipeNAME', this.recipeObject.name);
    const name = encodeURIComponent(this.recipeObject.name);
    // this.router.navigate(['edit', name], {
    //   relativeTo: this.route.parent,
    // });
     this.router.navigate(['../', name, 'edit'], {relativeTo: this.route});

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
