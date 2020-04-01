import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients :Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomotoes', 10)];

  ingredientName: string;
  ingredientAmount: number;
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  onAddAmount(amount: number) {
    // return this.ingredientAmount = amount;
    console.log('onAddAmount');
    
  }

  onAddName(name: string) {
    // return this.ingredientName = name;
    console.log('onAddName');
    
  }

  onPush() {
    this.ingredients.push(new Ingredient(this.ingredientName,this.ingredientAmount));
    console.log(this.ingredients);
    
  }
}
