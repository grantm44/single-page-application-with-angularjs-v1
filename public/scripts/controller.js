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

  $scope.newRecipe = function(){
      $scope.recipe = {};
      $scope.recipe.ingredients =[];
      $scope.recipe.steps = [];
  };

  $scope.save = function(recipe){
    console.log(recipe);
    dataService.saveRecipe(recipe);
    $location.path('/');
  }  

  $scope.cancel = function(){
    $location.path('/');
  }
})

.service('dataService', function($http, $routeParams){

     this.getRecipes = function(callback){
      $http.get('/api/recipes')
        .then(callback)
      } //get recipes
    
    //get all categories
    this.getCategories = function(callback){
      $http.get('/api/categories')
        .then(callback)
    }

    this.add = function(recipe){
      $http.post('/api/recipes', recipe)
    }  
    //get one recipe for id
    this.getID = function(callback){
      if($routeParams.id != undefined){
        $http.get('/api/recipes/' + $routeParams.id).then(callback);
      }
      else{
        console.log('called');
        return null;
      }
    }
  
    this.deleteRecipe = function(recipe){
      console.log(recipe._id);
      $http.delete('/api/recipes/' + recipe._id);
    }

    //get all ingredients
    this.getFoodItems =function(callback){
      $http.get('api/fooditems').then(callback);
    }
    
    this.saveRecipe = function(recipe){
      if(recipe._id == undefined){
        console.log(recipe._id)
        $http.post('/api/recipes', recipe);
        console.log('saved');
      }else{
        $http.put('/api/recipes/'+ recipe._id, recipe);
        console.log('edited');
      }
    }

})