/*global angular */

(function () {
    'use strict';

    function bbPageSummaryStatus() {
        function Controller() {

        }

        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbPageSummary = ctrls[1];

            vm.el = el;

            bbPageSummary.setStatus(vm);
        }

        return {
            restrict: 'E',
            require: ['bbPageSummaryStatus', '^bbPageSummary'],
            controller: Controller,
            controllerAs: 'bbPageSummaryStatus',
            bindToController: true,
            link: link,
            scope: {}
        };
    }

    bbPageSummaryStatus.$inject = [];

    angular.module('sky.pagesummary')
        .directive('bbPageSummaryStatus', bbPageSummaryStatus);
}());
