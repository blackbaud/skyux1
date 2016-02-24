/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbChecklist() {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: 'sky/templates/checklist/checklist.directive.html',
            bindToController: {
                bbChecklistItems: '=',
                bbChecklistSelectedItems: '=',
                bbChecklistFilterCallback: '=',
                bbChecklistIncludeSearch: '=',
                bbChecklistSearchDebounce: '=',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=',
                bbChecklistCategories: '=',
                bbChecklistMode: '@',
                bbChecklistSelectStyle: '@',
                bbChecklistIsLoading: '='
            },
            controller: 'BBChecklistController',
            controllerAs: 'bbChecklist',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal);
            }
        };
    }

    angular.module(
        'sky.checklist.directive',
        [
            'sky.check',
            'sky.checklist.controller',
            'sky.resources'
        ]
    )
        .directive('bbChecklist', bbChecklist);
}());
