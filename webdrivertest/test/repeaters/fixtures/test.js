/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .controller('RepeaterTestController',
        ['$scope', function ($scope) {
            $scope.items = [
                {
                    title: 'Title 1',
                    description: 'Description 1'
                },
                {
                    title: 'Title 2',
                    description: 'Description 2'
                },
                {
                    title: 'Title 3',
                    description: 'Description 3'
                },
                {
                    title: 'Title 4',
                    description: 'Description 4'
                }
            ];
        }]);
}());