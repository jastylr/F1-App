'use strict';

(function() {
	var app = angular.module('F1App');

	app.factory('wikiService', function($http) {
	      
	    var wikiService = {
	        get: function(title) {
	            return $http.jsonp('http://en.wikipedia.org/w/api.php?titles=' + title + '&rawcontinue=true&action=query&format=json&prop=extracts|info&inprop=url&indexpageids&redirects&callback=JSON_CALLBACK');
	        }
	    };
	    
	    return wikiService;
	});
})();