/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbModal($timeout) {
        function getPixelValue(val) {
            val = val || '0';

            return parseFloat(val.replace('px', ''));
        }

        function getModalBodyWrapperMargin(el, fullscreen) {
            var margin = 0;

            while (el.not('.modal-dialog') && 
                    el.length > 0 && 
                    // Don't evaluate any body padding since the modal should cover
                    // the entire screen, including the omnibar.
                    (!fullscreen || !el.is(document.body))
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

            function fitToWindow() {
                var fullscreen,
                    margin,
                    modalDialogEl,
                    newMaxHeight,
                    reservedHeight,
                    widthProp;

                if (bodyEl && bodyEl.length > 0) {
                    modalDialogEl = el.parents('.modal-dialog');

                    if (modalDialogEl.length > 0) {
                        fullscreen = modalDialogEl.parents('.bb-modal').is('.bb-modal-fullscreen'); 

                        margin = getPixelValue(modalDialogEl.css('margin-bottom')) + 
                            getPixelValue(modalDialogEl.css('margin-top'));

                        reservedHeight = margin + 
                            el.find('.modal-header').outerHeight() + 
                            el.find('.modal-footer').outerHeight();

                        // Account for the border, padding, etc. of the elements 
                        // that wrap the modal body.
                        reservedHeight += getModalBodyWrapperMargin(el, fullscreen);

                        newMaxHeight = windowEl.height() - reservedHeight;

                        widthProp = fullscreen ? 'height' : 'max-height';

                        bodyEl.css(widthProp, newMaxHeight);
                    }
                }
            }

            $scope.$watch('bodyEl', function (newValue) {
                bodyEl = newValue;
                fitToWindow();
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
            });
        }

        function Controller($scope) {
            this.setBodyEl = function (bodyEl) {
                $scope.bodyEl = bodyEl;
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

    bbModal.$inject = ['$timeout'];

    angular.module('sky.modal.directive', [])
        .directive('bbModal', bbModal);
}(jQuery));
