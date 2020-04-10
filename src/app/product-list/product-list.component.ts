import { Component, OnInit } from "@angular/core";
import { Product } from "./product.model";
import { ProductListService } from "./product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isFetching = false;

  constructor(private productService: ProductListService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.products = products;
      this.isFetching = false;
    });
  }

  onAddToCart(index: number) {
    this.productService.addProductToCart(this.products[index]);
  }
}
