import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      
    ])
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  
  // list of recipes with (name, description, img) in service.ts
  recipes: Recipe[]

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute){

  }

  ngOnInit(){
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
