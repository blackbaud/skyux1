/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Scrolling viewkeeper', function () {
    'use strict';
    
    var $compile,
        $document,
        $rootScope,
        $window;
    
    beforeEach(module(
        'ngMock',
        'sky.viewkeeper'
    ));
    
    beforeEach(inject(function (_$compile_, _$rootScope_, _$document_, _$window_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $document = _$document_;
        $window = _$window_;
    }));
    
    describe('directive', function () {
        var el,
            oldDocumentHeight,
            $scope,
            windowHeight;
        
        beforeEach(function () {
            $scope = $rootScope.$new();
            oldDocumentHeight = $($document.body).height();
            windowHeight = $window.innerHeight;
        });
        
        afterEach(function () {
            if (angular.isDefined(el)) {
                if (angular.isFunction(el.remove)) {
                    el.remove();
                }
            }
            
            $window.scroll(0, 0);
            $($window).trigger('scroll');
        });
        
        it('should do nothing if the element is not visible', function () {
            var el,
                vkHtml = '<div bb-scrolling-view-keeper style="display: none; top: 5px;"></div>';

            el = $compile(vkHtml)($scope);
            
            el.appendTo($document.body);
            $scope.$digest();
            
            $window.scroll(0, 300);
            
            $($window).trigger('scroll');
            
            expect(el).toHaveCss({"top": "5px"});
            
            el.remove();
        });
        
        it('should remove the fixed bottom class and set the fixed top class and proper vertical offset if the combined height and vertical offset of the scrolling element is less than the window inner height', function () {
            var expectedTop,
                scrollEl,
                stringTop,
                barEl,
                verticalOffsetEl,
                vkHtml = '<div style="top: 0"><div class="bb-omnibar"><div class="desktop"><div class="bar" style="height: 20px"></div></div></div><div id="myVerticalOffset" style="display: block; width: 20px; height: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px; height: 30px;"></div></div>';
            
            el = angular.element(vkHtml);
            
            $document.find('body').eq(0).prepend(el);
            
            $compile(el)($scope);
            
            $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
            
            scrollEl = el.find('.my-element');
            barEl = el.find('.bar');
            verticalOffsetEl = el.find('#myVerticalOffset');
            $scope.$digest();
            
            $window.scroll(0, 10);
            
            $($window).trigger('scroll');
            
            expectedTop = barEl.outerHeight() + verticalOffsetEl.outerHeight();
            stringTop = expectedTop.toString() + "px";
            expect(scrollEl).toHaveCss({"top": stringTop});
            
            expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
            expect(scrollEl).toHaveClass('bb-grid-filters-fixed-top');
        });
      
        it('sets the top of the scrolling element to 0 and removes the fixed top and bottom classes if the combined height and offset of the scrolling element is greater than the offsetHeight of the document body', function () {
            var scrollEl,
                vkHtml = '<div style="top: 0"><div id="myVerticalOffset" style="display: block; width: 20px; height: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="top: 100px; width: 20px; height: 30px;"></div></div>';
            
            el = angular.element(vkHtml);
            
            $document.find('body').eq(0).prepend(el);
            
            $compile(el)($scope);
            
            scrollEl = el.find('.my-element');

            $scope.$digest();
            
            $window.scroll(0, 10);
            
            $($window).trigger('scroll');
            expect(scrollEl[0].style.top).toBe("0px");
            
            expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
            expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
        });
        
        describe('scrolling down', function () {
            it('removes the fixed bottom and top classes and sets the top of the scrolling element to the top subtracted from the start top value when scrolling down and the height and top of the scrollable element is greater than the scroll position and height of the window', function () {
                var scrollEl,
                    verticalOffsetEl,
                    vkHtml = '<div style="top: 0"><div class="bb-omnibar"><div class="desktop"><div class="bar" style="height: 20px"></div></div></div><div id="myVerticalOffset" style="width: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px; height: 30px;"></div></div>';
            
                el = angular.element(vkHtml);
            
                $document.find('body').eq(0).prepend(el);
            
            
                $compile(el)($scope);
            
                $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
            
                verticalOffsetEl = el.find('#myVerticalOffset');
                verticalOffsetEl.height(windowHeight);
                
                scrollEl = el.find('.my-element');
                $scope.$digest();
            
                $window.scroll(0, 10);
            
                $($window).trigger('scroll');
            
                expect(scrollEl[0].style.top).toBe("0px");
            
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
            });
            
            it('removes the fixed bottom and top classes and sets the top of the scrolling element to the top subtracted from the start top value when scrolling down and the height and top of the scrollable element is equal to the scroll position and height of the window', function () {
                var scrollEl,
                     verticalOffsetEl,
                     vkHtml = '<div style="top: 0"><div class="bb-omnibar"><div class="desktop"><div class="bar" style="height: 20px"></div></div></div><div id="myVerticalOffset" style="width: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px; height: 30px;"></div></div>';
            
                el = angular.element(vkHtml);
            
                $document.find('body').eq(0).prepend(el);
            
                $compile(el)($scope);
            
                $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
                verticalOffsetEl = el.find('#myVerticalOffset');
                verticalOffsetEl.height(windowHeight);
                
                scrollEl = el.find('.my-element');
                $scope.$digest();
            
                $window.scroll(0, 50);
            
                $($window).trigger('scroll');
                
                scrollEl = el.find('.my-element');
                
                expect(scrollEl.length).toBe(1);
            
                expect(scrollEl[0].style.top).toBe("0px");
            
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
            });
        
            it('removes the fixed top class and adds the fixed bottom class when scrolling down and the height and top of the scrollable element is less than the scroll position and height of the window', function () {
                var scrollEl,
                    verticalOffsetEl,
                    vkHtml = '<div style="top: 0"><div class="bb-omnibar"><div class="desktop"><div class="bar" style="height: 20px"></div></div></div><div id="myVerticalOffset" style="display: block; width: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px; height: 100px;"></div><div style="height: 1000px; width: 20px;"></div></div>';
            
                el = angular.element(vkHtml);
            
                $document.find('body').eq(0).prepend(el);           
            
                $compile(el)($scope);
            
                $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
                
                verticalOffsetEl = el.find('#myVerticalOffset');
                verticalOffsetEl.height(windowHeight);
            
                scrollEl = el.find('.my-element');
                $scope.$digest();
                
                $window.scroll(0, (windowHeight));
            
                $($window).trigger('scroll');
            
                expect(scrollEl).toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
            });
        });
        
        describe('scrolling up', function () {
            it('removes the fixed bottom and top classes and sets the top of the scrolling element to the top subtracted from the start top value when scrolling up and the top value of the scrolling element is less than the scroll position and vertical offset', function () {
                var scrollEl,
                    vkHtml = '<div style="top: 5px;"><div id="myVerticalOffset" style="height: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px;"></div></div>';
            
                el = angular.element(vkHtml);
            
                $document.find('body').eq(0).prepend(el);
            
                $compile(el)($scope);
            
                $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
            
                scrollEl = el.find('.my-element');
                scrollEl.height((windowHeight * 2));
                $scope.$digest();
            
                $window.scroll(0, windowHeight);
            
                $($window).trigger('scroll');
                
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
                
                $window.scroll(0, (windowHeight * 0.5));
                
                $($window).trigger('scroll');
                
                // windows 8.1 flakiness
                if (scrollEl[0].style.top !== "0.5px") {
                    expect(scrollEl[0].style.top).toBe("0px");
                }
                
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
            });
        
            it('removes the fixed bottom class and adds the fixed top class and sets the top of the scrolling element to the vertical offset when scrolling up and the top value of the scrolling element is greater than or equal to the scroll position and vertical offset', function () {
                var scrollEl,
                    vkHtml = '<div style="top: 5px;"><div id="myVerticalOffset" style="height: 20px;"></div><div class="my-element" bb-scrolling-view-keeper="vkOptions" style="width: 20px;"></div></div>';
                el = angular.element(vkHtml);
            
                $document.find('body').eq(0).prepend(el);
            
                $compile(el)($scope);
            
                $scope.vkOptions = { viewKeeperOffsetElId: 'myVerticalOffset' };
            
                scrollEl = el.find('.my-element');
                scrollEl.height((windowHeight * 2));
                $scope.$digest();
            
                $window.scroll(0, windowHeight);
            
                $($window).trigger('scroll');
                
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-top');
                
                $window.scroll(0, 0);
                
                $($window).trigger('scroll');
                
                expect(scrollEl[0].style.top).toBe("20px");
            
                expect(scrollEl).not.toHaveClass('bb-grid-filters-fixed-bottom');
                expect(scrollEl).toHaveClass('bb-grid-filters-fixed-top');
                
            });
        });  
    });
});

describe('Scrolling viewkeeper on iOS', function () {
    'use strict';
    
    var $compile,
        $rootScope,
        $window,
        bbViewKeeperBuilder;
    
    function getScrollListenerCount() {
        var eventsData = $._data($(window)[0], 'events'),
            listeners;

        if (eventsData) {
            listeners = eventsData.scroll;

            if (listeners) {
                return listeners.length;
            }
        }

        return 0;
    }
    
    beforeEach(module(
       'ngMock'
    ));

    beforeEach(module(function ($provide) {
        $window = {
            navigator: {
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/8.0 Mobile/11A465 Safari/9537.53'
            }
        };

        $provide.value('$window', $window);
    }));

    beforeEach(module(
        'sky.viewkeeper'
    ));
    
    beforeEach(inject(function (_$compile_, _$rootScope_, _bbViewKeeperBuilder_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbViewKeeperBuilder = _bbViewKeeperBuilder_;
    }));
    
    it('should do nothing', function () {
        var $scope = $rootScope.$new(),
            el,
            scrollListenerCount,
            vkHtml = '<div bb-scrolling-view-keeper style="display: none; top: 5px;"></div>';

        el = $compile(vkHtml)($scope);

        el.appendTo(document.body);
        
        scrollListenerCount = getScrollListenerCount();
        
        $scope.$digest();
        
        expect(getScrollListenerCount()).toBe(scrollListenerCount);
    });
});