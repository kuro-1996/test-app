import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { CartService } from '../cart/cart.service';

@Injectable({providedIn: 'root'})
export class ProductListService {
  private products: Product[] = [];
  cartIndex: number;

  constructor(private http: HttpClient, private cartService: CartService) {}

  storeProduct() {
    this.http.put('https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products', this.products)
    .subscribe(Response => {
      console.log(Response);
    })
  }

  fetchProduct() {
    return this.http.get<Product[]>('https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products')
  }

  getProduct(index: number) {
    this.cartIndex = index;
    return this.products[index];
  }

  getCartIndexItem() {
    return this.products[this.cartIndex];
  }

  addProductToCart(product: Product) {
    this.cartService.addProductCart(product); // add ingredients into shopping-list.service
  }
}