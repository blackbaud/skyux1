/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Infinite scroll', function () {
        var $compile,
            $scope,
            $timeout, 
            $window,
            windowEl,
            loadCalls,
            infiniteHtml = '<div><bb-infinite-scroll ' + 
                'bb-infinite-scroll-has-more="infiniteCtrl.hasMore" ' +
                'bb-infinite-scroll-load="infiniteCtrl.loadFn()">' +
                '</bb-infinite-scroll></div>';

        beforeEach(module(
            'sky.infinitescroll',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$window_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            $window = _$window_;

        }));

        function getLoadMoreButton(el) {
            return el.find('.bb-btn-secondary');
        }

        function timeoutFlushIfAvailable() {
            try {
                $timeout.verifyNoPendingTasks();
            } catch (aException) {
                $timeout.flush();
            }
        }

        function setupScrollInfinite(inView, parentScrollable) {
            var windowVal = 10,
                offsetVal;
            offsetVal = inView ? 0 : 30; 

            spyOn($.fn, 'scrollTop').and.returnValue(windowVal);
            spyOn($.fn, 'height').and.returnValue(windowVal);
            
            if (!parentScrollable) {
                spyOn($.fn, 'offset').and.returnValue({ top: offsetVal });
            } else {
                spyOn($.fn, 'position').and.returnValue({ top: offsetVal });
            }

        }

        beforeEach(function () {
            loadCalls = 0;
            $scope.infiniteCtrl = {
                hasMore: true,
                loadFn: function () {
                    loadCalls++;
                }
            };
            windowEl = angular.element($window);
        });

        it('should set the infinite scroll button text', function () {
            var el,
                buttonEl;
            
            $scope.infiniteCtrl = {
                hasMore: true,
                loadFn: function () {
                    angular.noop();
                }
            };
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();
            buttonEl = getLoadMoreButton(el);
            expect(getLoadMoreButton(el)).toHaveText('Load more');

        });

        it('should call the loading callback if the component is in view', function () {
            var el;
            
            setupScrollInfinite(true);
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();

            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
        });

        it('should not call the loading callback if the component is not in view', function () {
            var el;

            setupScrollInfinite(false);
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();
            
            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(0);
        });

        it('should call the loading callback if the load more button is pressed', function () {
            var el;
            
            setupScrollInfinite(true);
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();

            el.find('.bb-btn-secondary').click();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
        });

        it('should not have the load more button visible if the component load more button is pressed and is already loading', function () {
            var el,
                loadCallback;
            
            $scope.infiniteCtrl.loadFn = function () {
                return {
                    then: function (callback) {
                        loadCallback = callback;
                    }
                };     
            };

            setupScrollInfinite(true);
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();

            el.find('.bb-btn-secondary').click();
            timeoutFlushIfAvailable();
            expect(el.find('.bb-btn-secondary').length).toBe(0);

            loadCallback();
            $scope.$digest();
            expect(el.find('.bb-btn-secondary').length).toBe(1);

        });

        it('should not show the component if there are no more items available', function () {
            var el;
            
            $scope.infiniteCtrl.hasMore = false;

            setupScrollInfinite(true);
            
            el = $compile(infiniteHtml)($scope);
            $scope.$digest();

            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(0);
        });

        it('should handle a scrollable parent properly', function () {
            var parentHtml = '<div style="overflow-y: scroll;"><bb-infinite-scroll ' + 
                'bb-infinite-scroll-has-more="infiniteCtrl.hasMore" ' +
                'bb-infinite-scroll-load="infiniteCtrl.loadFn()">' +
                '</bb-infinite-scroll></div>',
                el;
            
            setupScrollInfinite(true, true);
            
            el = $compile(parentHtml)($scope);
            $scope.$digest();

            el.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
            
        });

        it('should handle an auto parent properly', function () {
            var parentHtml = '<div style="overflow-y: auto;"><bb-infinite-scroll ' + 
                'bb-infinite-scroll-has-more="infiniteCtrl.hasMore" ' +
                'bb-infinite-scroll-load="infiniteCtrl.loadFn()">' +
                '</bb-infinite-scroll></div>',
                el;
            
            setupScrollInfinite(true, true);
            
            el = $compile(parentHtml)($scope);
            $scope.$digest();

            el.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
            
        });
      
    });
})();