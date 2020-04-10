import { Component, OnInit, Input } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../product-list/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productCarts: Product[] = [];
  cartSub: Subscription;
  sum: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.productCarts = this.cartService.getProducCarts();
    this.cartSub = this.cartService.productCartsChanged.subscribe((carts: Product[]) => {
      this.productCarts = carts;
    })
    this.sum = this.cartService.getSum();
  }

  onDelete(index: number) {
    this.sum -= +this.productCarts[index].price * document.getElementsByTagName("input")[index].valueAsNumber;
    this.productCarts.splice(index, 1);
  }

  onPlus(index: number) {
    this.sum += +this.productCarts[index].price;
    document.getElementsByTagName("input")[index].valueAsNumber += 1; 
  }

  onChange(index: number) {
    let sum:number = 0;
    sum = +this.productCarts[index].price * document.getElementsByTagName("input")[index].valueAsNumber;
    
    if ( document.getElementsByTagName("input")[index].valueAsNumber === 0 || document.getElementsByTagName("input")[index].valueAsNumber === NaN ) {
      this.productCarts.splice(index, 1);
      this.sum -= +this.productCarts[index].price;
    }   

    this.sum += sum;
  }

  

  onMinus(index: number) {
    document.getElementsByTagName("input")[index].valueAsNumber -= 1;
    this.sum -= +this.productCarts[index].price;
    if ( document.getElementsByTagName("input")[index].valueAsNumber === 0 ) {
      this.productCarts.splice(index, 1);
    }
  }
}
