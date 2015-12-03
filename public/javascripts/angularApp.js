var app = angular.module("app", ['notificationModule']);

app.controller("home", function($scope, $http){
  $http.get('/get/all').success(function(data){
    console.log(data);
    $scope.products = data;
  });

  $scope.addToCart = function(product_id){
    $http.post('/users/add/cart', { id: product_id })
      .success(function(data){
        window.location = "/users/get/cart";
      })
      .error(function(){
      });
  }
});
