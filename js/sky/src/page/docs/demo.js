/*global angular */
(function () {
    'use strict';

    function PageTestController($scope, $timeout, bbPage) {
        var self = this,
            testLoading = false;

        function simulateLoading() {
            testLoading = true;
            self.pageStatus = bbPage.pageStatuses.LOADING;
            $scope.$emit('bbBeginWait');

            $timeout(function () {
                testLoading = false;
                self.pageStatus = bbPage.pageStatuses.LOADED;
                $scope.$emit('bbEndWait');
            }, 1500);
        }

        function simulateNotAuthorized() {
            self.pageStatus = bbPage.pageStatuses.NOT_AUTHORIZED;
        }

        $scope.$on('bbBeginWait', function (event) {
            if (!testLoading) {
                event.stopPropagation();
            }
        });

        self.pageStatus = bbPage.pageStatuses.LOADED;
        self.simulateLoading = simulateLoading;
        self.simulateNotAuthorized = simulateNotAuthorized;
    }

    PageTestController.$inject = ['$scope', '$timeout', 'bbPage'];

    angular.module('stache').controller('PageTestController', PageTestController);
}());
