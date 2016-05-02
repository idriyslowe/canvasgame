/* global angular */

// you could also use ".controller" or ".directive" if you want since we're within scope

var spellSword = angular.module('spellSword', []);
// factory function creates the canvas element
// this directive is broken if it comes after controller
// add an array of libraries i need before the function. include those same libraries in the function args
    // this directive should draw out are canvas and the game loop
    // check "link:" in example game. it shows a game loop
    // gameServive, renderService, and graphicsEngineService are neccessary for what we're doing.
    // interval is breaking the introButtons function
spellSword.directive('spellSwordGame', function() {
  return {
    // restrict A only matches attribute spellSwordGame
    restrict: 'A',
    template: '<canvas id="gameCanvas" width="1000" height="640" style="border:1px solid #000000; background:#800080;"></canvas>'
  };
});

// start page start and stop game buttons
spellSword.controller('homeCtrl', ['$scope', function($scope) {

  $scope.introButtons = function(input) {
    if (input === 'intro') {
      $scope.gameIntro = true;
      $scope.gameStart = false;
    } else if (input === 'gameStart') {
      $scope.gameIntro = false;
      $scope.gameStart = true;
    }
  };

}]);