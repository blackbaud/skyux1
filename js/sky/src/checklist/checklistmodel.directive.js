/*global angular */

(function () {
    'use strict';

    function checklistModel($compile, $parse, bbChecklistUtility) {
        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            var getter,
                setter,
                value;

            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);

            // getter / setter for original model
            getter = $parse(attrs.checklistModel);
            setter = getter.assign;

            // value added to list
            value = $parse(attrs.checklistValue)(scope.$parent);

            // watch UI checked change
            scope.$watch('checked', function (newValue, oldValue) {
                var current,
                    isSingleSelect;

                if (newValue === oldValue) {
                    return;
                }

                isSingleSelect = $parse(attrs.checklistSelectStyle)(scope.$parent) === 'single';
                current = getter(scope.$parent);

                if (newValue === true) {
                    setter(scope.$parent, bbChecklistUtility.add(current, value, isSingleSelect));
                } else {
                    setter(scope.$parent, bbChecklistUtility.remove(current, value));
                }
            });

            // watch original model change
            scope.$parent.$watch(attrs.checklistModel, function (newArr) {
                scope.checked = bbChecklistUtility.contains(newArr, value);
            }, true);
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function (tElement, tAttrs) {
                if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }

                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }

                // exclude recursion
                tElement.removeAttr('checklist-model');

                // local scope var storing individual checkbox model
                tElement.attr('ng-model', 'checked');

                return postLinkFn;
            }
        };
    }

    checklistModel.$inject = ['$compile', '$parse', 'bbChecklistUtility'];

    angular.module('sky.checklist.model.directive', ['sky.checklist.utility'])
        .directive('checklistModel', checklistModel);
}());
