/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Select field item animation', function () {
    'use strict';

    var fxOff,
        $animate,
        $compile,
        $rootElement,
        $rootScope,
        $timeout;

    beforeEach(module(
        'ngMock',
        'ngAnimate',
        'ngAnimateMock',
        'sky.selectfield.item.animation'
    ));

    beforeEach(inject(function (_$animate_, _$compile_, _$rootElement_, _$rootScope_, _$timeout_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $rootElement = _$rootElement_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;

        $animate.enabled(true);

        $rootElement.appendTo(document.body);

        fxOff = $.fx.off;
        $.fx.off = true;
    }));

    afterEach(function () {
        $rootElement.remove();
        $.fx.off = fxOff;
    });

    it('should animate in', function () {
        var animateSpy,
            el,
            slideDownSpy;

        el = $('<div class="bb-select-field-multiple-item">Test <button class="close"></button></div>').appendTo($rootElement);

        $rootScope.$digest();

        animateSpy = spyOn($.fn, 'animate').and.callThrough();
        slideDownSpy = spyOn($.fn, 'slideDown').and.callThrough();

        $animate.enter(el, $rootElement);

        $rootScope.$digest();

        expect(animateSpy.calls.mostRecent().object[0]).toBe(el[0]);

        expect(animateSpy).toHaveBeenCalledWith(
            jasmine.objectContaining(
                {
                    opacity: 1
                }
            ),
            jasmine.anything()
        );

        expect(slideDownSpy.calls.mostRecent().object[0]).toBe(el[0]);
    });

    it('should animate out', function () {
        var el,
            fadeOutSpy,
            slideUpSpy;

        el = $('<div class="bb-select-field-multiple-item">Test <button class="close"></button></div>').appendTo($rootElement);

        $rootScope.$digest();

        fadeOutSpy = spyOn($.fn, 'fadeOut').and.callThrough();
        slideUpSpy = spyOn($.fn, 'slideUp').and.callThrough();

        $animate.leave(el, $rootElement);

        $rootScope.$digest();

        expect(fadeOutSpy.calls.mostRecent().object[0]).toBe(el[0]);
        expect(slideUpSpy.calls.mostRecent().object[0]).toBe(el[0]);
    });

    it('should remove focus on close button when animating out', function () {
        var el = $('<div class="bb-select-field-multiple-item">Test <input class="close"></input></div>').appendTo($rootElement);
        $rootScope.$digest();

        el.find('.close').focus();

        expect(el.find('.close')).toBeFocused();

        $animate.leave(el, $rootElement);

        $rootScope.$digest();

        expect(el.find('.close')).not.toBeFocused();
    });
});
