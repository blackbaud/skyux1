/*global angular, jQuery */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    function Controller() {
        var el = this;
        /*jslint unparam: true */
        $(el).on('mouseenter', '.dropdown', function () {
            toggleOpen(this, 'add');
        }).on('mouseleave', '.dropdown', function () {
            toggleOpen(this, 'remove');
        }).on('click', '.dropdown-menu a', function () {
            toggleOpen($('.dropdown', el), 'remove');
        });
    } 
    angular.module('sky.navbar', [])
        .component('bbNavbar', {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/navbar/navbar.component.html',
            controller: Controller
        });
}(jQuery));
