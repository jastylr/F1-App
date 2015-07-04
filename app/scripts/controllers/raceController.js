'use strict';

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
      ergastAPIservice.getRaceResults(year).success(function (response) {
          $scope.raceResults = response.MRData.RaceTable.Races.reverse();
          console.log($scope.raceResults);
      });
    };

    // Retrive information about the next upcoming race and use it
    // to display a countdown timer on the main page
    ergastAPIservice.getNextRace().success(function (response) {
        
        // Get the date and time of the next race returned from the ergast API
        var raceDate = response.MRData.RaceTable.Races[0].date;
        var raceTime = response.MRData.RaceTable.Races[0].time;
        
        // Create a timestamp from the race date and time that will be
        // used to provide a countdown time until the race starts
        $scope.countdown = moment.utc(raceDate + ' ' + raceTime);
        
        // Save the data for the next race so that we can display it
        $scope.nextRace = response.MRData.RaceTable.Races[0];
    });

    // Clear the race filter
    $scope.clearFilter = function() {
      $scope.raceFilter = '';
    };
});


// SingleRaceController - used to retrieve data for a single, specific race
app.controller('SingleRaceController', function($scope, $routeParams, ergastAPIservice, Flickr) {
  
  // Setupa a couple of parameters coming from the route
  $scope.season = $routeParams.season;
  $scope.round = $routeParams.round;

  $scope.pageClass = 'page-race-result';

  // Get results for a particular race.
  ergastAPIservice.getRaceResult($scope.season, $scope.round).success(function (response) {
      // Save the race data in $scope.raceResult
      $scope.raceResult = response.MRData.RaceTable.Races[0];
      
      // Setup a scope object to store the location of the race circuit to be displayed
      // by a custom Google Maps directive
      // $scope.Area = {
      //   Name: $scope.raceResult.Circuit.Location.locality,
      //   Latitude: $scope.raceResult.Circuit.Location.lat,
      //   Longitude: $scope.raceResult.Circuit.Location.long
      // };

      // Call the getRacePhotos method which takes a search string paramter which I set to
      // the winning driver's name, the season and the name of the race and returns any matching
      // photos from the Flickr service
      $scope.getRacePhotos($scope.raceResult.Results[0].Driver.givenName + ' ' + $scope.raceResult.Results[0].Driver.familyName + ' ' + $scope.raceResult.season + ' ' + $scope.raceResult.raceName);
      console.log($scope.raceResult);
  });

  // Call the Flickr API service to return a set of photos matching our search string
  $scope.getRacePhotos = function(race) {
      Flickr.getFlickrPhoto(race).then(function(data) {
          $scope.photos = data.data.photos.photo;
      });
  };
});