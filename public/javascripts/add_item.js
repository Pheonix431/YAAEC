var app = angular.module("item", []);

app.controller("page", function($scope, $http){
  $scope.show = function(){
    console.log($("#date").val()); 
  }
  $scope.addItem = function(){
  }
});
