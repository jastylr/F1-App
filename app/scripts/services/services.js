'use strict';

app.factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getRaceResults = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/current/results/1.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getRaceResult = function(round) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/current/' + round + '/results.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getNextRace = function() {
      return $http({
        method: 'JSONP',
        url: 'http://ergast.com/api/f1/current/next.json?callback=JSON_CALLBACK'
      });
    };

    ergastAPI.getDriver = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/drivers/' + id + '.json?callback=JSON_CALLBACK'
      });
    };

    return ergastAPI;
  });
