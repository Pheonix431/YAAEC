var app = angular.module("product", []);

app.controller("page", function($scope) {
  $scope.product = window.prod;
  console.log($scope.product);
});
