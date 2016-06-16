/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Viewkeeper', function () {
    'use strict';
    
    var $compile,
        $document,
        $rootScope,
        $window;
    
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
        it('should destroy viewkeeper when the element is destroyed', function () {
            var $scope = $rootScope.$new(),
                el,
                scrollListenerCount;
            
            el = $compile(
                '<bb-omnibar></bb-omnibar>' +
                '<div id="viewkeeper-test-{{$id}}">' +
                    '<div bb-view-keeper bb-boundary-el-id="\'viewkeeper-test-\' + $id">a</div>' +
                '</div>' 
            )($scope);
            
            el.appendTo(document.body);
            $scope.$digest();
            
            scrollListenerCount = getScrollListenerCount();
            
            el.remove();
            
            // This isn't the ideal way to determine whether a viewkeeper gets created, but since it's not public
            // there's no way to get at the destroy() method to verify it was called.  As long as viewkeeper listens
            // for the window scroll event then this should tell us whether the listener that was there has no been
            // removed.
            expect(getScrollListenerCount()).toBe(scrollListenerCount - 1);
        });
    });
    
    describe('service', function () {
        var bbViewKeeperBuilder,
            bbViewKeeperConfig,
            initialViewportMarginTop;
        
        function validateFixed(el, fixed, bottom) {
            var expectedCls = 'bb-viewkeeper-fixed';
            
            if (fixed) {
                expect(el).toHaveClass(expectedCls);
            } else {
                expect(el).not.toHaveClass(expectedCls);
            }
            
            if (bottom) {
                expect(el).toHaveCss({
                    bottom: '0px'
                });
            }
        }
        
        function createViewKeeper(options) {
            var boundaryEl,
                el,
                windowHeight = $(window).height();
            
            boundaryEl = $(
                '<bb-omnibar></bb-omnibar>' +
                '<div style="position: absolute; width: 500px; background-color: red">' + 
                   '<div style="height: 100px; background-color: blue">a</div>' + 
                '</div>'
            )
                .css('top', bbViewKeeperConfig.viewportMarginTop)
                .height(windowHeight + 1000)
                .appendTo(document.body);
            
            el = boundaryEl.children('div');
            
            options = options || {};
            
            angular.extend(options, {
                el: el[0],
                boundaryEl: boundaryEl[0]
            });
            
            return bbViewKeeperBuilder.create(options);
        }
        
        function validateScrolledToTop(vk) {
            var expectedTop = Math.max(parseFloat($(vk.boundaryEl).css('top')) - bbViewKeeperConfig.viewportMarginTop, 0);
            
            expect($(document).scrollTop()).toBe(expectedTop);
        }
        
        function destroyAndRemove(vk) {
            vk.destroy();
            $(vk.boundaryEl).remove();
        }
        
        beforeEach(inject(function (_bbViewKeeperBuilder_, _bbViewKeeperConfig_) {
            bbViewKeeperBuilder = _bbViewKeeperBuilder_;
            bbViewKeeperConfig = _bbViewKeeperConfig_;
            
            initialViewportMarginTop = bbViewKeeperConfig.viewportMarginTop;
        }));
        
        beforeEach(function () {
            $(document).scrollTop(0);
        });
        
        afterEach(function () {
            $(document).scrollTop(0);
        });
        
        it('should fix the element when the page scrolls beyond the top of the element', function () {
            var vk = createViewKeeper();
            
            validateFixed(vk.el, false);
            
            $(document)
                .scrollTop(initialViewportMarginTop + 1)
                .scroll();
            
            validateFixed(vk.el, true);
            
            // Make sure the element remains fixed.
            $(document)
                .scrollTop(initialViewportMarginTop + 10)
                .scroll();
            
            validateFixed(vk.el, true);
            
            $(document)
                .scrollTop(0)
                .scroll();
            
            validateFixed(vk.el, false);
            
            destroyAndRemove(vk);
        });

        it('should allow the element to be fixed and unfixed programmatically', function () {
            var vk = createViewKeeper();

            $(document).scrollTop(initialViewportMarginTop + 1);

            validateFixed(vk.el, false);
            
            vk.syncElPosition();

            validateFixed(vk.el, true);
            
            vk.destroy();
            
            validateFixed(vk.el, false);

            destroyAndRemove(vk);
        });
        
        it('should fix the element to the bottom when that option is specified', function () {
            var vk = createViewKeeper({
                fixToBottom: true
            });
            
            $('<div>b</div>')
                .height($(window).height() + 300)
                .prependTo(vk.boundaryEl);
            
            vk.syncElPosition();
            
            validateFixed(vk.el, true, true);
            
            destroyAndRemove(vk);
        });
        
        it('should not error when destroyed more than once', function () {
            var vk = createViewKeeper();
            
            vk.destroy();
            vk.destroy();
            
            destroyAndRemove(vk);
        });

        it('should call the onStateChanged() callback when specified', function () {
            var onStateChangedSpy,
                vk;

            $(document).scrollTop(0);
            
            vk = createViewKeeper({
                onStateChanged: angular.noop
            });
            
            // Make sure the element is in the viewport.
            $(vk.boundaryEl).css('top', bbViewKeeperConfig.viewportMarginTop + 1);
            
            onStateChangedSpy = spyOn(vk, 'onStateChanged');

            vk.syncElPosition();
            
            expect(onStateChangedSpy).not.toHaveBeenCalled();
            
            $(document).scrollTop(400);

            vk.syncElPosition();

            expect(onStateChangedSpy).toHaveBeenCalled();
            
            destroyAndRemove(vk);
        });

        it('should set the viewkeeper element`\s width when configured to do so', function () {
            var elWidth,
                vk;

            vk = createViewKeeper({
                setWidth: true
            });

            $(document).scrollTop(400);
            
            elWidth = $(vk.el).width();
            
            vk.syncElPosition();

            expect(vk.el).toHaveCss({
                width: elWidth + 'px'
            });
            
            destroyAndRemove(vk);
        });

        it('should set the viewkeeper element`\s placeholder element based on the configuration options', function () {
            var vk;

            // The default for the setPlaceholderHeight option is true.
            vk = createViewKeeper({});

            $(document).scrollTop(400);
            
            vk.syncElPosition();
            
            expect($('#' + vk.id + '-spacer')).toHaveCss({
                height: $(vk.el).height() + 'px'
            });
            
            destroyAndRemove(vk);
            
            // The default for the setPlaceholderHeight option is true.
            vk = createViewKeeper({
                setPlaceholderHeight: false
            });

            $(document).scrollTop(400);
            
            vk.syncElPosition();
            
            expect($('#' + vk.id + '-spacer')).toHaveCss({
                height: '0px'
            });
            
            destroyAndRemove(vk);
        });

        it('should scroll to the top of the viewkeeper element when the viewkeeper element is fixed', function () {
            var vk = createViewKeeper();

            $(vk.boundaryEl).css('top', initialViewportMarginTop);

            // Ensure the viewkeeper element is fixed to the top of the viewport.
            $(document).scrollTop(400);
            
            vk.syncElPosition();
            vk.scrollToTop();
            
            validateScrolledToTop(vk);
            
            destroyAndRemove(vk);
        });

        it('should scroll to the top of the viewkeeper element when the viewkeeper element is not fixed', function () {
            var vk = createViewKeeper();

            $(vk.boundaryEl).css('top', initialViewportMarginTop + 100);
            
            // The viewport element should remain unfixed from the top of the viewport.
            $(document).scrollTop(initialViewportMarginTop);
            
            vk.syncElPosition();
            vk.scrollToTop();
            
            validateScrolledToTop(vk);
            
            destroyAndRemove(vk);
        });

        it('should not attempt to sync element position if the element is not visible', function () {
            var el,
                triggered,
                vk = createViewKeeper();
            
            el = $(vk.el);
            
            el.on('afterViewKeeperSync', function () {
                triggered = true;
            });
            
            // Make sure the event is triggered when visible.
            vk.syncElPosition();
            expect(triggered).toBe(true);
            
            triggered = false;
            
            $(vk.boundaryEl).hide();
            
            // Make sure the event is not triggered when hidden.
            vk.syncElPosition();
            expect(triggered).toBe(false);
            
            destroyAndRemove(vk);
        });
    });
});

describe('Viewkeeper on iOS', function () {
    'use strict';
    
    var $window,
        bbViewKeeperBuilder;
    
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
    
    beforeEach(inject(function (_bbViewKeeperBuilder_) {
        bbViewKeeperBuilder = _bbViewKeeperBuilder_;
    }));
    
    afterEach(function () {
        $(document.body)
            .removeClass('omnibar-not-fixed bb-viewkeeper-ignore-fixed viewkeeper-ignore-fixed');
    });
    
    it('should compensate for the omnibar not docking to the top of the page', function () {
        expect(document.body).toHaveClass('omnibar-not-fixed');
    });
    
    it('should compensate for an issue with fixed elements when the keyboard flies out', function () {
        var inputEl = $('<input type="text" />').appendTo(document.body);
        
        inputEl.focus();
        inputEl.trigger('focus');
        expect(document.body).toHaveClass('bb-viewkeeper-ignore-fixed');
        
        inputEl.blur();
        inputEl.trigger('blur');
        expect(document.body).not.toHaveClass('bb-viewkeeper-ignore-fixed');
        
        inputEl.remove();
    });
});