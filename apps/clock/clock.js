var module = angular.module('clock', ['angularMoment']);

module.controller('TimeCtrl', function($scope, $interval) {
  var tick = function() {
    $scope.clock = moment().format("h:mm a");
  }
  tick();
  $interval(tick, 1000);
});