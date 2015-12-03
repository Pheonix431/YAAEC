var app = angular.module("app", ['notificationModule']);

app.controller("home", function($scope, $http){
  $http.get('/get/all').success(function(data){
    console.log(data);
    $scope.products = data;
  });

  $scope.addToCart = function(product_id, notification){
    $http.post('/users/add/cart', { id: product_id})
      .success(function(data){
        console.log(data);
      })
      .error(function(){
      });
  }
});
