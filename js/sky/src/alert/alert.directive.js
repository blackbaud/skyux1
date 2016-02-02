/*global angular */

/** @module Alert
@icon bell
@summary The alert component displays a SKY UX-themed Bootstrap alert.
@description The alert directive displays a SKY UX-themed Bootstrap alert. It includes an option to let users dismiss the alert with a close button. For information about the Bootstrap alert, see the [Bootstrap documentation](http://getbootstrap.com/components/#alerts).

### Alert Settings ###
    - `bb-alert` &mdash; Creates a SKY UX-themed Bootstrap alert.
        - `bb-alert-type` &mdash; Specifies a style for the alert. The valid options are `success`, `info`, `warning`, and `danger`. *(Default: `warning`)*
        - `bb-alert-closeable` &mdash; Specifies a Boolean value to indicate whether users can dismiss the alert.
        - `bb-alert-closed` &mdash; Specifies a function to be called when the user closes the alert.

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
