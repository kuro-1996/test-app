import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]; //get the id from route.params
      this.recipe = this.recipeService.getRecipe(this.id); // pass data of recipe[this.id] in recipeService into this.recipe
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients); //add ingredient of this.recipe into shopping-list
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route }); //navigate to recipe-edit.component
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id); //delete recipe[this.id] in recipeService
    this.router.navigate(["/recipes"]); //navigate to recipes.component
  }
}
