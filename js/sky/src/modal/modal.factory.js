/*jshint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var CLS_BODY_FULLSCREEN = 'bb-modal-open-fullscreen',
        CLS_BODY_MOBILE = 'bb-modal-open-mobile',
        modalCount = 0,
        openFullscreenModalCount = 0,
        openModalCount = 0;

    function bbModal($uibModal, $window) {
        return {
            open: function (opts, fullscreen) {
                var animation = true,
                    backdropClass,
                    bodyEl,
                    idCls,
                    isIOS,
                    modalInstance,
                    scrollTop,
                    windowClass = 'bb-modal';

                function modalClosed() {
                    $(window).off('resize.' + idCls);

                    openModalCount--;

                    if (fullscreen) {
                        openFullscreenModalCount--;

                        if (openFullscreenModalCount === 0) {
                            bodyEl.removeClass(CLS_BODY_FULLSCREEN);
                        }
                    }

                    if (isIOS) {
                        bodyEl
                            .removeClass(CLS_BODY_MOBILE)
                            .scrollTop(scrollTop);
                    }

                    bodyEl = null;
                }

                modalCount++;
                idCls = 'bb-modal-id-' + modalCount;

                windowClass += ' ' + idCls;

                if (fullscreen) {
                    windowClass += ' bb-modal-fullscreen';
                    backdropClass = 'bb-modal-fullscreen-backdrop';
                    animation = false;
                }

                isIOS = /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                bodyEl = $(document.body);

                // Change default values for modal options
                opts = angular.extend({
                    animation: animation,
                    backdrop: 'static',
                    backdropClass: backdropClass,
                    windowClass: windowClass
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
                    bodyEl.addClass(CLS_BODY_MOBILE);
                }

                if (fullscreen) {
                    bodyEl.addClass(CLS_BODY_FULLSCREEN);
                    openFullscreenModalCount++;
                }

                modalInstance = $uibModal.open(opts);

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
