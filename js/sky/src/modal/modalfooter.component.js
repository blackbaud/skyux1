/*jshint browser: true */
/*global angular, jQuery */

(function () {
    'use strict';

    angular.module('sky.modalfooter.component', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .component('bbModalFooter', {
            controller: angular.noop,
            transclude: true,
            require: {
                bbModal: '^bbModal'
            }, 
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooter.html'
        });
}(jQuery));
