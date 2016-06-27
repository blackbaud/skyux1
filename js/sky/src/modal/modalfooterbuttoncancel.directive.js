/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modalfooterbuttoncancel.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooterButtonCancel', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
                    }
                }
            };
        }]);
}());
