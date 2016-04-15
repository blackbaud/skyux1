/*jshint browser: true, jasmine: true */
/*global $, inject, module */

describe('Chevron directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        $timeout,
        bbResources,
        chevronHtml,
        fxOff;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.chevron'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;

        fxOff = $.fx.off;
        $.fx.off = true;

        chevronHtml = '<bb-chevron bb-chevron-direction="chevronDirection"></bb-chevron>';
    }));

    afterEach(function () {
        $.fx.off = fxOff;
    });

    function getChevronEl(el) {
        return el.find('.bb-chevron');
    }

    it('should have a default direction of "up" if no direction is specified', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile(chevronHtml)($scope);

        $scope.$digest();

        expect(getChevronEl(el)).toHaveClass('bb-chevron-flip-up');
    });

    it('should make item chevrons accessible with localizable text', function () {
        var $scope = $rootScope.$new(),
            chevronEl,
            el;

        el = $compile(chevronHtml)($scope);

        $scope.chevronDirection = 'down';
        $scope.$digest();

        chevronEl = getChevronEl(el);

        expect(chevronEl).toHaveAttr('aria-label', bbResources.chevron_expand);

        $scope.chevronDirection = 'up';
        $scope.$digest();

        expect(chevronEl).toHaveAttr('aria-label', bbResources.chevron_collapse);
    });

    it('should toggle the direction when clicked', function () {
        var $scope = $rootScope.$new(),
            chevronEl,
            el;

        el = $compile(chevronHtml)($scope);

        el.appendTo(document.body);

        $scope.$digest();

        chevronEl = getChevronEl(el);

        chevronEl.click();

        expect($scope.chevronDirection).toBe('down');

        chevronEl.click();

        expect($scope.chevronDirection).toBe('up');

        el.remove();
    });
});
