/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbModal($timeout, bbViewKeeperConfig) {
        var marginStyleEl,
            viewkeeperMarginBottomOverride,
            viewkeeperMarginTopOverride;

        function setViewkeeperMarginTop(margin) {
            if (!marginStyleEl) {
                marginStyleEl = $('<style></style>').appendTo(document.body);
            }

            marginStyleEl.text('.bb-modal-fullpage .bb-viewkeeper-fixed {margin-top: ' + margin + 'px !important;}');
        }

        function getPixelValue(val) {
            val = val || '0';

            return parseFloat(val.replace('px', ''));
        }

        function getModalBodyWrapperMargin(el, fullPage) {
            var margin = 0;

            while (el.not('.modal-dialog') && 
                    el.length > 0 && 
                    // Don't evaluate any body padding since the modal should cover
                    // the entire screen, including the omnibar.
                    (!fullPage || !el.is(document.body))
            ) {
                margin += el.outerHeight() - el.height();

                el = el.parent();
            }

            return margin;
        }
        
        function link($scope, el) {
            var bodyEl,
                resizeTimeout,
                windowEl = $(window);

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
                            newMinHeight = $(document).height() - (
                                headerHeight + 
                                footerHeight +
                                getModalBodyWrapperMargin(el, fullPage)
                            );

                            bodyEl
                                .hide()
                                .css({
                                    'min-height': newMinHeight,
                                    'margin-top': headerHeight,
                                    'margin-bottom': footerHeight
                                })
                                .show();
                        } else {
                            margin = getPixelValue(modalDialogEl.css('margin-bottom')) + 
                                getPixelValue(modalDialogEl.css('margin-top'));

                            reservedHeight = margin + headerHeight + footerHeight;

                            // Account for the border, padding, etc. of the elements 
                            // that wrap the modal body.
                            reservedHeight += getModalBodyWrapperMargin(el, fullPage);

                            newMaxHeight = windowEl.height() - reservedHeight;

                            bodyEl.css('max-height', newMaxHeight);
                        } 
                    }
                }
            }

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
                    if (!viewkeeperMarginTopOverride) {
                        viewkeeperMarginTopOverride = {};
                        bbViewKeeperConfig.addViewportMarginTopOverride(viewkeeperMarginTopOverride);
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
                        bbViewKeeperConfig.addViewportMarginBottomOverride(viewkeeperMarginBottomOverride);
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
                    bbViewKeeperConfig.removeViewportMarginBottomOverride(
                        viewkeeperMarginBottomOverride
                    );
                }

                if (viewkeeperMarginTopOverride) {
                    bbViewKeeperConfig.removeViewportMarginTopOverride(
                        viewkeeperMarginTopOverride
                    );
                }

                if (marginStyleEl) {
                    marginStyleEl.remove();
                }
            });
        }

        function Controller($scope) {
            this.setBodyEl = function (bodyEl) {
                $scope.bodyEl = bodyEl;
            };

            this.setHeaderEl = function (headerEl) {
                $scope.headerEl = headerEl;
            };

            this.setFooterEl = function (footerEl) {
                $scope.footerEl = footerEl;
            };
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

    bbModal.$inject = ['$timeout', 'bbViewKeeperConfig'];

    angular.module('sky.modal.directive', ['sky.viewkeeper'])
        .directive('bbModal', bbModal);
}(jQuery));
