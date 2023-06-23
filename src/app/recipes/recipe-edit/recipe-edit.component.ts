import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from '../recipe.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteRecipe } from '../store/recipe.actions';
import * as RecipesAction from '../store/recipe.actions';
import { selectEditedItem } from '../store/recipe.selector';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store
  ) {}
  recipeForm: FormGroup;
  id: number;
  editMode = false;
  recipes$: Observable<Recipe[]>;
  editedItem$: Observable<Recipe>;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    this.editedItem$ = this.store.pipe(select(selectEditedItem));

    this.editedItem$.pipe(take(1)).subscribe((editedRecipe: Recipe) => {
      if (this.editMode && editedRecipe) {
        const recipeName = editedRecipe.name;
        const recipeImagPath = editedRecipe.imagePath;
        const recipeDescription = editedRecipe.description;
        const recipeIngredients = new FormArray([]);

        if (editedRecipe.ingredients) {
          for (let ingredient of editedRecipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
            );
          }
        }

        this.recipeForm = new FormGroup({
          name: new FormControl(recipeName, Validators.required),
          imagePath: new FormControl(recipeImagPath, Validators.required),
          description: new FormControl(recipeDescription, Validators.required),
          ingredients: recipeIngredients,
        });
      } else {
        this.recipeForm = new FormGroup({
          name: new FormControl('', Validators.required),
          imagePath: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          ingredients: new FormArray([]),
        });
      }
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    // console.log(this.recipeForm);
    if (this.editMode) {
      this.store.dispatch(RecipesAction.updateRecipe({ recipe: newRecipe }));
    } else {
      this.store.dispatch(RecipesAction.addRecipe({ recipe: newRecipe }));
    }
    this.onCancel();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    this.editedItem$.pipe(take(1)).subscribe((editedItem) => {
      this.store.dispatch(deleteRecipe({ recipe: editedItem }));
    });
  }
}
