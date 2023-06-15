import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnDestroy, OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  private igCHangeSub: Subscription;
  
  constructor(
    private shoppingService: ShoppingService,
    private logService: LoggingService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  ngOnDestroy(): void {
    // this.igCHangeSub.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.igCHangeSub = this.shoppingService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    this.logService.printLog('hello from shopping list');
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
