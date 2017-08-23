/*global angular */
(function () {
    'use strict';
    function uibPagination(uibPaginationConfig, $log) {
        return {
            scope: {
                totalItems: '=',
                firstText: '@',
                previousText: '@',
                nextText: '@',
                lastText: '@',
                ngDisabled: '='
            },
            require: ['uibPagination', 'ngModel'],
            restrict: 'E',
            controller: 'UibPaginationController',
            controllerAs: 'pagination',
            replace: true,
            templateUrl: 'sky/templates/pagination/uib.pagination.directive.html',
            link: function (scope, element, attrs, ctrls) {
                var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                $log.warn('uibPagination should not be used as an element directive, instead use as an attribute directive on a ul element');
                paginationCtrl.init(ngModelCtrl, uibPaginationConfig);
            }
        };
    }

    uibPagination.$inject = ['uibPaginationConfig', '$log'];

    angular.module('sky.pagination.uibpagination', [
            'ui.bootstrap.pagination'
            ])
        .directive('uibPagination', uibPagination);
})();
