/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButtonPrimary(bbResources) {
        return {
            replace: true,
            transclude: true,
            require: '^bbModalFooter',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html',
            link: function ($scope, el) {
                if (el.contents().length === 0) {
                    el.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
                }
            }
        };
    }

    bbModalFooterButtonPrimary.$inject = ['bbResources'];

    angular.module(
        'sky.modal.footer.button.primary.directive', 
        [
            'sky.modal.footer.directive',
            'sky.resources'
        ]
    )
        .directive('bbModalFooterButtonPrimary', bbModalFooterButtonPrimary);
}());
