var app = angular.module('mytodo',['ngMaterial', 'ngMdIcons']);

  app.controller('MainController', ['$http', function($http){
    var my = this;
    my.todos={};
    my.formData ={};
    $http.get('/api/')
      .success(function(data){
        my.todos= data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error:  ' + data);
      });

    this.createTodo = function(){
      console.log(my.formData)
      $http.post('/api/create/', my.formData)
        .success(function(data) {
          my.formData={};
          my.todos = data;
          console.log(data);
        })
        .error(function(data){
          console.log("Error " + data);
        });
    };
    this.deleteTodo = function(id){
      $http.delete('/api/delete/' + id )
        .success(function( data ){
          my.todos = data;
        })
        .error(function( data ){
          consolelog("Error" + data)
        });
    };

  }]);
