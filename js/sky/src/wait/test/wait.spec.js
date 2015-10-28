/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Wait', function () {
    'use strict';
    
    var $compile,
        $rootScope,
        $timeout,
        bbWait;
    
    function validateBlockEl(spy, el) {
        expect(spy.calls.mostRecent().object[0]).toBe(el[0]);
    }
    
    beforeEach(module(
        'ngMock',
        'sky.wait'
    ));
    
    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbWait_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbWait = _bbWait_;
    }));
    
    describe('service', function () {
        it('should block only the specified element on element wait', function () {
            var blockSpy,
                el = $('<div></div>'),
                unblockSpy;
            
            blockSpy = spyOn($.fn, 'block').and.callThrough();
            
            bbWait.beginElWait(el);
            $timeout.flush();
            
            validateBlockEl(blockSpy, el);
            
            unblockSpy = spyOn($.fn, 'unblock').and.callThrough();
            
            bbWait.endElWait(el);
            $timeout.flush();
            
            validateBlockEl(unblockSpy, el);
        });
        
        it('should unblock element only after the same number of unblock calls have been made as block calls', function () {
            var blockSpy,
                el = $('<div></div>'),
                unblockSpy;
            
            blockSpy = spyOn($.fn, 'block').and.callThrough();
            
            bbWait.beginElWait(el);
            bbWait.beginElWait(el);
            bbWait.beginElWait(el);
            $timeout.flush();
            
            validateBlockEl(blockSpy, el);
            
            unblockSpy = spyOn($.fn, 'unblock').and.callThrough();
            
            bbWait.endElWait(el);
            expect($timeout.flush).toThrow();
            
            expect(unblockSpy).not.toHaveBeenCalled();
            
            bbWait.endElWait(el);
            bbWait.endElWait(el);
            $timeout.flush();
            
            validateBlockEl(unblockSpy, el);
        });
        
        it('should clear element block regardless of the number of times block has been called', function () {
            var blockSpy,
                el = $('<div></div>'),
                unblockSpy;
            
            blockSpy = spyOn($.fn, 'block').and.callThrough();
            
            bbWait.beginElWait(el);
            bbWait.beginElWait(el);
            bbWait.beginElWait(el);
            $timeout.flush();
            
            validateBlockEl(blockSpy, el);
            
            unblockSpy = spyOn($.fn, 'unblock').and.callThrough();
            
            bbWait.clearElWait(el);
            $timeout.flush();
            
            validateBlockEl(unblockSpy, el);
        });
        
        it('should block entire page on page wait', function () {
            var blockSpy,
                unblockSpy;
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            
            bbWait.beginPageWait();
            $timeout.flush();
            
            expect(blockSpy).toHaveBeenCalled();
            expect($(document.body).data('bb-wait-showingwait')).toBe(true);
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            
            bbWait.endPageWait();
            $timeout.flush();
            
            expect(unblockSpy).toHaveBeenCalled();
        });
        
        it('should block immediately when delay of 0 is sepcified', function () {
            var blockOptions,
                blockSpy,
                unblockSpy;
            
            blockOptions = {visualBlockDelay: 0};
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            
            bbWait.beginPageWait(blockOptions);
            expect($timeout.flush).toThrow();
            
            expect(blockSpy).toHaveBeenCalled();
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            
            bbWait.endPageWait();
            $timeout.flush();
            
            expect(unblockSpy).toHaveBeenCalled();
        });
        
        it('should do nothing when there is no wait', function () {
            var unblockSpy;
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            
            bbWait.endPageWait();
            expect($timeout.flush).toThrow();
            
            expect(unblockSpy).not.toHaveBeenCalled();
        });
        
        it('should block user interaction immediately followed by a delayed visual block', function () {
            var blockInteractionOptions,
                blockSpy,
                blockSpyCalls,
                blockVisualOptions;
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            
            bbWait.beginPageWait();
            $timeout.flush();
            
            blockSpyCalls = blockSpy.calls;
            
            expect(blockSpyCalls.count()).toBe(2);
            
            blockInteractionOptions = blockSpyCalls.argsFor(0)[0];
            blockVisualOptions = blockSpyCalls.argsFor(1)[0];
            
            expect(blockInteractionOptions.message).toBe('');
            expect(blockInteractionOptions.overlayCSS.opacity).toBe(0);
            
            expect(blockVisualOptions.message).toBe('<div class="bb-wait-wrap"><div class="bb-wait-spinner"></div></div>');
            
            bbWait.endPageWait();
            $timeout.flush();
        });
        
        it('should unblock page only after the same number of unblock calls have been made as block calls', function () {
            var blockSpy,
                unblockSpy;
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            
            bbWait.beginPageWait();
            $timeout.flush();
            
            bbWait.beginPageWait();
            bbWait.beginPageWait();
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            
            bbWait.endPageWait();
            expect($timeout.flush).toThrow();
            
            expect(unblockSpy).not.toHaveBeenCalled();
            
            bbWait.endPageWait();
            bbWait.endPageWait();
            $timeout.flush();
            
            expect(unblockSpy).toHaveBeenCalled();
        });
        
        it('should clear page block regardless of the number of times block has been called', function () {
            var blockSpy,
                unblockSpy;
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            
            bbWait.beginPageWait();
            bbWait.beginPageWait();
            bbWait.beginPageWait();
            $timeout.flush();
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            
            bbWait.clearPageWait();
            $timeout.flush();
            
            expect(unblockSpy).toHaveBeenCalled();
        });
        
        it('should show wait but not block the page when nonblocking is specified', function () {
            var blockOptions,
                blockSpy,
                elBlockSpy,
                elUnblockSpy,
                nonblockEl,
                unblockSpy;
            
            blockOptions = {nonblocking: true};
            
            blockSpy = spyOn($, 'blockUI').and.callThrough();
            elBlockSpy = spyOn($.fn, 'block').and.callThrough();
            
            bbWait.beginPageWait(blockOptions);
            $timeout.flush();
            
            nonblockEl = $('.bb-wait-nonblock');
            
            expect(blockSpy).not.toHaveBeenCalled();
            validateBlockEl(elBlockSpy, nonblockEl);
            
            unblockSpy = spyOn($, 'unblockUI').and.callThrough();
            elUnblockSpy = spyOn($.fn, 'unblock').and.callThrough();
            
            bbWait.endPageWait(blockOptions);
            $timeout.flush();
            
            expect(unblockSpy).not.toHaveBeenCalled();
            validateBlockEl(elUnblockSpy, nonblockEl);
        });
        
        it('should hide non-blocking wait when it is clicked', function () {
            var blockOptions,
                nonblockEl;
            
            blockOptions = {nonblocking: true};
            
            bbWait.beginPageWait(blockOptions);
            $timeout.flush();
            
            nonblockEl = $('.bb-wait-nonblock');
            
            expect(nonblockEl).toBeVisible();
            
            nonblockEl.click();
            
            expect(nonblockEl).not.toBeVisible();
        });
    });
    
    describe('directive', function () {
        it('should begin wait when the scope\'s initial value is truthy', function () {
            var beginSpy,
                endSpy,
                $scope = $rootScope.$new();
            
            $scope.waiting = true;
            
            beginSpy = spyOn(bbWait, 'beginElWait').and.callThrough();
            
            $compile('<div bb-wait="waiting"></div>')($scope);
            
            $scope.$digest();
            
            expect(beginSpy).toHaveBeenCalled();
            
            endSpy = spyOn(bbWait, 'endElWait').and.callThrough();
            
            $scope.waiting = false;
            $scope.$digest();
            
            expect(endSpy).toHaveBeenCalled();
        });
        
        it('should begin wait when the scope\'s value changes to a truthy value', function () {
            var beginSpy,
                endSpy,
                $scope = $rootScope.$new();
            
            beginSpy = spyOn(bbWait, 'beginElWait').and.callThrough();
            
            $compile('<div bb-wait="waiting"></div>')($scope);
            
            $scope.$digest();
            
            expect(beginSpy).not.toHaveBeenCalled();
            
            $scope.waiting = true;
            $scope.$digest();
            
            expect(beginSpy).toHaveBeenCalled();
            
            endSpy = spyOn(bbWait, 'endElWait').and.callThrough();
            
            $scope.waiting = false;
            $scope.$digest();
            
            expect(endSpy).toHaveBeenCalled();
        });
    });
});

describe('Wait with no blockUI defined', function () {
    'use strict';
    
    var $timeout,
        bbWait,
        blockUI;
    
    beforeEach(module(
        'ngMock',
        'sky.wait'
    ));
    
    beforeEach(module(function () {
        blockUI = $.blockUI;
        $.blockUI = null;
    }));
    
    beforeEach(inject(function (_$timeout_, _bbWait_) {
        $timeout = _$timeout_;
        bbWait = _bbWait_;
    }));
    
    afterEach(function () {
        $.blockUI = blockUI;
    });

    it('should not error when blockUI is undefined', function () {
        var el = $('<div></div>');

        bbWait.beginElWait(el);
        expect($timeout.flush).toThrow();
        
        bbWait.endElWait(el);
        $timeout.flush();
        
        bbWait.beginPageWait();
        expect($timeout.flush).toThrow();
        
        bbWait.endPageWait();
        $timeout.flush();
    });
});