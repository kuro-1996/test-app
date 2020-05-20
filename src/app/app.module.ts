import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';

import { RecipeModule } from './recipes/recipe.module';
import { RecipeService } from './recipes/recipe.service';
import { ProductListModule } from './product-list/product-list.module';
import { ProductListService } from './product-list/product.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { CartModule } from './cart/cart.module';
import { CartService } from './cart/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecipeModule,
    ShoppingListModule,
    AuthModule,
    CartModule,
    ProductListModule,
    NgxPaginationModule
  ],
  providers: [RecipeService,ShoppingListService,ProductListService, AuthService , AuthGuard, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
