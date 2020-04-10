import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../product-list/product.model';

@Injectable({providedIn:'root'})
export class CartService {
  productCart: Product[] = [];
  productCartsChanged = new Subject<Product[]>();

  constructor() {}

  getProducCarts() {
    return this.productCart.slice();
  }

  setProductCarts(carts: Product[]) {
    this.productCart = carts;
    console.log(this.productCart);
    
  }

  addProductCart(cart: Product) {
    this.productCart.push(cart); //push ingrenent to this.ingredients
    this.productCartsChanged.next(this.productCart.slice()); //add the copy of ingredients to ingredientsChanged event's data
  }

  getSum() {
    let sum: number = 0;
    this.productCart.forEach((item) => {
      sum += +item.price;
    })
    return sum;
  }
}