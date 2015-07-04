'use strict';

app.controller('DriverController', function($scope, $http, $routeParams, ergastAPIservice, wikiService, Flickr) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.id = $routeParams.id;
    var driverName = '';

    ergastAPIservice.getDriver($scope.id).success(function (response) {
        $scope.driver = response.MRData.DriverTable.Drivers[0];
        driverName = $scope.driver.givenName + '_' + $scope.driver.familyName;
        $scope.driverBio(driverName);
        $scope.getDriverPhoto(driverName);
    });

    // Make a call to the Wiki API to retrive driver bio information
    $scope.driverBio = function(driver) {
        wikiService.get(driver).then(function(data) {
            console.log(data);
            var pageId = data.data.query.pageids[0];
            $scope.wikiData = data.data.query.pages[pageId].extract;
        });
    };

    $scope.getDriverPhoto = function(driverName) {
        Flickr.getFlickrPhoto(driverName).then(function(data) {
            $scope.photo = data.data.photos.photo[0];
            console.log($scope.photo);
        });
    };
        
});