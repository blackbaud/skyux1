/* global angular */
(function () {
    'use strict';

    function Controller($document, $element) {
        var ctrl = this;

        function onInit() {
            $document.find('body').append($element.find('.bb-summary-actionbar'));
        }

        ctrl.$postLink = onInit;
    }

    Controller.$inject = ['$document', '$element'];

    angular.module('sky.summary.actionbar.component', [])
        .component('bbSummaryActionbar', {
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.component.html',
            controller: Controller,
            transclude: {
                bbSummaryActionbarActions: '?bbSummaryActionbarActions',
                bbSummaryActionbarSummary: '?bbSummaryActionbarSummary'
            }
        });
})();

