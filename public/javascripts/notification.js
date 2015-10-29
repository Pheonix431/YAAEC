var app = angular.module("notificationModule", []);

app.factory("notification", function($timeout){
  var o = {};

  o.setNotificationMessage = function(message){
    console.log(message);
    $("#tes1 div p").text("");
    $("#tes1 div p").append(message);
  }
  o.showNotification = function(){
    $("#tes1").fadeIn(500);
    $timeout(function(){
      $("#tes1").fadeOut(500);
    },3000);
  }
  o.changeToWarning = function(){
    $("#tes1 div").removeClass("alert-success");
    $("#tes1 div").removeClass("alert-danger");
    $("#tes1 div").addClass("alert-warning");
  }
  o.changeToDanger = function(){
    $("#tes1 div").removeClass("alert-success");
    $("#tes1 div").removeClass("alert-warning");
    $("#tes1 div").addClass("alert-danger");
  }
  o.changeToSuccess = function(){
    $("#tes1 div").removeClass("alert-danger");
    $("#tes1 div").removeClass("alert-warning");
    $("#tes1 div").addClass("alert-success");
  }

  return o;
});
