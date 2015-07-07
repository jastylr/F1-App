'use strict';

app.controller('VideoBkgController', function($scope) {
  $scope.videoId = '5emilZhzI70'; //'ESDcV0OuAp8'; //'M6VhPgBuM2I';

  $scope.callback = function(player) {
      $scope.pauseVideo = function() {
          player.pauseVideo();
      };
      $scope.playVideo = function() {
          player.playVideo();
      };
      $scope.setQuality = function(quality) {
      	if (quality === undefined) {
      		quality = 'default';
      	}
      	player.setPlaybackQuality(quality);
      }
      $scope.setQuality('hd720');
  };
});