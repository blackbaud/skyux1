/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooter() {
        function link(scope, el, attrs, bbModal) {
            bbModal.setFooterEl(el);
        }

        return {
            controller: angular.noop,
            link: link,
            replace: true,
            transclude: true,
            require: '^bbModal',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooter.html'
        };
    }

    angular.module('sky.modal.footer.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooter', bbModalFooter);
}());
