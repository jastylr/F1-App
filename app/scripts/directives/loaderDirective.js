'use strict';

app.directive('routeLoadingIndicator', function($rootScope) {
	return {
		restrict: 'E',
		template: '<div ng-class="route-loader" ng-if="isRouteLoading">Loading...</div>',
		link: function(scope, elem, attrs) {
			scope.isRouteLoading = false;

			$rootScope.$on('$routeChangeStart', function() {
				scope.isRouteLoading = true;
				
			});

			$rootScope.$on('$routeChangeSuccess', function() {
				scope.isRouteLoading = false;
			});
		}
	};
});