import { Component, OnInit, Input } from "@angular/core";
import { ProductListService } from "../product.service";
import { Product } from "../product.model";
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/API.service';

@Component({
  selector: "app-form-select",
  templateUrl: "./form-select.component.html",
  styleUrls: ["./form-select.component.scss"],
})
export class FormSelectComponent implements OnInit {
  constructor(private productService: ProductListService ,private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.get('products').subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);
      
    });
  }

  @Input() label: string;
  private products: Product[];
  @Input() Options: string[];
  OptionSelect: string;
  productsClone: Product[];
  @Input() productProperty: string;

  onSelect() {
    if (this.label === "type") {
      this.productsClone = this.products.filter((item) => {
        return item.type === this.OptionSelect; 
      });
      
      if (this.OptionSelect === "") {
        this.productService.productChanged.next(this.products);
        this.productService.configItem.next(this.products.length);
      } else {
        this.productService.productChanged.next(this.productsClone);
        this.productService.configItem.next(this.productsClone.length);
      }
    } else {
      if (this.OptionSelect === this.Options[0]) {
        this.products.sort(this.compareValues(this.productProperty));
      } else if (this.OptionSelect === this.Options[1]) {
        this.products.sort(this.compareValues(this.productProperty, "desc"));
      }
  
      this.productService.productChanged.next(this.products);
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
}
