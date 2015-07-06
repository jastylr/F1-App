'use strict';

app.controller('CircuitsController', function($scope, $http, ergastAPIservice) {
  $scope.circuits = [];

  ergastAPIservice.getCircuits().success(function (response) {
      $scope.circuits = response.MRData.CircuitTable.Circuits;
      console.log($scope.circuits);
  });
});

app.controller('CircuitController', function($scope, $routeParams, $filter, $http, ergastAPIservice, wikiService) {
  
  $scope.circuit = {};
  $scope.id = $routeParams.id;

  ergastAPIservice.getCircuit($scope.id).success(function (response) {
      
  	$scope.circuit = response.MRData.CircuitTable.Circuits[0];

  	// Setup a scope object to store the location of the race circuit to be displayed
  	// by a custom Google Maps directive
  	$scope.Area = {
  	  Name: $scope.circuit.Location.locality,
  	  Latitude: $scope.circuit.Location.lat,
  	  Longitude: $scope.circuit.Location.long
  	};

  	// Call the Wikipedia API to get information on the circuit and limit the response
  	// to 2500 characters
    var search = $scope.circuit.circuitName;
    wikiService.get(search).success(function(response) {
    	var pageId = response.query.pageids[0];
    	$scope.circuitInfo = $filter('limitTo')(response.query.pages[pageId].extract, 2500);
    	$scope.wikiUrl = response.query.pages[pageId].canonicalurl;
    });
  });
});