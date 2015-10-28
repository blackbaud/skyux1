/*global angular */

(function () {
    'use strict';

    function MediaBreakpointsTestController($scope, bbMediaBreakpoints) {
        var self = this;

        function mediaBreakpointCallback(breakpoint) {
            var p;

            for (p in breakpoint) {
                if (breakpoint.hasOwnProperty(p) && breakpoint[p]) {
                    self.status = p;
                    break;
                }
            }
        }

        bbMediaBreakpoints.register(mediaBreakpointCallback);

        $scope.$on('$destroy', function () {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        });
    }

    MediaBreakpointsTestController.$inject = ['$scope', 'bbMediaBreakpoints'];

    angular.module('stache').controller('MediaBreakpointsTestController', MediaBreakpointsTestController);
}());
