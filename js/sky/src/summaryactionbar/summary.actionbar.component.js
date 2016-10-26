/* global angular */
(function () {
    'use strict';

    function Controller($document, $element, $transclude, $scope, $timeout, $window, bbMediaBreakpoints) {
        var ctrl = this,
            marginTimeout,
            actionbarEl;

        function toggleDetails() {
            ctrl.hideSummary = !ctrl.hideSummary;
            addActionbarMargin();
        }

        function breakpointChanged(breakpoint) {
            ctrl.isXsScreen = breakpoint && breakpoint.xs;
        }

        function addActionbarMargin() {
            $timeout.cancel(marginTimeout);
            marginTimeout = $timeout(function () {
                var actionbarHeight = actionbarEl.outerHeight();
                $document.find('body').css('margin-bottom', actionbarHeight);
            }, 250);
        }

        function getActionbar() {
            return $element.find('.bb-summary-actionbar');
        }

        function watchActionBarHeight() {
            $scope.$watch(function () {
                return actionbarEl.outerHeight();
            }, function (newValue, oldValue) {
                if (oldValue !== newValue) {
                    addActionbarMargin();
                }
            });
        }

        function windowResize() {
            angular.element($window).on('resize.bbSummaryActionbar' + $scope.$id, function () {
                addActionbarMargin();
            });
        }

        function onInit() {
            actionbarEl = getActionbar();
            bbMediaBreakpoints.register(breakpointChanged);
            ctrl.summaryContentExists = $transclude.isSlotFilled('bbSummaryActionbarSummary');
            watchActionBarHeight();
            windowResize();
        }

        function onDestroy() {
            bbMediaBreakpoints.unregister(breakpointChanged);
            $timeout.cancel(marginTimeout);
            $document.find('body').css('margin-bottom', '');
            angular.element($window).off('resize.bbSummaryActionbar' + $scope.$id);
        }

        ctrl.$postLink = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.toggleDetails = toggleDetails;
    }

    Controller.$inject = ['$document', '$element', '$transclude', '$scope', '$timeout', '$window', 'bbMediaBreakpoints'];

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

