/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .config(['toastrConfig', function (toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 600000
        });
    }])
    .controller('ToastTestController',
        ['$scope', 'bbToast', function ($scope, bbToast) {
            $scope.openMessage = function (toastType) {
                bbToast.open({
                    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    toastType: toastType
                });
            };
        }]
    );
}());
