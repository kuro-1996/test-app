import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "./product.model";
import { ProductListService } from "./product.service";

import { NgxPaginationModule } from "ngx-pagination";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productSub: Subscription; typeOptionSub: Subscription; isEditSub: Subscription; configItem: Subscription; typeSelectSub: Subscription;

  products: Product[] = [];

  productsClone: Product[] = [];

  productIndex: number;

  product: Product;

  isNothingFound = false;

  isEdit = false;

  isTypeSelect = false;

  searchInput: string;

  config: any;

  priceOptions = ["lowest to highest", "highest to lowest"];

  dateOptions = ["oldest to latest","latest to oldest"];

  typeOptions = [];

  typeSelect;

  constructor(
    private productService: ProductListService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    const relsove = this.router.snapshot.data;
    this.products = relsove.prlist;
    this.productsClone = this.products.slice();

    this.productSub = this.productService.productChanged.subscribe((product: Product[]) => {
      this.productsClone = product;
    })

    this.typeOptionSub = this.productService.typeOptionChange.subscribe((option: []) => {
      this.typeOptions = option;
    })

    this.isEditSub = this.productService.isEditChange.subscribe(is => {
      this.isEdit = is;
    })

    this.configItem = this.productService.configItem.subscribe(item => {
      this.config.totalItems = item;    
    })

    this.typeSelectSub = this.productService.isTypeSelect.subscribe(is => {
      this.isTypeSelect = is;
    })

    this.productsClone.forEach((item) => {
      this.typeOptions.push(item.type);
    });
    this.typeOptions = this.typeOptions.filter(function (el, index, self) {
      return index === self.indexOf(el);
    });

    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.productsClone.length,
    };
  }

  onSearch() {
    let Clone = this.products.filter((item) => {
      return item.name.toUpperCase().includes(this.searchInput.toUpperCase());
    });

    if (Clone.length === 0) {
      this.productsClone = [];
      this.isNothingFound = true;
    }

    if (Clone.length !== 0) {
      this.productsClone = Clone;
      this.isNothingFound = false;
    }

    if (this.searchInput === "") {
      this.productsClone = this.products;
      this.isNothingFound = false;
    }

    this.config.totalItems = this.productsClone.length;
  }

  onAddToCart(index: number) {
    this.productService.addProductToCart(this.productsClone[index]);
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  onDeleteProduct(index: number) {
    // this.productService.setProducts(this.products);
    this.config.totalItems = this.productsClone.length;
    this.productService.deleteProduct(
      this.productsClone[
        index + (this.config.currentPage - 1) * this.config.itemsPerPage
      ].id
    );
    this.productsClone.splice(index, 1);
  }

  onEditProduct(index: number) {
    this.isEdit = true;
    this.productIndex = index + (this.config.currentPage - 1) * this.config.itemsPerPage;
    this.product = this.productsClone[this.productIndex];
    this.productService.productIndex = index + (this.config.currentPage - 1) * this.config.itemsPerPage; 
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.typeOptionSub.unsubscribe();
    this.typeSelectSub.unsubscribe();
    this.isEditSub.unsubscribe();
    this.configItem.unsubscribe();
  }
}
