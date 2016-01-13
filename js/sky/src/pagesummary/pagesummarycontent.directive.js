/*global angular */

(function () {
    'use strict';

    function bbPageSummaryContent() {
        function Controller() {

        }

        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbPageSummary = ctrls[1];

            vm.el = el;

            bbPageSummary.setContent(vm);
        }

        return {
            restrict: 'E',
            require: ['bbPageSummaryContent', '^bbPageSummary'],
            controller: Controller,
            controllerAs: 'bbPageSummaryContent',
            bindToController: true,
            link: link,
            scope: {}
        };
    }

    angular.module('sky.pagesummary')
        .directive('bbPageSummaryContent', bbPageSummaryContent);
}());
