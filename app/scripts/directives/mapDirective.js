'use strict';

(function() {
    var app = angular.module('F1App');

    app.directive('addressBasedGoogleMap', function () {
        return {
            restrict: 'A',
            template: '<div id="addressMap"></div>',
            scope: {
                address: '=',
                zoom: '=',
                type: '='
            },
            controller: function ($scope) {
                var geocoder;
                var latlng;
                var map;
                var marker;
                var initialize = function () {
                    geocoder = new google.maps.Geocoder();
                    latlng = new google.maps.LatLng(-34.397, 150.644);
                    var mapType = (type.toUpperCase() === 'SATELLITE' ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.TERRAIN);
                    var mapOptions = {
                        zoom: $scope.zoom,
                        center: latlng,
                        mapTypeId: mapType
                    };
                    map = new google.maps.Map(document.getElementById('addressMap'), mapOptions);
                };
                var markAdressToMap = function () {
                    geocoder.geocode({ 'address': $scope.address }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        }
                    });
                };
                $scope.$watch('address', function () {
                    if ($scope.address !== undefined) {
                        markAdressToMap();
                    }
                });
                initialize();
            },
        };
    });

    app.directive('areaBasedGoogleMap', function () {
        return {
            restrict: 'A',
            template: '<div id="areaMap"></div>',
            scope: {           
                area: '=',
                zoom: '=',
                mapview: '@'
            },
            controller: function ($scope) {
                var mapOptions;
                var map;           
                var marker;
                 
                var initialize = function () { 
                    mapOptions = {
                        zoom: $scope.zoom,
                        center: new google.maps.LatLng(40.0000, -98.0000),
                        mapTypeId: ($scope.mapview == 'satellite') ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.TERRAIN
                    };
                    map = new google.maps.Map(document.getElementById('areaMap'), mapOptions);
                };
              
                var createMarker = function (area) {
                    var position = new google.maps.LatLng(area.Latitude, area.Longitude);
                    map.setCenter(position);
                    marker = new google.maps.Marker({
                        map: map,
                        position: position,
                        title: area.Name
                    });               
                };

                $scope.$watch('area', function (area) {
                    if (area !== undefined) {
                        createMarker(area);
                    }
                });

                initialize();
            },
        };
    });
})();