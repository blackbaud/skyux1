/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    angular.module('sky.modalbody.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalBody', function () {
            return {
                link: function (scope, el, attrs, modalCtrl) {
                    el.addClass('modal-body container-fluid');
                    modalCtrl.setBodyEl(el);
                },
                require: '^bbModal',
                restrict: 'A'
            };
        });
}(jQuery));
