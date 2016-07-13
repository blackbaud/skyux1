/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalBody() {
        function link(scope, el, attrs, modalCtrl) {
            el.addClass('modal-body container-fluid');
            modalCtrl.setBodyEl(el);
        }

        return {
            link: link,
            require: '^bbModal',
            restrict: 'A'
        };
    }

    angular.module('sky.modal.body.directive', ['sky.modal', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalBody', bbModalBody);
}());
