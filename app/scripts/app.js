'use strict';

/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
(function() {
  var app = angular
    .module('F1App', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'angularVideoBg',
      'cgBusy',
      'timer'
    ])
    .value('cgBusyDefaults',{
      message:'Loading data...',
      backdrop: false,
      delay: 300,
      minDuration: 1000
    })
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'RaceController'
        })
        .when('/race/:season/:round', {
          templateUrl: 'views/raceDetail.html',
          controller: 'SingleRaceController'
        })
        .when('/drivers', {
          templateUrl: 'views/driverList.html',
          controller: 'DriversController'
        })
        .when('/drivers/:id', {
          templateUrl: 'views/driverDetail.html',
          controller: 'DriverController'
        })
        .when('/circuits', {
          templateUrl: 'views/circuitList.html',
          controller: 'CircuitsController'
        })
        .when('/circuits/:id', {
          templateUrl: 'views/circuitDetail.html',
          controller: 'CircuitController'
        })
        .when('/constructors', {
          templateUrl: 'views/constructorList.html',
          controller: 'ConstructorsController'
        })
        .when('/constructors/:id', {
          templateUrl: 'views/constructorDetail.html',
          controller: 'ConstructorController'
        })
        .when('/about', {
          templateUrl: 'views/about.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

})();