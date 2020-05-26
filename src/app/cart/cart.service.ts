import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../product-list/product.model';
import { isNgTemplate } from '@angular/compiler';

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
  }

  addProductCart(cart: Product) {
    let same = false;
    
    for(let i = 0; i < this.productCart.length; i++) { 
      if (isNaN(this.productCart[i].quantity)) {
        this.productCart[i].quantity = 1;
      }
      if ( cart.id === this.productCart[i].id ) {
        this.productCart[i].quantity += 1;
        same = true;
      }    
    }

    if ( same === false ) {
      this.productCart.push(cart);
    } 
    
    this.productCartsChanged.next(this.productCart.slice()); 
  }
}