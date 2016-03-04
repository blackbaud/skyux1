/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .controller('ActionButtonBarTestController',
        ['$scope', function ($scope) {

            $scope.locals = {
                action1Text: 'Action 1',
                action2Visible: false,
                actionsText: 'My actions'
            };
        }]);
}());