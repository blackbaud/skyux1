/*global angular, jQuery */

/** @module Navbar
@icon compass
@summary The navbar creates a Bootstrap `nav` element and applies Sky UX classes to it.
 @description The navbar directive creates a Bootstrap `nav` element with the appropriate Sky UX classes applied to it and its children, and also adds behavior such as showing sub-navigation items when the user hovers over the dropdown.
 */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    angular.module('sky.navbar', [])
        .directive('bbNavbar', function () {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                templateUrl: 'sky/templates/navbar/navbar.html',
                link: function (scope, el) {
                    /*jslint unparam: true */
                    $(el).on('mouseenter', '.dropdown', function () {
                        toggleOpen(this, 'add');
                    }).on('mouseleave', '.dropdown', function () {
                        toggleOpen(this, 'remove');
                    }).on('click', '.dropdown-menu a', function () {
                        toggleOpen($('.dropdown', el), 'remove');
                    });
                }
            };
        });
}(jQuery));
