/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.checklist',
        [
            'sky.checklist.directive',
            'sky.checklist.column.directive',
            'sky.checklist.columns.directive',
            'sky.checklist.model.directive'
        ]
    );
}());
