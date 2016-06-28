/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';
    describe('Infinity scroll', function () {
        var $compile,
            $scope,
            $timeout, 
            $window,
            infinityHtml = '<div><bb-infinity-scroll ' + 
                'bb-infinity-scroll-has-more="infinityCtrl.hasMore" ' +
                'bb-infinity-scroll-load="infinityCtrl.loadFn(loadingComplete)">' +
                '</bb-infinity-scroll></div>';

        beforeEach(module(
            'sky.infinityscroll',
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

        it('should set the infinity scroll button text', function () {
            var el,
                buttonEl;
            
            $scope.infinityCtrl = {
                hasMore: true,
                loadFn: function () {
                    angular.noop();
                }
            };
            
            el = $compile(infinityHtml)($scope);
            $scope.$digest();
            buttonEl = getLoadMoreButton(el);
            expect(getLoadMoreButton(el)).toHaveText('Load more');

        });

        it('should call the loading callback if the component is in view', function () {
            var el,
                windowEl = angular.element($window),
                loadCalls = 0;
            
            $scope.infinityCtrl = {
                hasMore: true,
                loadFn: function (loadingComplete) {
                    loadCalls++;
                    loadingComplete();
                }
            };

            spyOn($.fn, 'scrollTop').and.returnValue(10);
            spyOn($.fn, 'height').and.returnValue(10);
            spyOn($.fn, 'offset').and.returnValue({ top: 0 });
            
            el = $compile(infinityHtml)($scope);
            $scope.$digest();

            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
        });

        it('should not call the loading callback if the component is not in view', function () {
            var el,
                windowEl = angular.element($window),
                loadCalls = 0;
            
            $scope.infinityCtrl = {
                hasMore: true,
                loadFn: function (loadingComplete) {
                    loadCalls++;
                    loadingComplete();
                }
            };

            spyOn($.fn, 'scrollTop').and.returnValue(0);
            spyOn($.fn, 'height').and.returnValue(0);
            spyOn($.fn, 'offset').and.returnValue({ top: 10 });
            
            el = $compile(infinityHtml)($scope);
            $scope.$digest();
            
            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(0);
        });

        it('should not call the loading callback if the component is already loading', function () {
            var el,
                windowEl = angular.element($window),
                loadCalls = 0,
                loadPromise;
            
            $scope.infinityCtrl = {
                hasMore: true,
                loadFn: function (loadingComplete) {
                    loadCalls++;
                    loadPromise = loadingComplete;
                }
            };

            spyOn($.fn, 'scrollTop').and.returnValue(10);
            spyOn($.fn, 'height').and.returnValue(10);
            spyOn($.fn, 'offset').and.returnValue({ top: 0 });
            
            el = $compile(infinityHtml)($scope);
            $scope.$digest();

            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);
            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(1);


        });

        it('should not show the component if there are no more items available', function () {
            var el,
                windowEl = angular.element($window),
                loadCalls = 0;
            
            $scope.infinityCtrl = {
                hasMore: false,
                loadFn: function (loadingComplete) {
                    loadCalls++;
                    loadingComplete();
                }
            };

            spyOn($.fn, 'scrollTop').and.returnValue(10);
            spyOn($.fn, 'height').and.returnValue(10);
            spyOn($.fn, 'offset').and.returnValue({ top: 0 });
            
            el = $compile(infinityHtml)($scope);
            $scope.$digest();

            windowEl.scroll();
            timeoutFlushIfAvailable();
            expect(loadCalls).toBe(0);
        });
      
    });
}());
