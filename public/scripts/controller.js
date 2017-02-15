'use strict';

var app = angular.module('app', ['ngRoute'])

.controller('RecipesController', function($scope, dataService, $location){
 
  dataService.getRecipes(function(response){
    console.log(response.data);
    $scope.recipes = response.data;
  })

  dataService.getCategories(function(resp){
    $scope.categories = resp.data;
  })

  $scope.deleteRecipe = function(recipe, $index){
    dataService.deleteRecipe(recipe);
    $scope.recipes.splice($index, 1);
  };

  $scope.changeView = function(add){
    $location.path(add);
  }

})

.controller('RecipeDetailController', function($scope, dataService, $location){
  

  dataService.getCategories(function(resp){
    $scope.categories = resp.data;
  })

  dataService.getID(function(resp){
    $scope.recipe = resp.data;
    console.log($scope.recipe);
  })

  dataService.getFoodItems(function(resp){
    $scope.foodItems = resp.data;
    console.log($scope.foodItems);
  })

  $scope.deleteIngredient = function(ingredient, $index){
    //dataService.delIngredient(ingredient);
    $scope.recipe.ingredients.splice($index, 1);
  }

  $scope.delStep = function($index){
    $scope.recipe.steps.splice($index, 1);
  }

  $scope.addStep = function(){
    $scope.recipe.steps.push({description: ''});
  }

  $scope.add = function(){
    //dataService.addIngredient(ingredients);
    $scope.recipe.ingredients.push({
      foodItem: '',
      condition: '',
      amount: ''
      });
  }
})

.service('dataService', function($http, $routeParams){

     this.getRecipes = function(callback){
      $http.get('/api/recipes')
        .then(callback)
      } //get recipes
    
    this.getCategories = function(callback){
      $http.get('/api/categories')
        .then(callback)
    }

  
    this.getID = function(callback){
      if($routeParams.id != undefined){
        $http.get('/api/recipes/' + $routeParams.id).then(callback)
      }
    }
  

    this.deleteRecipe = function(recipe){}

    this.getFoodItems =function(callback){
      $http.get('api/fooditems').then(callback)
    }
   


})