import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { CartService } from "../cart/cart.service";
import { Resolve } from "@angular/router";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ProductListService implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.fetchProduct();
  }

  private products = [];
  cartIndex: number;
  productIndex: number;
  
  constructor(private http: HttpClient, private cartService: CartService) {
  }

  storeProduct(product: Product) {
    this.http
      .post(
        "https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products",
        product
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  updateProduct(product: Product, id: number) {
    const Url = 'https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products';
    const UrlProductId = `${Url}/${id}`
    this.http
      .put(
        UrlProductId,
        product
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  deleteProduct(id: number) {
    const Url = 'https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products';
    const UrlProductId = `${Url}/${id}`
    this.http
      .delete(
        UrlProductId
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  fetchProduct() {
    return this.http.get<Product[]>(
      "https://5e8be58cbe5500001689eddb.mockapi.io/api/v1/products"
    );
  }

  getProducts() {
    this.fetchProduct().subscribe(products => {
      this.products = products;
    })

    return this.products.slice();
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  getProduct(index: number) {
    this.fetchProduct().subscribe(products => {
      this.products = products;
    })
    
    this.cartIndex = index;
    return this.products[index];
  }

  getCartIndexItem() {
    return this.products[this.cartIndex];
  }

  addProductToCart(product: Product) {
    this.cartService.addProductCart(product); // add ingredients into shopping-list.service
  }

  getProductIndex(index: number) {
    return this.productIndex = index;
  }  
}
