import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingService } from '../shopping.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredient } from '../store/shopping-list.actions';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { selectEditedItem } from '../store/shopping-list.selector';
import { Observable } from 'rxjs-compat';
// import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() editMode = false;
  subscription: Subscription;
  @Input() editedItem: Ingredient | undefined;
  editedItemIndex: number;
  // editedItem: Ingredient | undefined;
  editIndex$: Observable<number | undefined> = of(undefined);

  shopForm = new FormGroup({
    name: new FormControl('', {}),
    amount: new FormControl(null, {}),
  });
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();// listen from outside,

  constructor(
    private shoppingService: ShoppingService,
    private store: Store,
    private fb: FormBuilder
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
  ngOnInit(): void {}
  get amount() {
    return this.shopForm.get('amount');
  }
  get name() {
    return this.shopForm.get('name');
  }

  onAddItem() {
    const itemName = this.name.value;
    const itemAmount = this.amount.value;

    if (this.editMode) {
      if (this.editedItem && this.editedItem.name !== itemName) {
        this.store.dispatch(
          ShoppingListActions.updateIngredient({
            index: this.editedItemIndex,
            ingredient: {
              name: itemName,
              amount: itemAmount,
            },
          })
        );
      }
    } else {
      this.store.dispatch(
        ShoppingListActions.addIngredient({
          ingredient: {
            name: itemName,
            amount: itemAmount,
          },
        })
      );
    }

    this.onClear();
  }


  onClear() {
    this.shopForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
  onDelete() {
    this.store.dispatch(
      ShoppingListActions.deleteIngredient({ index: this.editedItemIndex })
    );
    this.onClear();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('editedItem' in changes) {
      if (this.editedItem) {
        this.editMode = true;
        if (this.editedItem.name !== this.name.value) {
          this.name.setValue(this.editedItem.name);
          this.amount.setValue(this.editedItem.amount);
        }
      } else {
        this.editMode = false;
        this.shopForm.reset();
      }
    }
  }
}
