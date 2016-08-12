/* global angular */
(function () {
    'use strict';

    /*  This directive addresses a positioning problem that occurs in uib-datepicker when the datepicker popup
        attempts to position itself after a mode change while ng-if has not fully processed. This directive watches
        the mode change, hides the element if necessary, and kicks off the event that positions the popup again */
    function Controller($scope, $timeout, $element) {
        var ctrl = this;

        function emitModeChange() {
            $element[ctrl.bbDatepickerHideMode !== ctrl.bbDatepickerHideModeMatch ? 'addClass' : 'removeClass']('ng-hide');
            $timeout(function () {
                $scope.$emit('uib:datepicker.mode');
            });
        }

        ctrl.$postLink = emitModeChange;

        ctrl.$onChanges = emitModeChange;
    }

    Controller.$inject = ['$scope', '$timeout', '$element'];

    angular.module('sky.datepicker.hide', [])
        .component('bbDatepickerHide', 
        {
            bindings: {
                bbDatepickerHideMode: '<',
                bbDatepickerHideModeMatch: '@'
            },
            controller: Controller,
            transclude: true,
            template: '<ng-transclude></ng-transclude>'
        });
})();