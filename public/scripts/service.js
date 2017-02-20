 'use strict';
 angular.module('app')

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
      if(recipe._id == undefined){//if recipe is new
        return $http.post('/api/recipes', recipe);
      }else{//if user is editing a recipe
        return $http.put('/api/recipes/'+ recipe._id, recipe);
      }
    }
  })