'use strict';

app.factory('F1APIservice', function($http) {

  var f1API = {};

  f1API.getRaceResults = function(year) {
    year = year === undefined ? 'current' : year;
    
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/' + year + '/results/1.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getRaceResult = function(season, round) {
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/' + season + '/' + round + '/results.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getNextRace = function() {
    return $http({
      method: 'JSONP',
      url: 'http://ergast.com/api/f1/current/next.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getDrivers = function() {
    return $http({
      method: 'JSONP', 
      //url: 'http://ergast.com/api/f1/current/drivers.json?callback=JSON_CALLBACK'
      url: 'http://ergast.com/api/f1/current/driverStandings.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getDriver = function(id) {
    return $http({
      method: 'JSONP', 
      //url: 'http://ergast.com/api/f1/drivers/' + id + '.json?callback=JSON_CALLBACK'
      url: 'http://ergast.com/api/f1/current/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getDriverStandings = function(id) {
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/drivers/' + id + '/driverStandings.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getCircuits = function() {
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/current/circuits.json?callback=JSON_CALLBACK'
    });
  };

  f1API.getCircuit = function(id) {
    return $http({
      method: 'JSONP', 
      url: 'http://ergast.com/api/f1/circuits/' + id + '.json?callback=JSON_CALLBACK'
    });
  };

  return ergastAPI;
});
