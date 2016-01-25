'use strict';

(function() {
  
  var app = angular.module('F1App');

  app.controller('NavController', function($scope, $location, $window) {
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

    // Detect scroll changes in the window and update the nav and logo
    // classes to enable animation of their sizes
    angular.element($window).bind(
      "scroll", function() {
         //console.log(window.pageYOffset);
         if(window.pageYOffset > 85) {
           $scope.navClass = 'sm';
           $scope.logoClass = 'logo-sm';
         } else {
           $scope.navClass = 'lg';
           $scope.logoClass = 'logo-lg';
         }
         $scope.$apply();
     });
  });

})();