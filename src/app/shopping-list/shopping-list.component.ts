import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
// import * as fromApp from '../store/app.reducer';
import {
  selectEditedItem,
  selectIngredients,
  shoppingListSelectors,
} from './store/shopping-list.selector';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnDestroy, OnInit {
  ingredients$: Observable<Ingredient[]>;
  editMode = false;
  private igCHangeSub: Subscription;
  editedItem: Ingredient | undefined;

  constructor(
    private shoppingService: ShoppingService,
    private logService: LoggingService,

    private store: Store
  ) {}
  ngOnDestroy(): void {
    // this.igCHangeSub.unsubscribe();
  }

  ngOnInit() {
    // this.ingredients = this.store.select(state => state.shoppingList.ingredients);
    // this.store.dispatch(ShoppingListActions.addIngredient());
    this.store.select(selectEditedItem).subscribe((data) => {
      this.editedItem = data;
    });
    this.ingredients$ = this.store
      .select(selectIngredients)
      .pipe(tap((data) => console.log('component: ' + data)));
   
    this.logService.printLog('hello from shopping list');
  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index);

    this.editMode = true;
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
    console.log('index', index);
  }
}
