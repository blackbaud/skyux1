/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Modal', function () {
    'use strict';

    var $animate,
        $compile,
        $document,
        $rootScope,
        $templateCache,
        $timeout,
        $window,
        bbModal,
        bbResources;

    function closeModalInstance(modalInstance) {
        modalInstance.close();
        $rootScope.$digest();
        $animate.flush();
        $rootScope.$digest();
        $animate.flush();
        $rootScope.$digest();
    }

    beforeEach(module(
        'ngMock',
        'ngAnimateMock',
        'sky.helpbutton',
        'sky.modal',
        'sky.templates',
        'uib/template/modal/backdrop.html',
        'uib/template/modal/window.html'
    ));

    beforeEach(module(function ($compileProvider) {
        $compileProvider.directive('bbTestModalTransclude', function () {
            return {
                transclude: true,
                template: '<bb-modal>' +
                    '<div class="modal-form">' +
                        '<bb-modal-header>My Header</bb-modal-header>' +
                        '<div bb-modal-body>' +
                            '<ng-transclude></ng-transclude>' +
                        '</div>' +
                    '</div>' +
                '</bb-modal>'
            };
        });
    }));

    beforeEach(inject(function (_$animate_, _$compile_, _$document_, _$rootScope_, _$templateCache_, _$timeout_, _$window_, _bbModal_, _bbResources_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $document = _$document_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;
        $timeout = _$timeout_;
        $window = _$window_;
        bbModal = _bbModal_;
        bbResources = _bbResources_;
    }));

    afterEach(function () {
        $('.modal-backdrop').remove();
    });

    describe('directive', function () {
        function getPixelValue(val) {
            val = val || '0';

            return parseFloat(val.replace('px', ''));
        }

        it('should display a modal form from a template URL', function () {
            var modalInstance;

            /*jslint white: true */
            $templateCache.put(
                'test/modal/modal.html',
                '<bb-modal>' +
                    '<div class="modal-form">' +
                        '<div bb-modal-body>' +
                            '<span class="test-modal-template-url"></span>' +
                        '</div>' +
                    '</div>' +
                '</bb-modal>');
            /*jslint white: false */

            modalInstance = bbModal.open({
                templateUrl: 'test/modal/modal.html'
            });

            $rootScope.$digest();

            expect($('.modal-dialog .test-modal-template-url')).toBeInDOM();

            closeModalInstance(modalInstance);
        });

        it('should display a modal form from a template string', function () {
            var modalInstance;

            /*jlint white: true */
            modalInstance = bbModal.open({
                template:
                    '<bb-modal>' +
                        '<div class="modal-form">' +
                            '<div bb-modal-body>' +
                                '<span class="test-modal-template"></span>' +
                            '</div>' +
                        '</div>' +
                    '</bb-modal>'
            });
            /*jlint white: false */

            $rootScope.$digest();

            expect($('.modal-dialog .test-modal-template')).toBeInDOM();

            closeModalInstance(modalInstance);
        });

        it('should fit the modal to the current window height', function () {
            var modalEl,
                modalInstance,
                modalMargin,
                parentEl,
                windowHeight = $(window).height();

            /*jlint white: true */
            modalInstance = bbModal.open({
                template:
                    '<bb-modal>' +
                        '<div bb-modal-body>' +
                            '<div style="height: ' + (windowHeight + 100) + '></span>' +
                        '</div>' +
                    '</bb-modal>'
            });
            /*jlint white: false */

            $rootScope.$digest();

            modalEl = $('.bb-modal .modal-dialog');

            modalMargin = getPixelValue(modalEl.css('margin-top')) + getPixelValue(modalEl.css('margin-bottom'));

            parentEl = modalEl.find('.bb-modal-content-wrapper');

            while (parentEl.not('.modal-dialog') && parentEl.length > 0) {
                modalMargin += parentEl.outerHeight() - parentEl.height();
                parentEl = parentEl.parent();
            }

            expect($('.modal-body').css('max-height')).toBe((windowHeight - modalMargin) + 'px');

            closeModalInstance(modalInstance);
        });

        it('should fit the modal to the window height when the window is resized', function () {
            var cssSpy,
                modalInstance,
                resizeListenerCount;

            function getResizeListenerCount() {
                var eventsData = $._data($(window)[0], 'events'),
                    resizeListeners;

                if (eventsData) {
                    resizeListeners = eventsData.resize;

                    if (resizeListeners) {
                        return resizeListeners.length;
                    }
                }

                return 0;
            }

            resizeListenerCount = getResizeListenerCount();

            modalInstance = bbModal.open({
                template: '<bb-modal><div bb-modal-body></div></bb-modal>'
            });

            $rootScope.$digest();

            expect(getResizeListenerCount()).toBe(resizeListenerCount + 1);

            cssSpy = spyOn($.fn, 'css');

            $(window).resize();
            $timeout.flush();

            expect(cssSpy.calls.mostRecent().object[0]).toBe($('.modal-body')[0]);

            closeModalInstance(modalInstance);

            // Ensure the window resize listener is removed when the modal is closed.
            expect(getResizeListenerCount()).toBe(resizeListenerCount);
        });

        it('should be displayed full-page when that option is specified', function () {
            var modalInstance;

            modalInstance = bbModal.open(
                {
                    template: '<bb-modal><bb-modal-header>Heyo</bb-modal-header><div bb-modal-body></div><bb-modal-footer></bb-modal-footer></bb-modal>'
                },
                {
                    fullPage: true
                }
            );

            $rootScope.$digest();

            $(window).resize();
            $timeout.flush();

            expect($('.modal-content').outerHeight()).toBe($(document).height());
            expect($('.modal-content').outerWidth()).toBe($(document).width());

            $(window).resize();
            $timeout.flush();

            expect($('.modal-content').outerHeight()).toBe($(document).height());
            expect($('.modal-content').outerWidth()).toBe($(document).width());

            closeModalInstance(modalInstance);
        });

        it('should add a class to the body element when a full-page modal is opened', function () {
            var bodyEl = $(document.body),
                modalInstance;

            modalInstance = bbModal.open(
                {
                    template: '<bb-modal><div bb-modal-body></div></bb-modal>'
                },
                {
                    fullPage: true
                }
            );

            $rootScope.$digest();

            expect(bodyEl).toHaveClass('bb-modal-open-fullpage');

            closeModalInstance(modalInstance);

            expect(bodyEl).not.toHaveClass('bb-modal-open-fullpage');
        });

        it('should remove the full-page modal class from the body when the last full-page modal is closed', function () {
            var bodyEl = $(document.body),
                modalInstance1,
                modalInstance2;

            modalInstance1 = bbModal.open(
                {
                    template: '<bb-modal><div bb-modal-body></div></bb-modal>'
                },
                {
                    fullPage: true
                });

            modalInstance2 = bbModal.open(
                {
                    template: '<bb-modal><div bb-modal-body></div></bb-modal>'
                },
                {
                    fullPage: true
                }
            );

            $rootScope.$digest();

            expect(bodyEl).toHaveClass('bb-modal-open-fullpage');

            closeModalInstance(modalInstance2);

            expect(bodyEl).toHaveClass('bb-modal-open-fullpage');

            closeModalInstance(modalInstance1);

            expect(bodyEl).not.toHaveClass('bb-modal-open-fullpage');
        });
    });

    describe('body directive', function () {
        it('should render the body contents', function () {
            var $scope = $rootScope.$new(),
                el,
                modalBodyEl;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<div bb-modal-body>Test body</div>' +
                '</bb-modal>'
            )($scope);
            /*jslint white: false */

            $scope.$digest();

            modalBodyEl = el.find('.modal-body');
            expect(modalBodyEl).toHaveText('Test body');
            expect(modalBodyEl).toHaveClass('container-fluid');

            el.remove();
        });

        it('should allow transclusion when included in the template of another directive', function () {
            var $scope = $rootScope.$new(),
                el;

            el = $compile(
                '<bb-test-modal-transclude>' +
                    '<div class="test-transclude"></div>' +
                '</bb-test-modal-transclude>'
            )($scope);

            $scope.$digest();

            expect(el.find('.test-transclude')).toExist();
        });
    });

    describe('header directive', function () {
        it('should render header text', function () {
            var $scope = $rootScope.$new(),
                el;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<bb-modal-header>Test Header</bb-modal-header>' +
                '</bb-modal>'
            )($scope);
            /*jslint white: false */

            $scope.$digest();

            expect(el.find('h1.bb-dialog-header')).toHaveText('Test Header');

            el.remove();
        });

        it('should set the help key button\'s help key', function () {
            var $scope = $rootScope.$new(),
                el;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<bb-modal-header bb-modal-help-key="helpKey"></bb-modal-header>' +
                '</bb-modal>'
            )($scope);
            /*jslint white: false */

            $scope.helpKey = 'modalhelpkeytest.html';
            $scope.$digest();

            expect(el.find('.bb-helpbutton')).toHaveAttr('bb-help-key', 'modalhelpkeytest.html');

            el.remove();
        });

        it('should only show the help button when a help key is specified', function () {
            var $scope = $rootScope.$new(),
                el;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<bb-modal-header></bb-modal-header>' +
                '</bb-modal>'
            )($scope);
            /*jslint white: false */

            $scope.$digest();

            expect(el.find('.bb-helpbutton')).not.toExist();

            el.remove();
        });

        it('should dismiss with close when clicking x on modal header', function () {
            var dismissArgs,
                $scope = $rootScope.$new(),
                el;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<bb-modal-header bb-modal-help-key="helpKey"></bb-modal-header>' +
                '</bb-modal>'
            )($scope);

            $scope.$digest();

            $scope.$dismiss = function (args) {
                dismissArgs = args;
            };

            el.find('.fa.fa-times.close').click();

            $scope.$digest();

            expect(dismissArgs).toBe('close');

            el.remove();
        });

        it('should dismiss with close when enter is pressed on x on modal header', function () {
            var dismissArgs,
                $scope = $rootScope.$new(),
                e,
                el;

            /*jslint white: true */
            el = $compile(
                '<bb-modal>' +
                    '<bb-modal-header bb-modal-help-key="helpKey"></bb-modal-header>' +
                '</bb-modal>'
            )($scope);

            $scope.$digest();

            $scope.$dismiss = function (args) {
                dismissArgs = args;
            };

            e = $.Event('keyup');
            e.which = 13;
            e.keyCode = 13;

            el.find('.fa.fa-times.close').trigger(e);

            $scope.$digest();

            expect(dismissArgs).toBe('close');

            el.remove();
        });

    });

    describe('footer', function () {
        describe('directive', function () {
            it('should render the footer contents', function () {
                var $scope = $rootScope.$new(),
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>Test footer</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.$digest();

                expect(el.find('.modal-footer')).toHaveText('Test footer');

                el.remove();
            });
        });

        describe('button directive', function () {
            it('should render a footer button', function () {
                var $scope = $rootScope.$new(),
                    btnEl,
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>' +
                            '<bb-modal-footer-button>Test button</bb-modal-footer-button>' +
                        '</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.$digest();

                btnEl = el.find('button.btn.bb-btn-secondary');

                expect(btnEl).toHaveAttr('type', 'button');
                expect(btnEl.find('span')).toHaveText('Test button');

                el.remove();
            });
        });

        describe('button primary directive', function () {
            it('should render a primary footer button with default text', function () {
                var $scope = $rootScope.$new(),
                    btnEl,
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>' +
                            '<bb-modal-footer-button-primary></bb-modal-footer-button-primary>' +
                        '</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.$digest();

                btnEl = el.find('button.btn.btn-primary');

                expect(btnEl).toHaveAttr('type', 'submit');
                expect(btnEl.find('span')).toHaveText(bbResources.modal_footer_primary_button);

                el.remove();
            });

            it('should render a primary footer button with the specified text', function () {
                var $scope = $rootScope.$new(),
                    btnEl,
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>' +
                            '<bb-modal-footer-button-primary>{{primaryButtonText}}</bb-modal-footer-button-primary>' +
                        '</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.primaryButtonText = bbResources.modal_footer_primary_button + ' override';
                $scope.$digest();

                btnEl = el.find('button.btn.btn-primary');

                expect(btnEl).toHaveAttr('type', 'submit');
                expect(btnEl.find('span')).toHaveText($scope.primaryButtonText);

                el.remove();
            });
        });

        describe('button cancel directive', function () {
            it('should render a cancel footer button with default text', function () {
                var $scope = $rootScope.$new(),
                    btnEl,
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>' +
                            '<bb-modal-footer-button-cancel></bb-modal-footer-button-cancel>' +
                        '</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.$digest();

                btnEl = el.find('button.btn.btn-link');

                expect(btnEl).toHaveAttr('type', 'button');
                expect(btnEl.find('span')).toHaveText(bbResources.modal_footer_cancel_button);

                el.remove();
            });

            it('should render a cancel footer button with the specified text', function () {
                var $scope = $rootScope.$new(),
                    btnEl,
                    el;

                /*jslint white: true */
                el = $compile(
                    '<bb-modal>' +
                        '<bb-modal-footer>' +
                            '<bb-modal-footer-button-cancel>{{cancelButtonText}}</bb-modal-footer-button-cancel>' +
                        '</bb-modal-footer>' +
                    '</bb-modal>'
                )($scope);
                /*jslint white: false */

                $scope.cancelButtonText = bbResources.modal_footer_cancel_button + ' override';
                $scope.$digest();

                btnEl = el.find('button.btn.btn-link');

                expect(btnEl).toHaveAttr('type', 'button');
                expect(btnEl.find('span')).toHaveText($scope.cancelButtonText);

                el.remove();
            });
        });
    });
});

describe('Modal service', function () {
    'use strict';

    var $uibModal,
        $rootScope,
        $window,
        bbModal;

    beforeEach(module(
        'ngMock',
        'sky.modal'
    ));

    beforeEach(module(function ($provide) {
        $uibModal = {
            open: function () {
                return {
                    result: {
                        then: function (success) {
                            this.success = success;
                        }
                    }
                };
            }
        };

        $window = {
            navigator: {
                userAgent: window.navigator.userAgent
            }
        };

        $provide.value('$uibModal', $uibModal);
        $provide.value('$window', $window);
    }));

    beforeEach(inject(function (_$rootScope_, _bbModal_) {
        $rootScope = _$rootScope_;
        bbModal = _bbModal_;
    }));

    it('should add default options and call through to the UI Bootstrap modal service', function () {
        var openSpy = spyOn($uibModal, 'open').and.callThrough();

        bbModal.open({
            template: 'a'
        });

        $rootScope.$digest();

        expect(openSpy).toHaveBeenCalledWith(jasmine.objectContaining({
            template: 'a',
            backdrop: 'static'
        }));

        // The second-half of the windowClass value varies for each modal, so just check
        // that at least the bb-modal class is present.
        expect(openSpy.calls.argsFor(0)[0].windowClass.indexOf('bb-modal ')).toBe(0);
    });

    describe('on mobile browsers', function () {
        it('should be styled differently to avoid some quirks with fixed position elements', function () {
            var bodyEl,
                modalInstance;

            $window.navigator = {
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/8.0 Mobile/11A465 Safari/9537.53'
            };

            /*jlint white: true */
            modalInstance = bbModal.open({
                template:
                    '<bb-modal>' +
                        '<div class="modal-form">' +
                            '<div bb-modal-body></div>' +
                        '</div>' +
                    '</bb-modal>'
            });
            /*jlint white: false */

            $rootScope.$digest();

            bodyEl = $(document.body);

            expect(bodyEl).toHaveClass('bb-modal-open-mobile');

            modalInstance.result.success();

            expect(bodyEl).not.toHaveClass('bb-modal-open-mobile');
        });
    });
});
