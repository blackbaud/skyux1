/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Listbuilder footer', function () {
        var $compile,
            $scope,
            $document,
            $timeout,
            bbViewKeeperBuilder,
            listbuilderHtml,
            $window;

        beforeEach(module(
            'sky.listbuilder',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, _bbViewKeeperBuilder_, _$window_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $document = _$document_;
            $timeout = _$timeout_;
            bbViewKeeperBuilder = _bbViewKeeperBuilder_;
            $window = _$window_;
        }));

        function timeoutFlushIfAvailable() {
            try {
                $timeout.verifyNoPendingTasks();
            } catch (aException) {
                $timeout.flush();
            }
        }

        beforeEach(function () {
            listbuilderHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-toolbar>' +
                    '</bb-listbuilder-toolbar>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore(loadingComplete)" ' +
                    'bb-listbuilder-show-load-more="listCtrl.showLoadMore">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');
        });

        describe('actionbar', function () {

            function getActionBar() {
                return $document.find('body .bb-listbuilder-actionbar');
            }

            function setupActionbarTest(isFixed, scrollToTop, onStateChangedCallback, customHtml) {
                var el;
                spyOn(bbViewKeeperBuilder, 'create').and.callFake(function (args) {

                    onStateChangedCallback = args.onStateChanged;
                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {
                            scrollToTop.called = true;
                        },
                        syncElPosition: function () {

                        },
                        isFixed: isFixed
                    };
                });

                if (customHtml) {
                    el = $compile(customHtml)($scope);
                } else {
                    el = $compile(listbuilderHtml)($scope);
                }
               
                el.appendTo($document.find('body'));
                $scope.$digest();
                
                if (angular.isFunction(onStateChangedCallback)) {
                    onStateChangedCallback();
                }
                
                timeoutFlushIfAvailable();

                return el;
            }
           
            it('should create an actionbar at the bottom of the page when scroll to top is available', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback,
                    scrollToTop = {
                        called: false
                    };

                el = setupActionbarTest(true, scrollToTop, onStateChangedCallback);

                actionbarEl = getActionBar();

                expect(actionbarEl).toBeVisible();

                actionbarEl.find('.btn.btn-link').click();
                $scope.$digest();
                expect(scrollToTop.called).toBe(true);
                
                el.remove();
            });

            it('should not create an actionbar at the bottom of the page when scroll to top is not available', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback;

                el = setupActionbarTest(false, {}, onStateChangedCallback);

                actionbarEl = getActionBar();

                expect(actionbarEl).not.toBeVisible();
                el.remove();
            });

            it('does not scroll to top if scrollbar is not specified', function () {
                var el,
                    actionbarEl,
                    onStateChangedCallback,
                    scrollToTop = {
                        called: false
                    },
                    listbuilderNoToolbarHtml = angular.element(
                    '<bb-listbuilder>' +
                    '<bb-listbuilder-footer bb-listbuilder-on-load-more="listCtrl.onLoadMore(loadingComplete)" ' +
                    'bb-listbuilder-show-load-more="true">' +
                    '</bb-listbuilder-footer>' + 
                    '</bb-listbuilder>');

                el = setupActionbarTest(true, scrollToTop, onStateChangedCallback, listbuilderNoToolbarHtml);
                actionbarEl = getActionBar();

                actionbarEl.find('.btn.btn-link').click();
                $scope.$digest();
                expect(scrollToTop.called).toBe(false);
                el.remove();
            });
        });

        describe('load more', function () {
            var loadCalls,
                windowEl;
            function setupScrollInfinity(inView) {
                var windowVal = 10,
                    offsetVal;
                offsetVal = inView ? 0 : 30; 
                spyOn($.fn, 'scrollTop').and.returnValue(windowVal);
                spyOn($.fn, 'height').and.returnValue(windowVal);
                spyOn($.fn, 'offset').and.returnValue({ top: offsetVal });
            }

            beforeEach(function () {
                loadCalls = 0;
                $scope.listCtrl = {
                    showLoadMore: true,
                    onLoadMore: function (loadingComplete) {
                        loadCalls++;
                        loadingComplete();
                    }
                };
                windowEl = angular.element($window);
            });

            it('should load more data when the footer is in view and bbListbuilderShowLoadMore is true', function () {
                var el;
                
                setupScrollInfinity(true);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(2);
            });

            it('should not load more data when the footer is in view and bbListbuilderShowLoadMore is false', function () {
                var el;
            
                setupScrollInfinity(true);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);

                $scope.listCtrl.showLoadMore = false;
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(1);
            });
            
            it('should not load more data when the footer is not in view and bbListbuilderShowLoadMore is true', function () {
                var el;
            
                setupScrollInfinity(false);
                
                el = $compile(listbuilderHtml)($scope);
                $scope.$digest();

                windowEl.scroll();
                timeoutFlushIfAvailable();
                expect(loadCalls).toBe(0);

            });
        });
        
    });
}());
