/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Scroll into view', function () {
    'use strict';
    
    var $timeout,
        $window,
        bbScrollIntoView,
        fxOff;
    
    function createScrollSpy() {
        return spyOn($.fn, 'animate').and.callThrough();
    }
    
    function createHighlightSpy() {
        return spyOn($.fn, 'addClass').and.callThrough();
    }
    
    function validateHighlightSpy(spy) {
        expect(spy).toHaveBeenCalledWith('bb-scroll-into-view-highlighting');
    }
    
    function validateScrollSpy(el, animateSpy, scrollTop, highlightSpy, expectedParentEl) {
        var allAnimateCalls = animateSpy.calls.all(),
            animateCall,
            i,
            n,
            wasCalled = false;
        
        function isExpectedParentEl(el) {
            if (expectedParentEl) {
                return expectedParentEl[0] === el[0];
            }
            
            return el.selector === 'html, body';
        }
        
        for (i = 0, n = allAnimateCalls.length; i < n; i++) {
            animateCall = allAnimateCalls[i];
            
            if (isExpectedParentEl(animateCall.object)) {
                wasCalled = true;
                
                expect(animateCall.args[0]).toEqual({
                    scrollTop: scrollTop
                });
            }
        }
        
        expect(wasCalled).toBe(true);
        
        if (highlightSpy) {
            validateHighlightSpy(highlightSpy);
        }
    }
    
    function testScroll(el, spyScrollTop, scrollTop, options) {
        var animateSpy,
            highlightSpy;
        
        spyOn($.fn, 'scrollTop').and.returnValue(spyScrollTop);

        animateSpy = createScrollSpy();
        
        if (options && options.highlight) {
            highlightSpy = createHighlightSpy();
        }

        bbScrollIntoView(el, options);

        validateScrollSpy(el, animateSpy, scrollTop, highlightSpy);

        el.remove();
    }
    
    function positionElOffBottom(el) {
        var elTop,
            windowHeight;
        
        windowHeight = $($window).height();
        elTop = windowHeight - 20;

        el.css({
            top: elTop,
            height: 40
        });
    }
    
    function testScrollOffBottom(elTop, expectedScrollTop, options) {
        var el = $('<div style="position: absolute;"></div>');

        positionElOffBottom(el);

        el.appendTo(document.body);

        testScroll(el, 0, expectedScrollTop, options);
    }
    
    function testScrollOffTop(elTop, expectedScrollTop, options) {
        var el,
            elSpacer;

        el = $('<div style="position: absolute;"></div>')
            .css({
                top: elTop,
                height: 40
            })
            .appendTo(document.body);

        // This should make the window scrollable.
        elSpacer = $('<div style="position: absolute;"></div>')
            .css({
                top: 40,
                height: $($window).height() + elTop + 100
            })
            .appendTo(document.body);

        testScroll(el, 20, expectedScrollTop, options);
        
        elSpacer.remove();
    }
    
    beforeEach(module('sky.scrollintoview'));
    
    beforeEach(inject(function (_$timeout_, _$window_, _bbScrollIntoView_) {
        $timeout = _$timeout_;
        $window = _$window_;
        bbScrollIntoView = _bbScrollIntoView_;
    }));
    
    beforeEach(function () {
        // Remove animation delay so tests don't have to be asynchronous.
        fxOff = $.fx.off;
        $.fx.off = true;
    });
    
    afterEach(function () {
        $.fx.off = fxOff;
    });
    
    describe('service', function () {
        it('should do nothing if element is in view', function () {
            var el,
                scrollSpy;
            
            el = $('<div style="position: absolute;"></div>')
                .appendTo(document.body);
            
            scrollSpy = createScrollSpy();
            
            bbScrollIntoView(el);
            
            expect(scrollSpy).not.toHaveBeenCalled();
            
            el.remove();
        });
        
        it('should scroll the entire element into view when partially scrolled off the bottom of the window', function () {
            testScrollOffBottom(0, 20);
        });
        
        it('should scroll the entire element into view when partially scrolled off the top of the window', function () {
            testScrollOffTop(0, 0);
        });
                                     
        it('should scroll the top of an element to the top of the window when the element is taller than the window', function () {
            var el,
                elTop,
                windowHeight;
            
            el = $('<div style="position: absolute;"></div>');
            
            windowHeight = $($window).height();
            elTop = windowHeight - 20;
            
            el.css({
                top: elTop,
                height: windowHeight + 50
            });
            
            el.appendTo(document.body);
            
            testScroll(el, 0, elTop);
        });
                                     
        it('should scroll a parent element if the parent is scrollable', function () {
            var el,
                elHeight = 200,
                parentEl,
                parentElHeight = 300,
                scrollSpy,
                spacerEl,
                spacerElHeight = 250;
            
            el = $('<div></div>').height(elHeight);
            spacerEl = $('<div></div>').height(spacerElHeight);
            parentEl = $('<div style="overflow: auto"></div>').height(parentElHeight);
            
            parentEl
                .append(spacerEl)
                .append(el);
            
            parentEl.appendTo(document.body);
            
            scrollSpy = createScrollSpy();
            
            bbScrollIntoView(el);
            
            validateScrollSpy(el, scrollSpy, (spacerElHeight + elHeight) - parentElHeight, null, parentEl);
            
            parentEl.remove();
        });
                                     
        it('should highlight the element after scrolling if the highlight option is specified', function () {
            var el,
                elTop,
                windowHeight;
            
            el = $('<div style="position: absolute;"></div>');
            
            windowHeight = $($window).height();
            elTop = windowHeight - 20;
            
            el.css({
                top: elTop,
                height: windowHeight + 50
            });
            
            el.appendTo(document.body);
            
            testScroll(
                el,
                0,
                elTop - 50, // An extra 50 pixels is reserved for the highlight animation.
                {
                    highlight: true
                }
            );
        });
        
        it('should highlight the element if the option is specified even if no scrolling is required', function () {
            var highlightSpy,
                el,
                scrollSpy;
            
            el = $('<div style="position: absolute; top: 50px;"></div>')
                .appendTo(document.body);
            
            highlightSpy = createHighlightSpy();
            scrollSpy = createScrollSpy();
            
            bbScrollIntoView(
                el,
                {
                    highlight: true
                }
            );
            
            expect(scrollSpy).not.toHaveBeenCalled();
            validateHighlightSpy(highlightSpy);
            
            el.remove();
        });
    });
    
    describe('directive', function () {
        var $compile,
            $rootScope;
        
        beforeEach(inject(function (_$compile_, _$rootScope_, _bbScrollIntoView_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            bbScrollIntoView = _bbScrollIntoView_;
        }));

        it('should srcoll when the trigger value changes', function () {
            var $scope = $rootScope.$new(),
                animateSpy,
                el;
            
            el = $compile('<div style="position: absolute;" bb-scroll-into-view="scrollNow"></div>')($scope);
            
            positionElOffBottom(el);
            
            el.appendTo(document.body);
            
            $scope.$digest();
            
            animateSpy = createScrollSpy();

            $scope.scrollNow = true;
            $scope.$digest();
            
            validateScrollSpy(el, animateSpy, 20);
            
            el.remove();
        });

        it('should scroll when the trigger value changes but element isn\'t immediately visible', function () {
            var $scope = $rootScope.$new(),
                animateSpy,
                el;
            
            el = $compile('<div style="position: absolute; display: none;" bb-scroll-into-view="scrollNow"></div>')($scope);
            
            positionElOffBottom(el);
            
            el.appendTo(document.body);
            
            $scope.$digest();
            
            $scope.scrollNow = true;
            $scope.$digest();
            
            animateSpy = createScrollSpy();
            
            expect(animateSpy).not.toHaveBeenCalled();
            
            el.show();

            $timeout.flush();

            validateScrollSpy(el, animateSpy, 20);

            el.remove();
        });
        
        it('should scroll correctly using html or body scrolltop if parent is body', function () {
            var $scope = $rootScope.$new(),
                windowHeight,
                animateSpy,
                spaceEl,
                el;
            
            windowHeight = $($window).height();
            
           
            
            el = $compile('<div bb-scroll-into-view="scrollNow"></div>')($scope);
            el.css({top: 20, height: 20, width: 20, position: 'absolute'});
            
            el.appendTo(document.body);
            
            spaceEl = angular.element('<div></div>');
            spaceEl.css({top: 40, height: (windowHeight + 40), width: 20, position: 'absolute'});
            
            spaceEl.appendTo(document.body);
            
            $scope.$digest();
            
            angular.element('html, body').animate(
                {
                    scrollTop: (windowHeight + 40)
                },
                {
                    duration: 0
                }
            );
            
            
            animateSpy = createScrollSpy();
            
            $scope.scrollNow = true;
            $scope.$digest();
            
            expect(animateSpy).toHaveBeenCalled();
            expect(animateSpy.calls.first().args[0]).toEqual({
                scrollTop: 20
            });
          
            el.remove();
            spaceEl.remove();
        });

        it('should give up trying to scroll if element is never shown', function () {
            var $scope = $rootScope.$new(),
                animateSpy,
                el;
            
            el = $compile('<div style="position: absolute; display: none;" bb-scroll-into-view="scrollNow"></div>')($scope);
            
            positionElOffBottom(el);
            
            el.appendTo(document.body);
            
            $scope.$digest();
            
            $scope.scrollNow = true;
            $scope.$digest();
            
            animateSpy = createScrollSpy();
            
            expect(animateSpy).not.toHaveBeenCalled();
            
            $timeout.flush();

            expect(animateSpy).not.toHaveBeenCalled();

            el.remove();
        });

        it('should highlight the element if the option is specified', function () {
            var $scope = $rootScope.$new(),
                el,
                highlightSpy;
            
            el = $compile('<div style="position: absolute;" bb-scroll-into-view="scrollNow" bb-scroll-into-view-highlight="\'true\'"></div>')($scope);
            
            positionElOffBottom(el);
            
            el.appendTo(document.body);
            
            $scope.$digest();
            
            highlightSpy = createHighlightSpy();

            $scope.scrollNow = true;
            $scope.$digest();
            
            validateHighlightSpy(highlightSpy);
            
            el.remove();
        });
    });
    
    describe('config', function () {
        var bbScrollIntoViewConfig,
            initialReservedBottom,
            initialReservedTop;
        
        beforeEach(inject(function (_bbScrollIntoViewConfig_) {
            bbScrollIntoViewConfig = _bbScrollIntoViewConfig_;
            
            initialReservedBottom = bbScrollIntoViewConfig.reservedBottom;
            initialReservedTop = bbScrollIntoViewConfig.reservedTop;
        }));
        
        describe('reservedTop', function () {
            it('should be respected', function () {
                bbScrollIntoViewConfig.reservedTop = 5;

                testScrollOffTop(10, 5);

                bbScrollIntoViewConfig.reservedTop = initialReservedTop;
            });
            
            it('can be overridden by the options parameter', function () {
                bbScrollIntoViewConfig.reservedTop = 5;

                testScrollOffTop(10, 7, {
                    reservedTop: 3
                });

                bbScrollIntoViewConfig.reservedTop = initialReservedTop;
            });
        });
        
        describe('reservedBottom', function () {
            it('should be respected', function () {
                bbScrollIntoViewConfig.reservedBottom = 5;
                
                testScrollOffBottom(0, 25);
                
                bbScrollIntoViewConfig.reservedBottom = initialReservedBottom;
            });
            
            it('can be overridden by the options parameter', function () {
                $('<div style="position: absolute;"></div>');

                bbScrollIntoViewConfig.reservedBottom = 5;

                testScrollOffBottom(0, 23, {
                    reservedBottom: 3
                });

                bbScrollIntoViewConfig.reservedBottom = initialReservedBottom;
            });
        });
    });
});