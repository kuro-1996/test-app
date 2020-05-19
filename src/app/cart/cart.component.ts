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
  productCarts: Product[] = [];
  cartSub: Subscription;
  sum: number = 0;
  oldInputValue: number[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productCarts = this.cartService.getProducCarts();
    this.cartSub = this.cartService.productCartsChanged.subscribe(
      (carts: Product[]) => {
        this.productCarts = carts;
      }
    );
    this.sum = this.cartService.getSum();
    let oldInputValue = new Array(this.productCarts.length).fill(1);
    this.oldInputValue = oldInputValue;
  }

  ngAfterViewInit():void {
    for (let i = 0; i < this.productCarts.length; i++) {
      if (isNaN(this.productCarts[i].quantity)) {
        this.productCarts[i].quantity = 1;
      }
      document.getElementsByTagName("input")[
        i
      ].valueAsNumber = this.productCarts[i].quantity;
    }
  }

  onDelete(index: number) {
    this.sum -=
      +this.productCarts[index].price *
      document.getElementsByTagName("input")[index].valueAsNumber;
    this.productCarts.splice(index, 1);
    this.cartService.setProductCarts(this.productCarts);
  }

  onPlus(index: number) {
    this.sum += +this.productCarts[index].price;
    document.getElementsByTagName("input")[index].valueAsNumber += 1;
  }

  onChange(index: number) {
    this.productCarts[index].quantity = document.getElementsByTagName("input")[
      index
    ].valueAsNumber;

    // if (document.getElementsByTagName("input")[index].valueAsNumber === NaN) {
    //   document.getElementsByTagName("input")[index].valueAsNumber = 0;
    // }

    if (document.getElementsByTagName("input")[index].valueAsNumber === 0) {
      this.sum -=
        +this.productCarts[index].price *
        (this.oldInputValue[index] -
          document.getElementsByTagName("input")[index].valueAsNumber);
      this.productCarts.splice(index, 1);
    }

    // if (isNaN(document.getElementsByTagName("input")[index].valueAsNumber)) {
    //   document.getElementsByTagName("input")[index].valueAsNumber = 0;
    //   this.sum -= +this.productCarts[index].price * (this.oldInputValue[index] - 0);
    //   this.productCarts.splice(index, 1);
    // }

    if (
      document.getElementsByTagName("input")[index].valueAsNumber >
      this.oldInputValue[index]
    ) {
      this.sum +=
        +this.productCarts[index].price *
        (document.getElementsByTagName("input")[index].valueAsNumber -
          this.oldInputValue[index]);
    }

    if (
      document.getElementsByTagName("input")[index].valueAsNumber <
        this.oldInputValue[index] &&
      document.getElementsByTagName("input")[index].valueAsNumber != 0
    ) {
      this.sum -=
        +this.productCarts[index].price *
        (this.oldInputValue[index] -
          document.getElementsByTagName("input")[index].valueAsNumber);
    }

    this.oldInputValue[index] = document.getElementsByTagName("input")[
      index
    ].valueAsNumber;
  }

  onMinus(index: number) {
    document.getElementsByTagName("input")[index].valueAsNumber -= 1;
    this.sum -= +this.productCarts[index].price;
    if (document.getElementsByTagName("input")[index].valueAsNumber === 0) {
      this.productCarts.splice(index, 1);
    }
  }

  ngOnDestroy () {
    this.cartSub.unsubscribe();
  }
}
