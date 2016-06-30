/*global angular, jQuery */

(function ($) {
    'use strict';

    function toggleOpen(el, action) {
        $(el)[action + 'Class']('open');
    }

    function toggleClick(el) {
        var isOpen = $(el).hasClass('open'),
            action;

        action = isOpen ? 'remove' : 'add';
        toggleOpen(el, action);

    }
    
    function Controller($element) {
        
        /*jslint unparam: true */
        ($element)
        .on('mouseenter', '.dropdown', function () {
            toggleOpen(this, 'add');
        }).on('mouseleave', '.dropdown', function () {
            toggleOpen(this, 'remove');
        }).on('click', '.dropdown', function () {
            toggleClick(this);
        }).on('click', '.dropdown-menu a', function ($event) {
            toggleOpen($('.dropdown', $element), 'remove');
            $event.stopPropagation();
        });
    }
    
    Controller.$inject = ['$element']; 
    angular.module('sky.navbar', [])
        .component('bbNavbar', {
            transclude: true,
            templateUrl: 'sky/templates/navbar/navbar.component.html', 
            controller: Controller 
        });
}(jQuery));
