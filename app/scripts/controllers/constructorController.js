'use strict';

(function() {

	var app = angular.module('F1App');

	app.controller('ConstructorsController', function($scope, $http, ergastAPIservice) {
	  
	  $scope.constructors = [];
	  
	  $scope.constructorPromise = ergastAPIservice.getConstructors()
	  	.success(function (response) {
	  		
	      $scope.constructors = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
	      console.log($scope.constructors);
	  	}
  	);
	});

	app.controller('ConstructorController', function($scope, $http, $filter, $routeParams, ergastAPIservice, wikiService) {
	  
	  $scope.id = $routeParams.id;

	  $scope.constructorPromise = ergastAPIservice.getConstructor($scope.id)
	  	.success(function (response) {
	      $scope.constructor = response.MRData.ConstructorTable.Constructors[0];

	      // Get the Wiki page title from the Wiki URL that
	      // is part of the constructor response and pass it to the Wiki service
	      var wikiTitle = $scope.constructor.url.substring($scope.constructor.url.lastIndexOf('/')+1);
	      $scope.constructorPromise = wikiService.getByTitle(wikiTitle).success(function(response) {
	      	$scope.constructorInfo = response.query.pages[0].extract;
	      	$scope.wikiUrl = response.query.pages[0].canonicalurl;
	      });
	  	}
  	);
	});
})();