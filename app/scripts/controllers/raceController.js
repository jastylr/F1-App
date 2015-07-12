'use strict';

(function() {
  var app = angular.module('F1App');

  app.controller('RaceController', function($scope, ergastAPIservice) {
      $scope.raceFilter = '';
      $scope.nextRace = {};
      $scope.raceResults = [];
      $scope.pageClass = 'page-main';

      $scope.searchFilter = function (race) {
          var keyword = new RegExp($scope.raceFilter, 'i');
          return !$scope.raceFilter || keyword.test(race.raceName);
      };

      // Get race results by year
      $scope.getRaceResults = function(year) {
        
        $scope.raceseason = year;

        $scope.resultsPromise = ergastAPIservice.getRaceResults(year).success(function (response) {
            $scope.raceResults = response.MRData.RaceTable.Races.reverse();
        });
      };

      $scope.getNextRace = function() {
        
        // Retrive information about the next upcoming race and use it
        // to display a countdown timer on the main page
        $scope.nextRacePromise = ergastAPIservice.getNextRace().success(function (response) {
            
            // Get the date and time of the next race returned from the ergast API
            var raceDate = response.MRData.RaceTable.Races[0].date;
            var raceTime = response.MRData.RaceTable.Races[0].time;
            
            // Create a timestamp from the race date and time that will be
            // used to provide a countdown time until the race starts
            $scope.countdown = moment.utc(raceDate + ' ' + raceTime);
            
            // Save the data for the next race so that we can display it
            $scope.nextRace = response.MRData.RaceTable.Races[0];
        });
      };

      // Clear the race search filter
      $scope.clearFilter = function() {
        $scope.raceFilter = '';
      };

      // Detect when a user hovers over one of the race results and
      // display a message
      $scope.hover = function(race) {
        $scope.hoverMsg = 'View results for ' + race.season + ' ' + race.raceName;
        // Only affect the currently hovered item by using this instead of scope
        // which ng-show will use to determine whether to display the message
        this.hovering = !this.hovering;
      };
  });


  // SingleRaceController - used to retrieve data for a single, specific race
  app.controller('SingleRaceController', function($scope, $filter, $routeParams, ergastAPIservice, Flickr) {
    
    // Setupa a couple of parameters coming from the route
    $scope.season = $routeParams.season;
    $scope.round = $routeParams.round;
    $scope.photos = [];

    $scope.pageClass = 'page-race-result';

  //////// TEST 
    // ergastAPIservice.getRaceResults('2015').success(function (response) {
    //   $scope.raceResults = response.MRData.RaceTable.Races.reverse();
    //   var result = $filter('filter')($scope.raceResults, { season: $scope.season, round: $scope.round });
    //   $scope.raceResult = result[0];
    //   $scope.getRacePhotos($scope.raceResult.Results[0].Driver.givenName + ' ' + $scope.raceResult.Results[0].Driver.familyName + ' ' + $scope.raceResult.season + ' ' + $scope.raceResult.raceName)
    //   console.log($scope.raceResult);
    // });
  //////// END TEST

    // Get results for a particular race.
    $scope.resultPromise = ergastAPIservice.getRaceResult($scope.season, $scope.round).success(function (response) {
        // Save the race data in $scope.raceResult
        $scope.raceResult = response.MRData.RaceTable.Races[0];
        
        // Call the getRacePhotos method which takes a search string paramter which I set to
        // the winning driver's name, the season and the name of the race and returns any matching
        // photos from the Flickr service
        $scope.getRacePhotos($scope.raceResult.Results[0].Driver.givenName + ' ' + $scope.raceResult.Results[0].Driver.familyName + ' ' + $scope.raceResult.season + ' ' + $scope.raceResult.raceName);
    });

    // Call the Flickr API service to return a set of photos matching our search string
    $scope.getRacePhotos = function(race) {
        Flickr.getFlickrPhoto(race).then(function(data) {
            $scope.photos = data.data.photos.photo;
        });
    };
  });

})();