import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductListComponent } from './product-list.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { ProductListService } from './product.service';



const routes: Routes = [
  { 
    path: "",
    component: ProductListComponent, 
    // canActivate: [AuthGuard],
    resolve: {prlist: ProductListService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule {}