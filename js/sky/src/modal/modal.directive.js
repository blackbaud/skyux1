/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbModal($timeout, bbViewKeeperBuilder) {
        function getPixelValue(val) {
            val = val || '0';

            return parseFloat(val.replace('px', ''));
        }

        function getModalBodyWrapperMargin(el) {
            var margin = 0;

            while (el.not('.modal-dialog') && 
                    el.length > 0 && 
                    // Don't evaluate any body padding since the modal should cover
                    // the entire screen, including the omnibar.
                    (!el.is(document.body))
            ) {
                margin += el.outerHeight() - el.height();

                el = el.parent();
            }

            return margin;
        }
        
        function link($scope, el) {
            var bodyEl,
                marginStyleEl,
                resizeTimeout,
                viewkeeperMarginBottomOverride,
                viewkeeperMarginTopOverride,
                windowEl = $(window);

            function setViewkeeperMarginTop(margin) {
                /* istanbul ignore else */
                /* sanity check */
                if (!marginStyleEl) {
                    marginStyleEl = $('<style></style>').appendTo(document.body);
                }

                marginStyleEl.text('.bb-modal-fullpage .bb-viewkeeper-fixed {margin-top: ' + margin + 'px !important;}');
            }

            function isFullPage() {
                var modalDialogEl = el.parents('.modal-dialog');
                
                return modalDialogEl.parents('.bb-modal').is('.bb-modal-fullpage');
            }

            function fitToWindow() {
                var footerHeight,
                    fullPage,
                    headerHeight,
                    margin,
                    modalDialogEl,
                    newMaxHeight,
                    newMinHeight,
                    reservedHeight;

                if (bodyEl && bodyEl.length > 0) {
                    modalDialogEl = el.parents('.modal-dialog');

                    if (modalDialogEl.length > 0) {
                        headerHeight = el.find('.modal-header').outerHeight();
                        footerHeight = el.find('.modal-footer').outerHeight();
                        fullPage = isFullPage();

                        if (fullPage) {
                            bodyEl.css({
                                'margin-top': headerHeight,
                                'margin-bottom': footerHeight
                            });
                            reservedHeight = headerHeight + footerHeight;
                            reservedHeight += getModalBodyWrapperMargin(el);
                            newMinHeight = windowEl.height() - reservedHeight;
                            bodyEl.css({
                                'min-height': newMinHeight
                            });
                        } else {
                            margin = getPixelValue(modalDialogEl.css('margin-bottom')) + 
                                getPixelValue(modalDialogEl.css('margin-top'));

                            reservedHeight = margin + headerHeight + footerHeight;

                            // Account for the border, padding, etc. of the elements 
                            // that wrap the modal body.
                            reservedHeight += getModalBodyWrapperMargin(el);

                            newMaxHeight = windowEl.height() - reservedHeight;

                            bodyEl.css('max-height', newMaxHeight);
                        } 
                    }
                }
            }

            $scope.fitToWindow = fitToWindow;

            $scope.$watch('bodyEl', function (newValue) {
                bodyEl = newValue;
                fitToWindow();
            });
            
            $scope.$watch(function () {
                if ($scope.headerEl) {
                    return $scope.headerEl.outerHeight();
                }
            }, function (newValue) {
                if (isFullPage()) {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (!viewkeeperMarginTopOverride) {
                        viewkeeperMarginTopOverride = {};
                        
                        bbViewKeeperBuilder.addViewportMarginTopOverride(
                            viewkeeperMarginTopOverride
                        );
                    }
                    
                    viewkeeperMarginTopOverride.margin = newValue;

                    setViewkeeperMarginTop(newValue);
                }
            });

            $scope.$watch(function () {
                if ($scope.footerEl) {
                    return $scope.footerEl.outerHeight();
                }
            }, function (newValue) {
                if (isFullPage()) {
                    if (!viewkeeperMarginBottomOverride) {
                        viewkeeperMarginBottomOverride = {};
                        
                        bbViewKeeperBuilder.addViewportMarginBottomOverride(
                            viewkeeperMarginBottomOverride
                        );
                    }
                    
                    viewkeeperMarginBottomOverride.margin = newValue;
                }
            });

            $timeout(function () {
                fitToWindow();
            }, 0);

            windowEl.on('resize.bbModal' + $scope.$id, function () {
                $timeout.cancel(resizeTimeout);

                resizeTimeout = $timeout(function () {
                    fitToWindow();
                }, 250);
            });

            el.on('$destroy', function () {
                windowEl.off('.bbModal' + $scope.$id);

                if (viewkeeperMarginBottomOverride) {
                    bbViewKeeperBuilder.removeViewportMarginBottomOverride(
                        viewkeeperMarginBottomOverride
                    );
                }

                if (viewkeeperMarginTopOverride) {
                    bbViewKeeperBuilder.removeViewportMarginTopOverride(
                        viewkeeperMarginTopOverride
                    );
                }

                if (marginStyleEl) {
                    marginStyleEl.remove();
                    marginStyleEl = null;
                }
            });
        }

        function Controller($scope) {
            var ctrl = this;
            function onInit() {
                ctrl.setBodyEl = function (bodyEl) {
                    $scope.bodyEl = bodyEl;
                };

                ctrl.setHeaderEl = function (headerEl) {
                    $scope.headerEl = headerEl;
                };

                ctrl.setFooterEl = function (footerEl) {
                    $scope.footerEl = footerEl;
                };

                ctrl.fitToWindow = function () {
                    $scope.fitToWindow();
                };
            }

            ctrl.$onInit = onInit;
            
        }

        Controller.$inject = ['$scope'];

        return {
            controller: Controller,
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modal.html',
            link: link
        };
    }

    bbModal.$inject = ['$timeout', 'bbViewKeeperBuilder'];

    angular.module('sky.modal.directive', ['sky.viewkeeper'])
        .directive('bbModal', bbModal);
}(jQuery));
