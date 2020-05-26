import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { CartService } from "./cart.service";
import { Product } from "../product-list/product.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  cartSub: Subscription;
  sum: number = 0;
  productCarts: Product[] = [];
  oldInputValue: number[];
  inputValue: number[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productCarts = this.cartService.getProducCarts();
    this.cartSub = this.cartService.productCartsChanged.subscribe(
      (carts: Product[]) => {
        this.productCarts = carts;
      }
    );

    this.productCarts.forEach((item) => {
      if (isNaN(item.quantity)) {
        item.quantity = 1;
      }
      this.sum += +(item.price * item.quantity);
    })
  
    this.oldInputValue = new Array(this.productCarts.length).fill(1);
    this.inputValue = new Array(this.productCarts.length).fill(1);

    for (let i = 0; i < this.productCarts.length; i++) {
      if (isNaN(this.productCarts[i].quantity)) {
        this.productCarts[i].quantity = 1;
      }
      this.inputValue[i] = this.productCarts[i].quantity;
    }
  }

  onDelete(index: number) {
    this.sum -=
      +this.productCarts[index].price *
      this.inputValue[index];
    this.productCarts.splice(index, 1);
    this.cartService.setProductCarts(this.productCarts);
  }

  onPlus(index: number) {
    this.sum += +this.productCarts[index].price;
    this.productCarts[index].quantity += 1;
    this.inputValue[index] += 1;
    this.cartService.setProductCarts(this.productCarts);
  }

  onChange(index: number) {
    this.productCarts[index].quantity = this.inputValue[index];

    if (this.inputValue[index] === 0) {
      this.sum -=
        +this.productCarts[index].price *
        (this.oldInputValue[index] -this.inputValue[index]);
      this.productCarts.splice(index, 1);
    }

    if (this.inputValue[index] > this.oldInputValue[index]) {
      this.sum += 
      +this.productCarts[index].price * 
      (this.inputValue[index] - this.oldInputValue[index]);
    }

    if (
      this.inputValue[index] < this.oldInputValue[index] &&
      this.inputValue[index] != 0
    ) {
      this.sum -=
        +this.productCarts[index].price *
        (this.oldInputValue[index] - this.inputValue[index]);
    }

    this.cartService.setProductCarts(this.productCarts);
    this.oldInputValue[index] = this.inputValue[index];
  }

  onMinus(index: number) {
    this.inputValue[index] -= 1;
    this.sum -= +this.productCarts[index].price;
    this.productCarts[index].quantity -= 1;
    if (this.inputValue[index] === 0) {
      this.productCarts.splice(index, 1);
    }
    this.cartService.setProductCarts(this.productCarts);
  }

  ngOnDestroy () {
    this.cartSub.unsubscribe();
  }
}
