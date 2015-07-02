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

    // Get race results for all completed races and display their
    // data on the main page.
    ergastAPIservice.getRaceResults().success(function (response) {
        $scope.raceResults = response.MRData.RaceTable.Races.reverse();
        console.log($scope.raceResults);
    });

    // Retrive information about the next upcoming race and use it
    // to display a countdown timer on the main page
    ergastAPIservice.getNextRace().success(function (response) {
        var raceDate = response.MRData.RaceTable.Races[0].date;
        var raceTime = response.MRData.RaceTable.Races[0].time;
        $scope.countdown = moment.utc(raceDate + ' ' + raceTime);  
        $scope.nextRace = response.MRData.RaceTable.Races[0];
        console.log($scope.nextRace);

    });

    // Clear the race filter
    $scope.clearFilter = function() {
      $scope.raceFilter = '';
    };
});

app.controller('SingleRaceController', function($scope, $routeParams, ergastAPIservice) {
  $scope.round = $routeParams.round;
  $scope.pageClass = 'page-race-result';

  // Get results for a particular race.
  ergastAPIservice.getRaceResult($scope.round).success(function (response) {
      $scope.raceResult = response.MRData.RaceTable.Races[0];
      console.log($scope.raceResult);
  });
});