var app = angular.module("home", []);

app.controller("products", function($scope, $http){

  $http.get('/get/all').success(function(data){
    console.log(data);
    $scope.items = data;
  });

  $scope.addToCart = function(product_id){
    $http.post('/users/add/cart', { id: product_id })
      .success(function(data) {
        window.location = "/users/get/cart";
      })
      .error(function(){
      });
  }
});
