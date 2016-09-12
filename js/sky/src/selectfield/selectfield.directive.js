/*global angular */

(function () {
    'use strict';

    function bbSelectField() {
        function link($scope, el, attrs, ctrls) {
            if (ctrls[0] && ctrls[1] && attrs.required) {
                ctrls[1].$validators.required = function () {
                    return angular.isDefined(ctrls[0].bbSelectFieldSelectedItems) && ctrls[0].bbSelectFieldSelectedItems.length > 0;
                };

                $scope.$watchCollection(
                    function () {
                        return ctrls[0].bbSelectFieldSelectedItems;
                    },
                    function () {
                        ctrls[1].$validate();
                    }
                );

                ctrls[0].setModelTouched = function () {
                    ctrls[1].$setTouched();
                };
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
