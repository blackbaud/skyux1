/*global angular */

(function () {
    'use strict';

    angular.module(
        'sky.contextmenu',
        [
            'sky.contextmenu.directive',
            'sky.contextmenu.button.directive',
            'sky.contextmenu.item.directive',
            'sky.submenu'
        ]
    );
}());
