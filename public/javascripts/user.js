var user = angular.module('user', []);

user.controller("login", function($scope, notification, userFactory){
  $scope.noti = "notification.html";
  $scope.login = function(){
    userFactory.login({
      username: $scope.username,
      password: $scope.password
    });
  }
});

user.controller("signup", function($scope){
});

user.factory("userFactory", function($http, notification){
  var o = {};

  o.login = function(credentials){
    return $http.post('/login',credentials)
      .success(function(data){
        window.location = "/"
        console.log(data);
      })
    .error(function(err, status, headers, config){
      console.log(err);
        if (status == 403){
          notification.changeToDanger();
        } else if (status == 401) {
          notification.changeToWarning();
        }
        notification.setNotificationMessage(err);
        notification.showNotification();
      });
  }

  return o;
});

