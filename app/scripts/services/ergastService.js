'use strict';

app.factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getRaceResults = function(year) {
      if (year === undefined) {
        year = 'current';
      }

      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/' + year + '/results/1.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getRaceResult = function(season, round) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/' + season + '/' + round + '/results.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getNextRace = function() {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/current/next.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        //url: 'http://ergast.com/api/f1/current/drivers.json?callback=JSON_CALLBACK'
        url: 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDriver = function(id) {
      return $http({
        method: 'JSONP', 
        //url: 'http://ergast.com/api/f1/drivers/' + id + '.json?callback=JSON_CALLBACK'
        url: 'http://ergast.com/api/f1/current/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDriverStandings = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getCircuits = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/current/circuits.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getCircuit = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/circuits/' + id + '.json?callback=JSON_CALLBACK'
      });
    };

    return ergastAPI;
  });
