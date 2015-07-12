'use strict';

(function() {
	var app = angular.module('F1App');

	app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
      return {
        'request': function (config) {
          $rootScope.$broadcast('loading-started');
          return config || $q.when(config);
        },
        'response': function (response) {
          $rootScope.$broadcast('loading-complete');
          return response || $q.when(response);
        },
         'responseError': function (rejection) {
            $rootScope.$broadcast('loading-complete');
            return $q.reject(rejection);
        }
      };
    });
	});

	app.factory('loadingCounts', function () {
    return {
      enableCount: 0,
      disableCount: 0
    };
	});

	app.directive('loadingIndicator', function (loadingCounts, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$on('loading-started', function (e) {
          loadingCounts.enableCount++;
          console.log('displaying indicator ' + loadingCounts.enableCount);
          //only show if longer than one sencond
          $timeout(function () {
              if (loadingCounts.enableCount > loadingCounts.disableCount) {
                element.show();
                //element.css({ 'display': '' });
              }
          }, 500);  
        });
        scope.$on('loading-complete', function (e) {
          loadingCounts.disableCount++;
          console.log('hiding indicator ' + loadingCounts.disableCount);
          if (loadingCounts.enableCount == loadingCounts.disableCount) {
              element.hide();
              //element.css({ 'display': 'none' });
          }
        });
      }
    };
	});
})();