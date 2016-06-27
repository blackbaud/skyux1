/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modalfooterbuttonprimary.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooterButtonPrimary', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
                    }
                }
            };
        }]);
}());
