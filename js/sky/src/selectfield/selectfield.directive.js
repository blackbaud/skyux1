/*global angular */

(function () {
    'use strict';

    function bbSelectField() {
        function link($scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[0];
            if (bbSelectField && ctrls[1]) {
                ctrls[1].$validators.required = function () {
                    return !attrs.required || (angular.isDefined(bbSelectField.bbSelectFieldSelectedItems) && bbSelectField.bbSelectFieldSelectedItems.length > 0);
                };

                attrs.$observe('required', function () {
                    ctrls[1].$validate();
                });

                $scope.$watchCollection(
                    function () {
                        return bbSelectField.bbSelectFieldSelectedItems;
                    },
                    function () {
                        ctrls[1].$validate();
                    }
                );

                bbSelectField.setModelTouched = function () {
                    ctrls[1].$setTouched();
                };
            }

            if (angular.isDefined(attrs.bbSelectFieldClear)) {
                bbSelectField.bbSelectFieldClear = true;
            }
        }

        return {
            require: ['bbSelectField', '?ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&?',
                bbSelectFieldSelectedItems: '=?ngModel',
                bbSelectFieldStyle: '@?',
                bbSelectFieldIcon: '@?',
                bbSelectFieldText: '@?'
            },
            controller: 'BBSelectFieldController',
            controllerAs: 'bbSelectField',
            scope: true,
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html',
            transclude: true,
            link: link
        };
    }

    angular.module('sky.selectfield.directive', ['sky.format', 'sky.resources', 'sky.selectfield.controller'])
        .directive('bbSelectField', bbSelectField);
}());
