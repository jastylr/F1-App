'use strict';

(function() {
  var app = angular.module('F1App');

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
        	quality = quality === undefined ? 'default' : quality;
        	
        	player.setPlaybackQuality(quality);
        };
        $scope.muteVideo = function() {
            player.mute();
        }

        $scope.setQuality();
        $scope.muteVideo();
    };
  });
})();