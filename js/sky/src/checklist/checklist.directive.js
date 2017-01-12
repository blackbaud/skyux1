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
                bbChecklistSelectedItems: '=?',
                bbChecklistFilterCallback: '=?',
                bbChecklistIncludeSearch: '=?',
                bbChecklistSearchDebounce: '=?',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=?',
                bbChecklistCategories: '=?',
                bbChecklistMode: '@?',
                bbChecklistSelectStyle: '@?',
                bbChecklistIsLoading: '=?',
                bbChecklistSubsetLabel: '=?',
                bbChecklistSubsetProperty: '@?',
                bbChecklistAllCategoriesLabel: '<?'
            },
            controller: 'BBChecklistController',
            controllerAs: 'bbChecklist',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal);
                vm.subsetExclude = angular.isDefined(attrs.bbChecklistSubsetExclude);
                vm.focusSearch = attrs.bbChecklistFocusSearch;
                vm.onlySelectedAvailable = angular.isDefined(attrs.bbChecklistOnlySelected);
            }
        };
    }

    angular.module(
        'sky.checklist.directive',
        [
            'sky.check',
            'sky.checklist.controller',
            'sky.resources',
            'sky.wait'
        ]
    )
        .directive('bbChecklist', bbChecklist);
}());
