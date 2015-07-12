'use strict';

(function() {
    var app = angular.module('F1App');

    app.controller('DriversController', function($scope, $http, ergastAPIservice) {
        $scope.drivers = [];

        $scope.driversPromise = ergastAPIservice.getDrivers().success(function (response) {
            //$scope.drivers = response.MRData.DriverTable.Drivers;
            $scope.drivers = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    });

    app.controller('DriverController', function($scope, $http, $routeParams, $filter, ergastAPIservice, wikiService, Flickr) {
        $scope.nameFilter = null;
        $scope.id = $routeParams.id;
        var driverName = '';

        $scope.driverPromise = ergastAPIservice.getDriver($scope.id).success(function (response) {
            //$scope.driver = response.MRData.DriverTable.Drivers[0];
            $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;

            driverName = $scope.driver.givenName + '_' + $scope.driver.familyName;
            $scope.driverBio(driverName);
            $scope.getDriverPhoto(driverName);
        });

        // Make a call to the Wiki API to retrive driver bio information
        $scope.driverBio = function(driver) {
            wikiService.get(driver).then(function(data) {
                var pageId = data.data.query.pageids[0];
                $scope.wikiData = data.data.query.pages[pageId].extract;
                $scope.wikiUrl = data.data.query.pages[pageId].canonicalurl;
            });
        };

        $scope.getDriverPhoto = function(driverName) {

            Flickr.getFlickrPhoto(driverName).then(function(data) {
                $scope.photo = data.data.photos.photo[0];
            });
        };
            
    });
})();