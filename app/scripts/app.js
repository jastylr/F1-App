'use strict';

/**
 * @ngdoc overview
 * @name myAppApp
 * @description
 * # myAppApp
 *
 * Main module of the application.
 */
var app = angular
  .module('F1App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularVideoBg',
    'timer'
  ]).config(function ($routeProvider) {
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
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
