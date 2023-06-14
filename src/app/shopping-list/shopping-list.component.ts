import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnDestroy, OnInit {
  ingredients: Ingredient[];
  private igCHangeSub: Subscription;
  constructor(private shoppingService: ShoppingService, private logService: LoggingService) {}
  ngOnDestroy(): void {
    this.igCHangeSub.unsubscribe();
  }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.igCHangeSub = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.logService.printLog('hello from shopping list')
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
