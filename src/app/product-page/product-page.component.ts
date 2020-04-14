import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductListService } from "../product-list/product.service";
import { Product } from "../product-list/product.model";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  isFetching = false;
  searchInput: string;
  pages: number[] = [];
  // id: number;

  constructor(
    private productService: ProductListService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.products = products;
      this.isFetching = false;
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    // })   
  }
  
  onAddToCart(index: number) {
    this.productService.addProductToCart(this.products[index]);
    console.log(this.products[index]);
  }
}
