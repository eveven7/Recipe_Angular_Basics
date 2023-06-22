import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectRecipeListState,
  selectedRecipe,
} from '../store/recipe.selector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes$: Observable<Recipe[]>;
  recipes: Recipe[];
  selectedName: string;

  @Output() recipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectedRecipe)
      .pipe(
        tap((data) => console.log('component  list recipes detail: ' + data))
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipes$ = this.store.select(selectedRecipe);
  }
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  addRecipe(i) {
    this.recipe.emit(this.recipes[i]);
  }
}
