import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // list of recipes with (name, description, img, ingredients)

  /* private recipes: Recipe[] = [
    new Recipe(
      'Soja Chicken',
      'First recipe made succesfully',
      'https://hot-thai-kitchen.com/wp-content/uploads/2015/03/gai-kem-sm.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Rice', 20)
      ]),
    new Recipe('Cachapa',
    'Technically First but doesnt count',
    'https://imag.bonviveur.com/presentacion-principal-de-las-cachapas-venezolanas.jpg',
    [
      new Ingredient('Corn',5),
      new Ingredient('Cheese',10)
    ])
  ]; */

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  onAddToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}