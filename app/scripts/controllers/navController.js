'use strict';

app.controller('NavController', function($scope, $location) {
  // Mobile menu is initally collapsed
  $scope.isCollapsed = true;
  
  // Detect when the route changes (ie. a menu link was clicked)
  $scope.$on('$routeChangeSuccess', function () {
      // Set isCollapsed to true. The ng-class directive on the navbar
      // will bet set to "collapse" whenever the route changes 
      $scope.isCollapsed = true;
  });

  // Used to determine the active link in the navbar so that
  // a class can be set to style it
  $scope.isActive = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };
});