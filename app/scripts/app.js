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
      .when('/driver/:id', {
        templateUrl: 'views/driverDetail.html',
        controller: 'DriverController'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
