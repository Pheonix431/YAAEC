var app = angular.module("app", []);

app.controller("home", function($scope, $http){
  $http.get('/get/all').success(function(data){
    console.log(data);
    $scope.products = data;
  });
});
