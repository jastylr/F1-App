'use strict';

(function() {
  var app = angular.module('F1App');

  app.factory('Flickr', function($http) {
    var base = 'https://api.flickr.com/services',
        apiKey = '134a9fcc3efe82d2db0a296282a176f6';

    // Set our API key from the .config section
    // of our app
    this.setApiKey = function(key) {
      apiKey = key || apiKey;
    };

    // Service interface
    var service = {
      // Define our service API here
      getFlickrPhoto: function(text) {
        return $http({
          method: 'JSONP',
          url: base + '/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=' + text,
          params: {
          	'sort': 'relevance',
          	'per_page': 5,
          	'tag_mode': 'all',
            'format': 'json',
            'jsoncallback': 'JSON_CALLBACK'
          }
        });
      }
  	};

    return service;
  });
})();