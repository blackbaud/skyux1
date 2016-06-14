/*global angular, jQuery */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    function Controller($element) {
        
        /*jslint unparam: true */
        $element.on('mouseenter', '.dropdown', function () {
            toggleOpen(this, 'add');
        }).on('mouseleave', '.dropdown', function () {
            toggleOpen(this, 'remove');
        }).on('click', '.dropdown-menu a', function () {
            toggleOpen($('.dropdown', $element), 'remove');
        });
    } 
    
    Controller.$inject = ['$element'];
    
    angular.module('sky.navbar', [])
        .component('bbNavbar', {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/navbar/navbar.component.html', 
            controller: Controller
        });
}(jQuery));
