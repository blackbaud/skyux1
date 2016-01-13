/*global angular */

(function () {
    'use strict';

    function bbPageSummaryTitle() {
        function Controller() {

        }

        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbPageSummary = ctrls[1];

            vm.el = el;

            bbPageSummary.setTitle(vm);
        }

        return {
            restrict: 'E',
            require: ['bbPageSummaryTitle', '^bbPageSummary'],
            controller: Controller,
            controllerAs: 'bbPageSummaryTitle',
            bindToController: true,
            link: link,
            scope: {}
        };
    }

    bbPageSummaryTitle.$inject = [];

    angular.module('sky.pagesummary')
        .directive('bbPageSummaryTitle', bbPageSummaryTitle);
}());
