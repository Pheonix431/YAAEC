var app = angular.module("checkout", []);

app.controller("page", function($scope) {
  $scope.items = window.x;
  $scope.user = window.user;

  $scope.total = 0;
  $scope.items.forEach(function(item) {
    $scope.total = $scope.total + item.price;
  });
});

