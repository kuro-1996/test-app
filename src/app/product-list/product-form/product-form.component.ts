import { Component, OnInit, Input } from "@angular/core";
import { ProductListService } from "../product.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/shared/API.service";
import { Product } from "../product.model";
import * as moment from "moment";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  ProductForm;
  products: Product[];
  productIndex: number;
  @Input() Product: Product;
  @Input() configItem;
  @Input() Options: string[];
  @Input() title: string;
  @Input() checkEdit: boolean;

  constructor(
    private productService: ProductListService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.ProductForm = this.fb.group({
      name: ["", [Validators.required]],
      createdAt: ["", [Validators.required]],
      image: ["", [Validators.required]],
      price: ["", [Validators.required]],
      type: ["", [Validators.required]],
      publish_from: ["", [Validators.required]],
      publish_to: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.apiService.get("products").subscribe((products: Product[]) => {
      this.products = products;
    });

    if (this.checkEdit === true) {
      this.ProductForm.setValue({
          createdAt: moment(this.Product.createdAt).format('YYYY-MM-DD'),
          name: this.Product.name,
          image: this.Product.image,
          price: this.Product.price,
          type: this.Product.type,
          publish_from: moment(this.Product.publish_from).format('YYYY-MM-DD'),
          publish_to: moment(this.Product.publish_to).format('YYYY-MM-DD'),
        });
    }
  }

  onSubmit() {
    if (this.checkEdit) {
      this.productIndex = this.productService.productIndex;
      console.log(this.products[this.productIndex].id);  
      
      this.products[this.productIndex].createdAt = this.ProductForm.get("createdAt").value;
      this.products[this.productIndex].name = this.ProductForm.get("name").value;
      this.products[this.productIndex].image = this.ProductForm.get("image").value;
      this.products[this.productIndex].price = this.ProductForm.get("price").value;
      this.products[this.productIndex].type = this.ProductForm.get("type").value;
      this.products[this.productIndex].publish_from = this.ProductForm.get("publish_from").value;
      this.products[this.productIndex].publish_to = this.ProductForm.get("publish_to").value;
  
      if (!this.Options.includes(this.Product.type)) {
        this.Options.push(this.Product.type);
      }
      
      this.productService.productChanged.next(this.products);
      this.ProductForm.reset();
      this.productService.isEditChange.next(false);
      console.log(typeof(+this.products[this.productIndex].id));
      
      this.productService.updateProduct(this.products[this.productIndex],this.products[this.productIndex].id)
    } else {
      const productChange = new Product(
        this.products.length + 1,
        this.ProductForm.get("createdAt").value,
        this.ProductForm.get("name").value,
        this.ProductForm.get("image").value,
        this.ProductForm.get("price").value,
        this.ProductForm.get("type").value,
        this.ProductForm.get("publish_from").value,
        this.ProductForm.get("publish_to").value,
        0 
      );
  
      this.products.push(productChange);
      if (!this.Options.includes(productChange.type)) {
        this.Options.push(productChange.type);
      }
      this.ProductForm.reset();
      this.productService.storeProduct(productChange);
      this.productService.typeOptionChange.next(this.Options);
      this.productService.productChanged.next(this.products);
      this.productService.configItem.next(this.products.length);
    }
  }
}
