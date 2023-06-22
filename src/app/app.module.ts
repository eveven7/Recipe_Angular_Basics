import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';
// import * as fromApp from './store/app.reducer';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { INGREDIENTS } from './shopping-list/store/shopping-list.selector';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AUTH } from './auth/store/auth.selector';
import { authReducer } from './auth/store/auth.reducer';
import { RECIPES } from './recipes/store/recipe.selector';
import { recipeListReducer } from './recipes/store/recipe.reducer';
import { RecipesModule } from './recipes/recipes.module';
import { EffectsModule } from '@ngrx/effects';
import { Store1Effects } from './shopping-list/store/shopping-list.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecipesModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({
      [INGREDIENTS]: shoppingListReducer,
      [AUTH]: authReducer,
      [RECIPES]: recipeListReducer,
    }),
    EffectsModule.forRoot([Store1Effects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  bootstrap: [AppComponent],

  // providers:[LoggingService]// eagerly loading module
})
export class AppModule {}
