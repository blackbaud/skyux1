/*global angular */
(function () {
    'use strict';
    
    angular.module('screenshots', ['sky', 'ui.select'])
        .controller('SearchfieldLocalTestController', ['$scope', function ($scope) {
            $scope.data = {
                color_id: '2',
                color_ids: ['2', '5', '9']
            };

            $scope.resources = {
                watermark_single: 'Search for a color',
                watermark_multiple: 'Search for a color(s)'
            };
            $scope.locals = {
                colors: [
                    { id: '1', name: 'Aqua' },
                    { id: '2', name: 'Blue' },
                    { id: '3', name: 'Brown' },
                    { id: '4', name: 'Gold' },
                    { id: '5', name: 'Gray' },
                    { id: '6', name: 'Green' },
                    { id: '7', name: 'Navy' },
                    { id: '8', name: 'Pink' },
                    { id: '9', name: 'Purple' },
                    { id: '10', name: 'Silver' },
                    { id: '11', name: 'White' },
                    { id: '12', name: 'Yellow' }
                ]
            };
        }]);
}());