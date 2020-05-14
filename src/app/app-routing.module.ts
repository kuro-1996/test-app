import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" }, //redirect blank space to /recipes
  {
    path: "recipes",
    component: RecipesComponent,
    children: [{ path: "", component: RecipeStartComponent }, 
               { path: "new", component: RecipeEditComponent },
               { path: ":id", component: RecipeDetailComponent },
               { path: ":id/edit", component: RecipeEditComponent }]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "product-list", component: ProductListComponent},
  { path: "cart", component: CartComponent },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
