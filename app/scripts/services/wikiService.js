'use strict';

app.factory('wikiService', function($http) {
      
    var wikiService = {
        get: function(title) {
            return $http.jsonp('http://en.wikipedia.org/w/api.php?titles=' + title + '&rawcontinue=true&action=query&format=json&prop=extracts&indexpageids&callback=JSON_CALLBACK');
        }
    };
    
    return wikiService;
});