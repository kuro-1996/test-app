import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProductListComponent } from './product-list.component';
import { ProductListRoutingModule } from './product-list-routing.module';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductListRoutingModule,
    CommonModule,
    NgxPaginationModule
  ]
})
export class ProductListModule { }