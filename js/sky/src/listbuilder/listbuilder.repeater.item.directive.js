/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, repeaterCtrl) {
        repeaterCtrl.addRepeaterItem();
    }

    angular.module('sky.listbuilder.repeater.item.directive', [])
        .directive('bbListbuilderRepeaterItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                require: '^^bbListbuilderRepeater'
            }; 
        });
}());