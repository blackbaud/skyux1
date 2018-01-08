/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButtonCancel(bbResources) {
        return {
            replace: true,
            transclude: true,
            require: ['^bbModal', '^bbModalFooter'],
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
            link: function ($scope, el, attrs, ctrls) {
                $scope.dismiss = ctrls[0].dismiss;
                if (el.contents().length === 0) {
                    el.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
                }
            }
        };
    }

    bbModalFooterButtonCancel.$inject = ['bbResources'];

    angular.module(
        'sky.modal.footer.button.cancel.directive', 
        [
            'sky.modal.footer.directive', 
            'sky.resources'
        ]
    )
        .directive('bbModalFooterButtonCancel', bbModalFooterButtonCancel);
}());
