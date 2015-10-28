/*global angular */

(function () {
    'use strict';

    function WindowServiceController($scope, bbWindow) {
        var self = this;

        self.windowTitle = '';
        self.scrollbarWidth = null;

        self.scrollbarWidth = bbWindow.getScrollbarWidth();

        self.isIosUserAgent = bbWindow.isIosUserAgent();

        $scope.$watch(function () {
            return self.windowTitle;
        }, function () {
            if (self.windowTitle) {
                bbWindow.setWindowTitle(self.windowTitle);
            }
        });
    }

    WindowServiceController.$inject = ['$scope', 'bbWindow'];

    angular.module('stache')
        .controller('WindowServiceController', WindowServiceController);
}());
