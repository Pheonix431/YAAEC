var app = angular.module("cart", []);

app.controller("something", function($scope, $http) {
  $scope.items = window.x;

  $scope.deleteItem = function(id) {
    $http.delete("/users/delete/cart/" + id)
      .success(function(data) {
        $scope.items = $scope.items.filter(function(item) {
          return item._id != id;
        });
      })
      .error(function(data) {
      });
  }
});
