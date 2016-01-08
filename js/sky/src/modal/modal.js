/*jshint browser: true */
/*global angular, jQuery */

/** @module Modal
@icon list-alt
@summary The modal component launches modals in a way that is consistent with Sky UX applications.
 @description The modal directive and service can be used to launch modals in a consistent way in a Sky UX application. Rather than using the ui-bootstrap `$uibModal.open`, use `bbModal.open` instead. This takes the same options object but allows for some custom default behaviors in Sky UX.

In addition to the `bbModal` service for lauching modals, a `bb-modal` directive should be used to have common look-and-feel for modal content. Within `bb-modal`, use `bb-modal-header` to include a common modal header, `bb-modal-footer` to include a common modal footer and buttons, and `bb-modal-body` to wrap the modal's body content.

### Modal Header Settings ###

 - `bb-modal-help-key` Specifies the help key for the modal. This will be be linked from a help button included in the modal header.

### Modal Footer Buttons ##

 - `bb-modal-footer-button` Generic button for the modal footer. HTML included in this tag will be included in the contents of the button. You must register events for the button manually.

 - `bb-modal-footer-button-primary` Primary button for the modal footer which will have a custom look.  Default content is 'Save', but HTML included in this tag will be included as the contents of the button if provided. You must register events for the button manually.

 - `bb-modal-footer-button-cancel` Cancel button for the modal footer. Default content is 'Cancel', but HTML included in this tag will be included as the contents of the button if provided. This button automatically cancels the modal form.

 */

(function ($) {
    'use strict';

    var openModalCount = 0;

    angular.module('sky.modal', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .factory('bbModal', ['$uibModal', '$window', function ($uibModal, $window) {
            return {
                open: function (opts) {
                    var bodyEl,
                        isIOS,
                        modalInstance,
                        scrollTop;

                    function modalClosed() {
                        openModalCount--;
                        if (isIOS) {
                            bodyEl
                                .removeClass('bb-modal-open-mobile')
                                .scrollTop(scrollTop);
                        }

                        bodyEl = null;
                    }

                    isIOS = /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                    bodyEl = $(document.body);

                    // Change default values for modal options
                    opts = angular.extend({
                        backdrop: 'static',
                        windowClass: 'bb-modal'
                    }, opts);

                    // Mobile browsers exhibit weird behavior when focusing on an input element
                    // inside a position: fixed element (in this case the modal), and it also
                    // doesn't propery prohibit scrolling on the window.  Adding this CSS class
                    // will change the body position to fixed and the modal position to absolute
                    // to work around this behavior.
                    if (isIOS) {
                        // Setting the body position to be fixed causes it to be scrolled to the
                        // top.  Cache the current scrollTop and set it back when the modal is
                        // closed.
                        scrollTop = bodyEl.scrollTop();
                        bodyEl.addClass('bb-modal-open-mobile');
                    }

                    modalInstance = $uibModal.open(opts);
                    openModalCount++;

                    modalInstance.result.then(modalClosed, modalClosed);

                    return modalInstance;
                }
            };
        }])
        .directive('bbModal', ['$timeout', function ($timeout) {
            function getPixelValue(val) {
                val = val || '0';

                return parseFloat(val.replace('px', ''));
            }

            function getModalBodyWrapperMargin(el) {
                var margin = 0;

                while (el.not('.modal-dialog') && el.length > 0) {
                    margin += el.outerHeight() - el.height();

                    el = el.parent();
                }

                return margin;
            }

            return {
                controller: ['$scope', function ($scope) {
                    this.setBodyEl = function (bodyEl) {
                        $scope.bodyEl = bodyEl;
                    };
                }],
                replace: true,
                transclude: true,
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modal.html',
                link: function ($scope, el) {
                    var bodyEl,
                        resizeTimeout,
                        windowEl = $(window);

                    function fitToWindow() {
                        var margin,
                            modalParentEl,
                            newMaxHeight,
                            reservedHeight;

                        if (bodyEl && bodyEl.length > 0) {
                            modalParentEl = el.parents('.modal-dialog');

                            if (modalParentEl.length > 0) {
                                margin = getPixelValue(modalParentEl.css('margin-bottom')) + getPixelValue(modalParentEl.css('margin-top'));

                                reservedHeight = margin + el.find('.modal-header').outerHeight() + el.find('.modal-footer').outerHeight();

                                // Account for the border, padding, etc. of the elements that wrap the modal body.
                                reservedHeight += getModalBodyWrapperMargin(el);

                                newMaxHeight = windowEl.height() - reservedHeight;

                                bodyEl.css('max-height', newMaxHeight);
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
            };
        }])
        .directive('bbModalBody', function () {
            return {
                link: function (scope, el, attrs, modalCtrl) {
                    el.addClass('modal-body container-fluid');
                    modalCtrl.setBodyEl(el);
                },
                require: '^bbModal',
                restrict: 'A'
            };
        })
        .directive('bbModalHeader', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalheader.html',
                scope: {
                    bbModalHelpKey: '='
                }
            };
        })
        .directive('bbModalFooter', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooter.html'
            };
        })
        .directive('bbModalFooterButton', function () {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbutton.html'
            };
        })
        .directive('bbModalFooterButtonPrimary', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttonprimary.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_primary_button + "</span>");
                    }
                }
            };
        }])
        .directive('bbModalFooterButtonCancel', ['bbResources', function (bbResources) {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbuttoncancel.html',
                link: function ($scope, el) {
                    if (el.children().length === 0) {
                        el.append("<span>" + bbResources.modal_footer_cancel_button + "</span>");
                    }
                }
            };
        }]);
}(jQuery));
