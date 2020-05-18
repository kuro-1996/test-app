import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { Product } from '../product.model';
import { ProductListService } from '../product.service';

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
})

export class ProductEditComponent implements OnInit {
  editProductForm;
  product: Product;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductListService) {
    this.editProductForm = this.fb.group({
      createdAt: ["",Validators.required],
      name: ["",Validators.required],
      image: ["",Validators.required],
      price: ["",Validators.required],
      type: ["",Validators.required],
      publish_from : ["",Validators.required],
      publish_to: ["",Validators.required]
    })
  }

  ngOnInit() {
    
  }

  onSubmit() {
    this.router.navigate(["product-list"])
  }
}