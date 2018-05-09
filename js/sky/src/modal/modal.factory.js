/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var CLS_BODY_FULLPAGE = 'bb-modal-open-fullpage',
        CLS_BODY_MOBILE = 'bb-modal-open-mobile',
        modalCount = 0,
        openFullPageModalCount = 0,
        openModalCount = 0,
        positioningStyleSheet,
        scrollTop;

    function bbModal($uibModal, $window) {
        return {
            open: function (uibModalOptions, additionalOptions) {
                var animation = true,
                    backdropClass,
                    bodyEl,
                    fullPage,
                    idCls,
                    isIOS,
                    modalInstance,
                    windowClass = 'bb-modal';

                function createModalPositioningStylesheet() {
                    var style,
                        bodyMargin;

                    bodyMargin = window.getComputedStyle(document.body).marginTop;
                    /* istanbul ignore else */
                    /* sanity check */
                    if (bodyMargin) {
                        style = document.createElement("style");
                        style.appendChild(document.createTextNode(""));
                        document.head.appendChild(style);
                        style.sheet.insertRule(".bb-modal-open-mobile .bb-modal { margin-top: -" + bodyMargin + " }", 0);
                        positioningStyleSheet = style;
                    }
                }

                function removeModalPositioningStylesheet() {
                    /* istanbul ignore else */
                    /* sanity check */
                    if (positioningStyleSheet) {
                        document.head.removeChild(positioningStyleSheet);
                    }
                }

                function modalClosed() {
                    $(window).off('resize.' + idCls);

                    openModalCount--;

                    if (fullPage) {
                        openFullPageModalCount--;

                        if (openFullPageModalCount === 0) {
                            bodyEl.removeClass(CLS_BODY_FULLPAGE);
                        }
                    }

                    if (isIOS && openModalCount === 0) {
                        removeModalPositioningStylesheet();
                        bodyEl
                            .removeClass(CLS_BODY_MOBILE)
                            .scrollTop(scrollTop);
                    }

                    bodyEl = null;
                }

                if (additionalOptions) {
                    fullPage = additionalOptions.fullPage;
                }

                modalCount++;
                idCls = 'bb-modal-id-' + modalCount;

                windowClass += ' ' + idCls;

                if (fullPage) {
                    windowClass += ' bb-modal-fullpage';
                    backdropClass = 'bb-modal-fullpage-backdrop';
                    animation = false;
                }

                isIOS = /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                bodyEl = $(document.body);

                // Change default values for modal options
                uibModalOptions = angular.extend({
                    animation: animation,
                    backdrop: 'static',
                    backdropClass: backdropClass,
                    windowClass: windowClass
                }, uibModalOptions);

                // Mobile browsers exhibit weird behavior when focusing on an input element
                // inside a position: fixed element (in this case the modal), and it also
                // doesn't propery prohibit scrolling on the window.  Adding this CSS class
                // will change the body position to fixed and the modal position to absolute
                // to work around this behavior.
                if (isIOS && openModalCount === 0) {
                    // Setting the body position to be fixed causes it to be scrolled to the
                    // top.  Cache the current scrollTop and set it back when the modal is
                    // closed.
                    scrollTop = bodyEl.scrollTop();
                    bodyEl.addClass(CLS_BODY_MOBILE);
                    createModalPositioningStylesheet();
                }

                if (fullPage) {
                    bodyEl.addClass(CLS_BODY_FULLPAGE);
                    openFullPageModalCount++;
                }

                modalInstance = $uibModal.open(uibModalOptions);

                openModalCount++;

                modalInstance.result.then(modalClosed, modalClosed);

                return modalInstance;
            }
        };
    }    

    bbModal.$inject = ['$uibModal', '$window'];

    angular.module('sky.modal.factory', ['ui.bootstrap'])
        .factory('bbModal', bbModal);
}(jQuery));
