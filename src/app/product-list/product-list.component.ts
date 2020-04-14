import { Component, OnInit, OnChanges } from "@angular/core";
import { Product } from "./product.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ProductListService } from "./product.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isFetching = false;
  searchInput: string;
  pages: number[] = [];
  productForm = this.fb.group({
    price: [""],
    date: [""],
    publishFrom: [""],
    publishTo: [""],
  });
  priceOptions = ["lowest to highest", "highest to lowest"];
  dateOptions = [ "latest to oldest","oldest to latest"];
  publishFromOptions = ["latest to oldest","oldest to latest"];
  publishToOptions = ["latest to oldest","oldest to latest"];

  constructor(
    private productService: ProductListService,
    private fb: FormBuilder 
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.productService.fetchProduct().subscribe((products) => {
      this.products = products;
      this.isFetching = false;
      this.pages = this.getArrayOfPage(this.getPageCount());
    });
    // this.route.params.subscribe((params: Params) => {
    //   this.id = +params["id"];
    // })   
  }

  // ngOnChanges() {
  //   this.pages = this.getArrayOfPage(this.getPageCount());
  //   console.log(this.pages);
    
  // }

  private  getPageCount(): number {  
    let totalPage:number = 0;  
      
    totalPage =  this.products.length / 20;
     
    return totalPage;  
  }  

  private getArrayOfPage(pageCount : number) {  
    let pageArray : number [] = [];  

    if(pageCount > 0){  
      for(var i=1 ; i<= pageCount ; i++){  
        pageArray.push(i);  
      }  
    } 

    return pageArray;  
  }  

  onSelectPrice() {
    if (this.productForm.get("price").value === "lowest to highest") {
      this.products.sort(this.compareValues("price"));
    } else {
      this.products.sort(this.compareValues("price", "desc"));
    }
  }

  onSelectDate() {
    if (this.productForm.get("date").value === "latest to oldest") {
      this.products.sort(this.compareDate('createdAt','desc'));
    } else {
      this.products.sort(this.compareDate('createdAt'));
    }
  }

  onSelectPublishFrom() {
    if (this.productForm.get("publishFrom").value === "latest to oldest") {
      this.products.sort(this.compareDate('publish_from','desc'));
    } else {
      this.products.sort(this.compareDate('publish_from'));
    }
  }

  compareValues(key, order = "asc") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // không tồn tại tính chất trên cả hai object
        return 0;
      }

      const varA = a[key] instanceof Date ? a[key] : +a[key];
      const varB = b[key] instanceof Date ? b[key] : +b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    };
  }

  compareDate(key, order = "ins") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // không tồn tại tính chất trên cả hai object
        return 0;
      }

      const varA = new Date(a.createdAt).getTime();
      const varB = new Date(b.createdAt).getTime();

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order == "desc" ? comparison * -1 : comparison;
    };
  }

  onSearch() {}
}
