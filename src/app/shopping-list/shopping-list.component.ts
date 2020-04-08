import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients(); //get the value of shopping-list.service's ingredients into this.ingredients 
    this.subscription = this.slService.ingredientsChanged //listen to ingredients change in shopping-list.service and pass the value into this.ingredients
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startEdit.next(index); //push index into starEdit subject in shopping-list.service
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
