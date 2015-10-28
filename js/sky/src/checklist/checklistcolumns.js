/*global angular */

(function () {
    'use strict';
    
    function bbChecklistColumns() {
        return {
            require: '^bbChecklist',
            restrict: 'E',
            scope: {
            },
            controller: ['$scope', function ($scope) {
                $scope.columns = [];

                this.addColumn = function (column) {
                    $scope.columns.push(column);
                };
            }],
            link: function ($scope, element, attrs, bbChecklist) {
                /*jslint unparam: true */
                bbChecklist.setColumns($scope.columns);
            }
        };
    }
    
    angular.module('sky.checklist.columns', [])
        .directive('bbChecklistColumns', bbChecklistColumns);
}());