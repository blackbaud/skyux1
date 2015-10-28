/*global angular */
(function () {
    'use strict';

    function WaitDemoController($scope, $timeout, bbWait) {
        var self = this;

        self.waitCount = 0;

        self.onWaitDiv = function () {
            self.waitDiv = true;

            $timeout(function () {
                self.waitDiv = false;
            }, 1000);
        };

        self.onWaitSpan = function () {
            self.waitSpan = true;

            $timeout(function () {
                self.waitSpan = false;
            }, 1000);
        };

        self.onWaitIncrement = function () {
            self.waitCount += 1;
        };

        self.onWaitDecrement = function () {
            if (self.waitCount > 0) {
                self.waitCount -= 1;
            }
        };

        self.onShowPageWait = function () {
            $scope.$emit("bbBeginWait");

            $timeout(function () {
                $scope.$emit("bbEndWait");
            }, 1000);
        };

        self.onShowNonblockingPageWait = function () {
            $scope.$emit("bbBeginWait", { nonblocking: true });

            $timeout(function () {
                $scope.$emit("bbEndWait", { nonblocking: true });
            }, 1000);
        };
    }

    WaitDemoController.$inject = ['$scope', '$timeout', 'bbWait'];

    angular.module('stache').controller('WaitDemoController', WaitDemoController);
}());
