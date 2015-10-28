/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Tabscroll directive', function () {
    'use strict';
    
    var $compile,
        $scope,
        $timeout,
        fxOff,
        wideTabHtml;
    
    function validateSpyOnTabs(spy) {
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.mostRecent().object).toHaveClass('nav-tabs');
    }
    
    beforeEach(module(
        'ngMock',
        'sky.tabscroll',
        'template/tabs/tabset.html',
        'template/tabs/tab.html'
    ));
    
    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $timeout = _$timeout_;
        
        wideTabHtml = '<tabset bb-tab-scroll bb-tab-scroll-ready="ready">' +
                '<tab style="width: 100px" heading="1"></tab>' +
                '<tab style="width: 100px" heading="2"></tab>' +
                '<tab style="width: 100px" heading="3"></tab>' +
                '<tab style="width: 100px" heading="4"></tab>' +
                '<tab style="width: 100px" heading="5"></tab>' +
                '<tab style="width: 100px" heading="6"></tab>' +
                '<tab style="width: 100px" heading="7"></tab>' +
                '<tab style="width: 100px" heading="8"></tab>' +
                '<tab style="width: 100px" heading="9"></tab>' +
                '<tab style="width: 100px" heading="10"></tab>' +
            '</tabset>';
        
        // Remove animation delay so tests don't have to be asynchronous.
        fxOff = $.fx.off;
        $.fx.off = true;
    }));
    
    afterEach(function () {
        $.fx.off = fxOff;
    });

    it('should add the bb-tab-scroll class to the tabset element', function () {
        var el = $compile('<tabset bb-tab-scroll></tabset>')($scope);

        $scope.$digest();
        
        expect(el).toHaveClass('bb-tab-scroll');
    });
    
    it('should add a resize listener on window and remove it when the element is destroyed', function () {
        var el1 = $compile('<tabset bb-tab-scroll></tabset>')($scope),
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
        
        $compile(wideTabHtml)($scope);
        
        resizeListenerCount = getResizeListenerCount();

        $scope.$digest();
        
        expect(getResizeListenerCount()).toBe(resizeListenerCount + 2);
        
        // Causes the $destroy() event to fire which is what removes the window resize listener.
        el1.remove();
        
        // The resize listener from el2 should still be present.
        expect(getResizeListenerCount()).toBe(resizeListenerCount + 1);
    });
    
    describe('animation', function () {
        function validateScollOnClick(el, selector, expectedScrollLeft) {
            var animateSpy = spyOn($.fn, 'animate');

            el.find(selector).click();

            expect(animateSpy).toHaveBeenCalledWith(
                {
                    scrollLeft: expectedScrollLeft
                },
                {
                    duration: 250
                }
            );

            expect(animateSpy.calls.mostRecent().object).toHaveClass('nav-tabs');
            
            el.remove();
        }
        
        function getWidthSpy(widthFn, fakeWindowWidth) {
            return spyOn($.fn, 'width').and.callFake(function () {
                if (this[0] === window || this.is('.bb-tab-scroll')) {
                    return angular.isFunction(fakeWindowWidth) ? fakeWindowWidth() : fakeWindowWidth;
                }
                
                return widthFn.apply(this, arguments);
            });
        }
        
        it('should not error when no tabs are present', function () {
            var el,
                widthFn,
                widthSpy;
            
            /*jlsint white: true */
            el = $compile(
                '<tabset bb-tab-scroll></tabset>'
            )($scope);
            /*jslint white: false */
            
            el.appendTo(document.body);
            
            $scope.$digest();

            widthFn = $.fn.width;
            
            widthSpy = getWidthSpy(widthFn, 200);

            $(window).resize();
            $timeout.flush();
            
            el.remove();
        });

        it('should occur when the window changes width', function () {
            var animateSpy,
                el,
                spyWindowWidth,
                widthFn,
                widthSpy;

            widthFn = $.fn.width;
            
            spyWindowWidth = 500;
            
            widthSpy = getWidthSpy(widthFn, function () {
                return spyWindowWidth;
            });
            
            /*jslint white: true */
            el = $compile(
                '<tabset bb-tab-scroll>' +
                    '<tab style="width: 100px">A</tab>' +
                    '<tab style="width: 100px">B</tab>' +
                    '<tab style="width: 100px">C</tab>' +
                '</tabset>'
            )($scope);
            /*jslint white: false */
            
            el.appendTo(document.body);
            
            $scope.$digest();

            animateSpy = spyOn($.fn, 'animate');
            
            spyWindowWidth = 200;
            
            $(window).resize();

            // Verify that the animation is triggered on a delay.
            expect(animateSpy).not.toHaveBeenCalled();
            
            $timeout.flush();
            
            validateSpyOnTabs(animateSpy);
            
            el.remove();
        });

        it('should only scroll active tab into view when width changes but tabs can already be scrolled', function () {
            var animateSpy,
                el,
                scrollLeftSpy,
                scrollWasCalled,
                spyWindowWidth,
                widthFn,
                widthSpy;
            
            $scope.tabCActive = true;
            
            /*jslint white: true */
            el = $compile(
                '<tabset bb-tab-scroll>' +
                    '<tab style="width: 100px">A</tab>' +
                    '<tab style="width: 100px">B</tab>' +
                    '<tab style="width: 100px" active="tabCActive">C</tab>' +
                '</tabset>'
            )($scope);
            /*jslint white: false */
            
            el.appendTo(document.body);
            
            $scope.$digest();

            widthFn = $.fn.width;
            
            spyWindowWidth = 200;
            
            widthSpy = getWidthSpy(widthFn, function () {
                return spyWindowWidth;
            });

            animateSpy = spyOn($.fn, 'animate');
            
            scrollLeftSpy = spyOn($.fn, 'scrollLeft').and.callFake(function () {
                if (this.hasClass('nav-tabs')) {
                    scrollWasCalled = true;
                }
            });
            
            $(window).resize();
            $timeout.flush();
            
            expect(scrollWasCalled).toBe(true);
            
            validateSpyOnTabs(animateSpy);
            
            scrollWasCalled = false;
            
            spyWindowWidth = 150;
            
            $(window).resize();
            $timeout.flush();
            
            expect(scrollWasCalled).toBe(false);
            
            el.remove();
        });

        it('should not occur when the window changes width but the tabs can already be scrolled', function () {
            var animateSpy,
                el,
                spyWindowWidth,
                widthFn,
                widthSpy;
            
            /*jslint white: true */
            el = $compile(
                '<tabset bb-tab-scroll>' +
                    '<tab style="width: 100px">A</tab>' +
                    '<tab style="width: 100px">B</tab>' +
                    '<tab style="width: 100px">C</tab>' +
                '</tabset>'
            )($scope);
            /*jslint white: false */
            
            el.appendTo(document.body);
            
            $scope.$digest();

            widthFn = $.fn.width;
            
            spyWindowWidth = 250;
            
            widthSpy = getWidthSpy(widthFn, function () {
                return spyWindowWidth;
            });

            animateSpy = spyOn($.fn, 'animate');
            
            $(window).resize();
            $timeout.flush();
            
            validateSpyOnTabs(animateSpy);
            
            expect(animateSpy.calls.count()).toBe(1);
            
            spyWindowWidth = 200;
            
            $(window).resize();
            $timeout.flush();
            
            expect(animateSpy.calls.count()).toBe(1);
            
            el.remove();
        });

        it('should not occur when the window resizes but the width does not change', function () {
            var animateSpy,
                widthSpy;

            $compile('<tabset bb-tab-scroll></tabset>')($scope);
            
            $scope.$digest();

            widthSpy = spyOn($.fn, 'width').and.returnValue(400);

            animateSpy = spyOn($.fn, 'animate');
            $(window).resize();

            widthSpy.and.callThrough();
            
            $timeout.flush();
            
            expect(animateSpy).not.toHaveBeenCalled();
        });
        
        it('should occur when the tabs are ready', function () {
            /*jslint white: true */
            var animateSpy,
                el,
                scrollLeftSpy,
                stopSpy;

            el = $compile(wideTabHtml)($scope);
            /*jslint white: false */

            animateSpy = spyOn($.fn, 'animate');
            
            // Ensure any current animation is stopped before animating again.
            stopSpy = spyOn($.fn, 'stop');
            
            scrollLeftSpy = spyOn($.fn, 'scrollLeft').and.callThrough();
            
            $scope.$digest();

            $scope.ready = true;
            $scope.$digest();
            
            // Ensure the tabs are scrolled all the way to the right before animation begins.
            expect(scrollLeftSpy).toHaveBeenCalledWith(0);
            
            validateSpyOnTabs(stopSpy);
            validateSpyOnTabs(animateSpy);
        });

        it('should occur when a left-most is clicked and scrolled partially off the left', function () {
            var el = $compile(wideTabHtml)($scope);

            el.appendTo(document.body);
            
            $scope.$digest();

            el.width(100);
            
            $scope.ready = true;
            $scope.$digest();

            el.children('.nav-tabs').scrollLeft(10);

            validateScollOnClick(el, 'li:first a', 0);
        });

        it('should occur when a right-most is clicked and scrolled partially off the right', function () {
            var el = $compile(wideTabHtml)($scope),
                navTabsEl;
            
            el.appendTo(document.body);
            
            $scope.$digest();

            el.width(100);
            
            $scope.ready = true;
            $scope.$digest();

            navTabsEl = el.children('.nav-tabs');

            navTabsEl.scrollLeft((navTabsEl[0].scrollWidth - (el.width() + 20)));

            validateScollOnClick(el, 'li:last a', (navTabsEl[0].scrollWidth - el.width()));
        });

        it('should not occur when clicked tab is fully in view', function () {
            /*jslint white: true */
            var animateSpy,
                el;

            el = $compile(wideTabHtml)($scope);
            /*jslint white: false */
            
            el.appendTo(document.body);
            
            $scope.$digest();

            el.width(400);
            
            $scope.ready = true;
            $scope.$digest();
            
            animateSpy = spyOn($.fn, 'animate');
            el.find('li:first a').click();

            expect(animateSpy).not.toHaveBeenCalled();

            el.remove();
        });
    });
});