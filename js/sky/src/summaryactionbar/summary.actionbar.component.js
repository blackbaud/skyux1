/* global angular */
(function () {
    'use strict';

    function Controller($document, $element, $transclude, $scope, $timeout, $window, bbMediaBreakpoints) {
        var ctrl = this,
            animationSpeed = 150,
            marginTimeout,
            summaryEl,
            actionbarEl;

        function summaryAnimationEnd(closed) {
            var displayType = closed ? 'none' : '';
            
            summaryEl.css({
                display: displayType,
                height: '',
                overflow: ''
            });
                
            addActionbarMargin();
        }

        function getModalBody() {
            var modalDialogEl = $element.parents('.modal-dialog');

            return modalDialogEl.find('.modal-body');
            
        }

        function isInFullPageModal() {
            return $element.parents('.bb-modal.bb-modal-fullpage').length > 0;
        }

        function isInModalFooter() {
            return $element.parents('.modal-footer').length > 0;
        }

        function handleModalAnimationHide(summaryHeight) {
            var bodyHeight,
                newBodyMax,
                modalBodyEl;

            modalBodyEl = getModalBody();

            if (isInFullPageModal()) {
                bodyHeight = parseInt(modalBodyEl.css('min-height'), 10);
                modalBodyEl.css({
                    minHeight: bodyHeight + summaryHeight
                });
            } else {
                
                bodyHeight = parseInt(modalBodyEl.css('max-height'), 10);
                newBodyMax = bodyHeight + summaryHeight;
                modalBodyEl.animate(
                    {
                        maxHeight: newBodyMax
                    },
                    {
                        duration: animationSpeed,
                        queue: false
                    }
                );
            }
        }

        function handleModalAnimationShow(summaryHeight) {
            var modalBodyEl = getModalBody(),
                bodyHeight,
                newBodyMax;

            if (!isInFullPageModal()) {
                bodyHeight = parseInt(modalBodyEl.css('max-height'), 10);
                newBodyMax = bodyHeight - summaryHeight;
                modalBodyEl.animate(
                    {
                        maxHeight: newBodyMax
                    },
                    {
                        duration: animationSpeed,
                        queue: false
                    }
                );
            }
        }


        function hideSummarySection() {

            var summaryHeight = summaryEl.outerHeight();
                 
            ctrl.showExpand = true;

            if (isInModalFooter()) {
                handleModalAnimationHide(summaryHeight);
            } 
            
            summaryEl.css({
                overflow: 'hidden',
                height: summaryHeight
            })
            .animate(
                {
                    height: 0
                }, 
                {
                    duration: animationSpeed,
                    queue: false,
                    complete: function () {
                        summaryAnimationEnd(true);
                    }
                });
        }

        function showSummarySection() {
            var summaryHeight = summaryEl.css({
                display: 'flex'
            }).outerHeight();

            ctrl.showExpand = false;

            if (isInModalFooter()) {
                handleModalAnimationShow(summaryHeight);
            } 

            summaryEl.css({
                overflow: 'hidden',
                height: 0
            })
            .animate(
                {
                    height: summaryHeight
                }, 
                {
                    duration: animationSpeed,
                    queue: false,
                    complete: function () {
                        summaryAnimationEnd(false);
                    }
                });
        }

        function breakpointChanged(breakpoint) {
            ctrl.summaryCollapseMode = breakpoint && breakpoint.xs;
            if (!ctrl.summaryCollapseMode) {
                summaryEl.css('display', '');
                ctrl.showExpand = false;
            }
        }

        function addActionbarMargin() {
            var actionbarHeight;
            $timeout.cancel(marginTimeout);
            marginTimeout = $timeout(function () {
                if (!isInModalFooter()) { 
                    actionbarHeight = actionbarEl.outerHeight();
                    $document.find('body').css('margin-bottom', actionbarHeight);
                } else {
                    ctrl.bbModal.fitToWindow();
                }
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

        function setModalFooterStyles(shouldAddClass) {
            var footerEl = $element.parents('.modal-footer'),
                method = shouldAddClass ? 'addClass' : 'removeClass' ;

            footerEl[method]('bb-modal-footer-summary-actionbar-container');
        }

        function initializeModalSummary() {
            setModalFooterStyles(true);
            addActionbarMargin();
            if (!isInFullPageModal()) {
                ctrl.summaryCollapseMode = true;
            } else {
                bbMediaBreakpoints.register(breakpointChanged);
            }
        }

        function initializeDocumentSummary() {
            bbMediaBreakpoints.register(breakpointChanged);
            addActionbarMargin();
            watchActionBarHeight();
            windowResize();
        }

        function onInit() {
            actionbarEl = getActionbar();
            summaryEl = getSummaryEl();
            ctrl.summaryContentExists = $transclude.isSlotFilled('bbSummaryActionbarSummary');
            
            if (!isInModalFooter()) {
                initializeDocumentSummary();
            } else {
                initializeModalSummary();
            }
            
        }

        function onDestroy() {
            bbMediaBreakpoints.unregister(breakpointChanged);
            $timeout.cancel(marginTimeout);
            if (!isInModalFooter()) {
                $document.find('body').css('margin-bottom', '');
            } else {
                setModalFooterStyles(false);
            }
            
            angular.element($window).off('resize.bbSummaryActionbar' + $scope.$id);
        }

        ctrl.$postLink = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.hideSummarySection = hideSummarySection;
        ctrl.showSummarySection = showSummarySection;
    }

    Controller.$inject = ['$document', '$element', '$transclude', '$scope', '$timeout', '$window', 'bbMediaBreakpoints'];

    angular.module('sky.summary.actionbar.component', ['sky.mediabreakpoints', 'sky.resources'])
        .component('bbSummaryActionbar', {
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.component.html',
            controller: Controller,
            require: {
                'bbModal': '?^^bbModal'
            },
            transclude: {
                bbSummaryActionbarActions: '?bbSummaryActionbarActions',
                bbSummaryActionbarSummary: '?bbSummaryActionbarSummary'
            }
        });
})();

