/*global angular */

/** @module Alert
@icon bell
@summary The alert component displays a SKY UX-themed Bootstrap alert.
@description The alert component displays a SKY UX-themed Bootstrap alert. It includes the option to allow the user to dismiss the alert with a close button.
### Action Bar Settings ###
    - `bb-alert-type` (default `warning`) &mdash; The style of alert to show.  Valid options are `success`, `info`, `warning`, and `danger`.
    - `bb-alert-closeable` &mdash; A boolean indicating whether the alert can be dismissed by the user.
*/

(function () {
    'use strict';

    function bbAlert() {
        function Controller() {

        }

        function link(scope, el, attrs, vm) {
            vm.close = function () {
                vm.bbAlertClosed = true;
            };
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbAlert',
            bindToController: {
                bbAlertType: '@',
                bbAlertCloseable: '@',
                bbAlertClosed: '='
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true
        };
    }

    angular.module('sky.alert.directive', ['sky.resources'])
        .directive('bbAlert', bbAlert);
}());
