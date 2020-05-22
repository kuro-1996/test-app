import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" }, //redirect blank space to /recipe
  {
    path: "recipes",
    loadChildren: () => import("./recipes/recipe.module").then((m) => m.RecipeModule),
  },
  {
    path: "shopping-list",
    loadChildren: () => import("./shopping-list/shopping-list.module").then((m) => m.ShoppingListModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "cart",
    loadChildren: () => import("./cart/cart.module").then((m) => m.CartModule),
  },
  {
    path: "product-list",
    loadChildren: () => import("./product-list/product-list.module").then((m) => m.ProductListModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
