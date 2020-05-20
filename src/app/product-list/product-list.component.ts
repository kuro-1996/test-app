import { Component, OnInit } from "@angular/core";
import { Product } from "./product.model";
import { ProductListService } from "./product.service";
import { FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";

import { NgxPaginationModule } from "ngx-pagination";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  productsClone: Product[] = [];

  productIndex: number;

  isFetching = false;

  isNothingFound = false;

  isEdit = false;

  searchInput: string;

  config: any;

  productForm = this.fb.group({
    input: [""],
    price: [""],
    date: [""],
    publishFrom: [""],
    publishTo: [""],
    type: [""],
  });

  addProductForm;

  editProductForm;

  priceOptions = ["lowest to highest", "highest to lowest"];

  dateOptions = ["latest to oldest", "oldest to latest"];

  typeOptions = [];

  constructor(
    private productService: ProductListService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router
  ) {
    this.addProductForm = this.fb.group({
      name: ["", [Validators.required]],
      createdAt: ["", [Validators.required]],
      image: ["", [Validators.required]],
      price: ["", [Validators.required]],
      type: ["", [Validators.required]],
      publish_from: ["", [Validators.required]],
      publish_to: ["", [Validators.required]],
    });

    this.editProductForm = this.fb.group({
      createdAt: ["", Validators.required],
      name: ["", Validators.required],
      image: ["", Validators.required],
      price: ["", Validators.required],
      type: ["", Validators.required],
      publish_from: ["", Validators.required],
      publish_to: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    const relsove = this.router.snapshot.data;
    this.products = relsove.prlist;
    this.productsClone = this.products.slice();
    console.log(this.productsClone);

    this.productsClone.forEach((item) => {
      this.typeOptions.push(item.type);
    });
    this.typeOptions = this.typeOptions.filter(function (el, index, self) {
      return index === self.indexOf(el);
    });
    // this.productService.fetchProduct().subscribe((products) => {
    //   this.products = products;
    //   this.productsClone = this.products.slice();
    //   this.isFetching = false;
    //   this.productsClone.forEach((item) => {
    //     this.typeOptions.push(item.type);
    //   })
    //   this.typeOptions = this.typeOptions.filter(function(el,index,self){
    //     return index === self.indexOf(el);
    //   })
    // });

    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.productsClone.length,
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
      this.productsClone.sort(this.compareValues("createdAt", "desc"));
    } else {
      this.productsClone.sort(this.compareValues("createdAt"));
    }
  }

  onSelectPublishFrom() {
    if (this.productForm.get("publishFrom").value === "latest to oldest") {
      this.productsClone.sort(this.compareValues("publish_from", "desc"));
    } else {
      this.productsClone.sort(this.compareValues("publish_from"));
    }
  }

  onSelectPublishTo() {
    if (this.productForm.get("publishTo").value === "latest to oldest") {
      this.productsClone.sort(this.compareValues("publish_to", "desc"));
    } else {
      this.productsClone.sort(this.compareValues("publish_to"));
    }
  }

  onSelectType() {
    this.productsClone = this.products.filter((item) => {
      return item.type === this.productForm.get("type").value;
    });

    if (this.productForm.get("type").value === "") {
      this.productsClone = this.products;
      this.config.totalItems = this.productsClone.length;
    } else {
      this.config.totalItems = this.productsClone.length;
    }
  }

  compareValues(key, order = "asc") {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = !isNaN(Date.parse(a[key]))
        ? new Date(a[key]).getTime()
        : +a[key];
      const varB = !isNaN(Date.parse(b[key]))
        ? new Date(b[key]).getTime()
        : +b[key];

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
    this.searchInput = this.productForm.get("input").value;

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

  onAddProduct() {
    const productAdding = new Product(
      this.products.length + 1,
      this.addProductForm.get("createdAt").value,
      this.addProductForm.get("name").value,
      this.addProductForm.get("image").value,
      this.addProductForm.get("price").value,
      this.addProductForm.get("type").value,
      this.addProductForm.get("publish_from").value,
      this.addProductForm.get("publish_to").value,
      0
    );

    this.products.push(productAdding);
    this.productsClone = this.products;
    this.config.totalItems = this.productsClone.length;
    if (!this.typeOptions.includes(productAdding.type)) {
      this.typeOptions.push(productAdding.type);
    }
    this.addProductForm.reset();
    this.productService.storeProduct(productAdding);
  }

  onEditProduct(index: number) {
    this.isEdit = true;
    this.productIndex =
      index + (this.config.currentPage - 1) * this.config.itemsPerPage;
    this.editProductForm.setValue({
      createdAt: moment(
        this.productsClone[
          index + (this.config.currentPage - 1) * this.config.itemsPerPage
        ].createdAt
      ).format('YYYY-MM-DD'),
      name: this.productsClone[
        index + (this.config.currentPage - 1) * this.config.itemsPerPage
      ].name,
      image: this.productsClone[
        index + (this.config.currentPage - 1) * this.config.itemsPerPage
      ].image,
      price: this.productsClone[
        index + (this.config.currentPage - 1) * this.config.itemsPerPage
      ].price,
      type: this.productsClone[
        index + (this.config.currentPage - 1) * this.config.itemsPerPage
      ].type,
      publish_from: moment(
        this.productsClone[
          index + (this.config.currentPage - 1) * this.config.itemsPerPage
        ].publish_from
      ).format('YYYY-MM-DD'),
      publish_to: moment(
        this.productsClone[
          index + (this.config.currentPage - 1) * this.config.itemsPerPage
        ].publish_to
      ).format('YYYY-MM-DD'),
    });
  }

  onEditUpdate() {
    this.productsClone[this.productIndex].createdAt = this.editProductForm.get(
      "createdAt"
    ).value;
    this.productsClone[this.productIndex].name = this.editProductForm.get(
      "name"
    ).value;
    this.productsClone[this.productIndex].image = this.editProductForm.get(
      "image"
    ).value;
    this.productsClone[this.productIndex].price = this.editProductForm.get(
      "price"
    ).value;
    this.productsClone[this.productIndex].type = this.editProductForm.get(
      "type"
    ).value;
    this.productsClone[
      this.productIndex
    ].publish_from = this.editProductForm.get("publish_from").value;
    this.productsClone[this.productIndex].publish_to = this.editProductForm.get(
      "publish_to"
    ).value;

    if (
      !this.typeOptions.includes(this.productsClone[this.productIndex].type)
    ) {
      this.typeOptions.push(this.productsClone[this.productIndex].type);
    }

    this.editProductForm.reset();
    // this.productService.setProducts(this.productsClone);
    this.productService.updateProduct(
      this.productsClone[this.productIndex],
      this.productsClone[this.productIndex].id
    );
    console.log(this.productsClone[this.productIndex].id);

    this.isEdit = false;
  }
}
