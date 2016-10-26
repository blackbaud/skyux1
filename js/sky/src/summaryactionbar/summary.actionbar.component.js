/* global angular */
(function () {
    'use strict';

    function Controller($document, $element, $transclude, $scope, $timeout, $window, bbMediaBreakpoints) {
        var ctrl = this,
            marginTimeout,
            summaryEl,
            actionbarEl;

        function hideSummarySection() {

            var summaryHeight = summaryEl.outerHeight();
            ctrl.showExpand = true;
            
            summaryEl.css({
                overflow: 'hidden',
                height: summaryHeight
            })
            .animate({
                height: 0
            }, 150, function () {
                summaryEl.css({
                    display: 'none',
                    height: '',
                    overflow: ''
                });
                
                addActionbarMargin();
            });
        }

        function showSummarySection() {
            var summaryHeight = summaryEl.css({
                display: 'flex'
            }).outerHeight();

            ctrl.showExpand = false;

            summaryEl.css({
                overflow: 'hidden',
                height: 0
            })
            .animate({
                height: summaryHeight
            }, 150, function () {
                summaryEl.css({
                    display: '',
                    overflow: '',
                    height: ''
                });
                addActionbarMargin();

            });
        }

        function breakpointChanged(breakpoint) {
            ctrl.isXsScreen = breakpoint && breakpoint.xs;
            if (!ctrl.isXsScreen) {
                summaryEl.css('display', '');
                ctrl.showExpand = false;
            }
        }

        function addActionbarMargin() {
            $timeout.cancel(marginTimeout);
            marginTimeout = $timeout(function () {
                var actionbarHeight = actionbarEl.outerHeight();
                $document.find('body').css('margin-bottom', actionbarHeight);
            }, 250);
        }

        function getSummaryEl() {
            return $element.find('.bb-summary-actionbar-summary');
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
            summaryEl = getSummaryEl();
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

        ctrl.hideSummarySection = hideSummarySection;
        ctrl.showSummarySection = showSummarySection;
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

