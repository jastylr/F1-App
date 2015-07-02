'use strict';

app.controller('DriverController', function($scope, $routeParams, ergastAPIservice) {
    $scope.nameFilter = null;
    $scope.driversList = [];
    $scope.id = $routeParams.id;

    ergastAPIservice.getDriver($scope.id).success(function (response) {
        $scope.driver = response.MRData.DriverTable.Drivers[0];
    });

});