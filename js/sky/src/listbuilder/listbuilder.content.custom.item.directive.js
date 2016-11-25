/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, customCtrl) {
        customCtrl.addItem();
    }

    angular.module('sky.listbuilder.content.custom.item.directive', [])
        .directive('bbListbuilderContentCustomItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                require: '^^bbListbuilderContentCustom'
            };
        });
})();