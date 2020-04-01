import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Recipe 1', 'This is just a test', 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21-600x900.jpg'),
    new Recipe('Recipe 2', 'This is just a test', 'https://www.themediterraneandish.com/wp-content/uploads/2019/04/Italian-Baked-Chicken-Recipe-6.jpg')
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
