import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Resolve } from "@angular/router";
import { Subject } from 'rxjs';

import { Product } from "./product.model";
import { CartService } from "../cart/cart.service";
import { ApiService } from '../shared/API.service';

@Injectable({ providedIn: "root" })
export class ProductListService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fetchProduct();
  }

  productChanged = new Subject<Product[]>();

  typeOptionChange = new Subject<any>();

  isEditChange = new Subject<boolean>();

  configItem = new Subject<number>();

  isTypeSelect = new Subject<boolean>();

  private products = [];
  cartIndex: number;
  productIndex: number;
  
  constructor(private http: HttpClient, private cartService: CartService, private apiService: ApiService) {
  }

  storeProduct(product: Product) {
    this.apiService.create('products', product)
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  updateProduct(product: Product, id: number) {
    this.apiService.update('products', product, id)
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  deleteProduct(id: number) {
    this.apiService.delete('products',id)
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  fetchProduct() {
    return this.apiService.get('products');
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  addProductToCart(product: Product) {
    this.cartService.addProductCart(product); // add ingredients into shopping-list.service
  } 
}
