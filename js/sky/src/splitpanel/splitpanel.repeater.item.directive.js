/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, repeaterCtrl) {
        repeaterCtrl.addRepeaterItem();
    }

    angular.module('sky.splitpanel.repeater.item.directive', [])
        .directive('bbsplitpanelRepeaterItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                require: '^^bbsplitpanelRepeater'
            }; 
        });
}());