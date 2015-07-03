'use strict';

app.controller('NavController', function($scope, $location) {

  $scope.isActive = function (viewLocation) {
    //console.log('location: ' + $location.path());
    var active = (viewLocation === $location.path());
    return active;
  };
});