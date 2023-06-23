// import { Store } from '@ngrx/store';
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { triggerActionFromStore1 } from '../../recipes/store/recipe.actions';
// import { addIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
// import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
// @Injectable()
// export class Store1Effects {
//   triggerActionFromStore1$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(addIngredients),
//       withLatestFrom(this.store.pipe(select(selectIngredientsByName('A test Recipe')))),
//       mergeMap(
//         ([action, value]) => of(PlaceDataAction({ value })) // Dispatch the action to place the value in the store
//       )
//     )
//   );

//   constructor(private actions$: Actions) {}
// }
