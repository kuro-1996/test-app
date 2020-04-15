import { Component, OnInit } from "@angular/core";
import { Product } from "./product.model";
import { ProductListService } from "./product.service";
import { FormBuilder } from "@angular/forms";

import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productsClone: Product[] = [];
  isFetching = false;
  isNothingFound = false;
  searchInput: string;
  config: any;
  productForm = this.fb.group({
    input: [""],
    price: [""],
    date: [""],
    publishFrom: [""],
    publishTo: [""],
    type: [""]
  });
  priceOptions = ["lowest to highest", "highest to lowest"];
  dateOptions = [ "latest to oldest","oldest to latest"];
  publishFromOptions = ["latest to oldest","oldest to latest"];
  publishToOptions = ["latest to oldest","oldest to latest"];
  typeOptions = 
  ["Chair",
  "Shirt",
  "Ball",
  "Chicken",
  "Table",
  "Hat",
  "Keyboard",
  "Shoes",
  "Mouse",
  "Gloves",
  "Bike",
  "Bacon",
  "Salad",
  "Pants",
  "Computer",
  "Fish",
  "Car",
  "Towel",
  "Cheese",
  "Tuna",
  "Soap",
  "Pizza"]

  constructor(
    private productService: ProductListService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.products = products;
      this.productsClone = this.products.slice(); 
      this.isFetching = false;
      console.log(this.productsClone);
    });
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.productsClone.length
    };
  }

  onSelectPrice() {
    if (this.productForm.get("price").value === "lowest to highest") {
      this.productsClone.sort(this.compareValues("price"));
    } else {
      this.productsClone.sort(this.compareValues("price", "desc"));
    }
  }

  onSelectDate() {
    if (this.productForm.get("date").value === "latest to oldest") {
      this.productsClone.sort(this.compareValues('createdAt','desc'));
    } else {
      this.productsClone.sort(this.compareValues('createdAt'));
    }
  }

  onSelectPublishFrom() {
    if (this.productForm.get("publishFrom").value === "latest to oldest") {
      this.productsClone.sort(this.compareValues('publish_from','desc'));
    } else {
      this.productsClone.sort(this.compareValues('publish_from'));
    }
  }

  onSelectPublishTo() {
    if (this.productForm.get("publishTo").value === "latest to oldest") {
      this.productsClone.sort(this.compareValues('publish_to','desc'));
    } else {
      this.productsClone.sort(this.compareValues('publish_to'));
    }
  }

  onSelectType() {
    this.productsClone = this.products.filter((item) => {return item.type === this.productForm.get("type").value});  
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.productsClone.length
    }
  }

  compareValues(key, order = "asc") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = !isNaN(Date.parse(a[key])) ? new Date(a[key]).getTime() : +a[key];
      const varB = !isNaN(Date.parse(b[key])) ? new Date(b[key]).getTime() : +b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    };
  }

  onSearch() {
    this.searchInput = this.productForm.get('input').value;
    let Clone = this.products.filter((item) => {return item.name.toUpperCase().includes(this.searchInput.toUpperCase())});
    if (Clone.length === 0) {
      this.productsClone = [];
      this.config = {
        itemsPerPage: 20,
        currentPage: 1,
        totalItems: this.productsClone.length
      }
      this.isNothingFound = true;
    }
    if (Clone.length !== 0) {
      this.productsClone = Clone;
      
    }
    if (this.searchInput === null) {
      this.productsClone = this.products;
      this.isNothingFound = false;
    }  
  }
  
  onAddToCart(index: number) {
    this.productService.addProductToCart(this.productsClone[index]);
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
}
