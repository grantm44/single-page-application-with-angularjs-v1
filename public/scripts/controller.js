'use strict';

var app = angular.module('app', ['ngRoute'])

.controller('RecipesController', function($scope, dataService, $location){
 
  dataService.getRecipes(function(response){
    $scope.recipes = response.data;//$scope.recipes for all recipes
  })

  dataService.getCategories(function(resp){
    $scope.categories = resp.data;
  })

  $scope.deleteRecipe = function(recipe, $index){
    dataService.deleteRecipe(recipe);
    console.log(recipe);
    $scope.recipes.splice($index, 1);
  };

  $scope.changeView = function(add){
    $location.path(add);
    console.log($scope.recipes);
  }

})

.controller('RecipeDetailController', function($scope, dataService, $location){
  
  //categories
  dataService.getCategories(function(resp){
    $scope.categories = resp.data;
  })

  //ingredients
  dataService.getFoodItems(function(resp){
    $scope.foodItems = resp.data;
  })


  $scope.deleteIngredient = function(ingredient, $index){
    //dataService.delIngredient(ingredient);
    $scope.recipe.ingredients.splice($index, 1);
  }

  $scope.delStep = function($index){
    $scope.recipe.steps.splice($index, 1);
  }

  //add new step to recipe
  $scope.addStep = function(){
    $scope.recipe.steps.push({description: ''});
  }

  //create new ingredient for recipe
  $scope.addIngredient = function(){
    $scope.recipe.ingredients.push({
      foodItem: '',
      condition: '',        
      amount: ''
    });
  }
  
   //get one recipe
  dataService.getID(function(resp){
    $scope.recipe = resp.data;
  })
  //object when user adds a new recipe
  $scope.newRecipe = function(){
      $scope.recipe = {};
      $scope.recipe.ingredients =[];
      $scope.recipe.steps = [];
  };

  //save recipe
  $scope.save = function(recipe){
    dataService.saveRecipe(recipe).then(function (response){
      if(response){
        console.log(response.data);
        $location.path('/');
      }
    }, function (error){
      console.log(error.data.errors);
      $scope.catError = error.data.errors.category;
      $scope.cookTimeError = error.data.errors.cookTime;
      $scope.descError = error.data.errors.description;
      $scope.prepError = error.data.errors.prepTime;
    });
  }  

  $scope.cancel = function(){
    $location.path('/');
  }
  $scope.errorCheck = function(){
    if($scope.catError || $scope.cookTimeError || $scope.descError || $scope.prepError){
      return true;
    }else{
      return false;
    }
  }
})



