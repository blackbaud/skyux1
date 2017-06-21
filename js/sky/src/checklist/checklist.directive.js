/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbChecklist($timeout) {
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
                vm.focusSearch = angular.isDefined(attrs.bbChecklistFocusSearch);
                if (vm.focusSearch) {
                    $timeout(function () {
                        el.find('.bb-checklist-search-box').focus();
                    }, 500);
                }
                vm.onlySelectedAvailable = angular.isDefined(attrs.bbChecklistOnlySelected);
            }
        };
    }

    bbChecklist.$inject = ['$timeout'];

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
