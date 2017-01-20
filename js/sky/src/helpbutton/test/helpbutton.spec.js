/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Helpbutton directive', function () {
    'use strict';

    var $compile,
        $scope,
        $state,
        $window,
        openCalled;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.helpbutton'));
    beforeEach(function () {
        openCalled = false;

        $state = {
            current: {
                helpKeyOverride: 'oldOverride'
            }
        };

        $window = {
            BBHELP: {
                HelpWidget: {
                    open: function () {
                        openCalled = true;
                    }
                }
            }
        };

        module(function ($provide) {
            $provide.value('$state', $state);
            $provide.value('$window', $window);
        });
    });

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    it('adds the correct classes', function () {
        var el = angular.element('<div bb-help-button bb-help-key="bb-security-users.html"></div>');

        $compile(el)($scope);

        expect(el).toHaveClass('bb-helpbutton');
        expect(el).toHaveClass('fa');
        expect(el).toHaveClass('fa-question-circle');
        expect(el).toHaveClass('close');
    });

    it('handles true override keys', function () {
        var el = angular.element('<div bb-help-button bb-help-key="bb-security-users.html" bb-set-help-key-override="true"></div>'),
            removeEvent;

        $compile(el)($scope);

        expect($state.current.helpKeyOverride).toBe('bb-security-users.html');

        removeEvent = angular.element.Event('remove');

        el.trigger(removeEvent);

        expect($state.current.helpKeyOverride).toBe('oldOverride');


    });

    it('opens the help widget on click', function () {
        var el = angular.element('<div bb-help-button bb-help-key="bb-security-users.html"></div>');

        $compile(el)($scope);

        expect(openCalled).toBe(false);

        el.click();

        $scope.$apply();

        expect(openCalled).toBe(true);
    });

    it('opens the help widget on enter press', function () {
        var el = angular.element('<div bb-help-button bb-help-key="bb-security-users.html"></div>'),
            e;

        $compile(el)($scope);

        expect(openCalled).toBe(false);

        e = $.Event('keyup');
        e.which = 15;
        e.keyCode = 15;

        el.trigger(e);

        $scope.$apply();

        expect(openCalled).toBe(false);

        e = $.Event('keyup');
        e.which = 13;
        e.keyCode = 13;
        el.trigger(e);

        $scope.$apply();

        expect(openCalled).toBe(true);
    });

    it('does not set role or aria label when it should not', function () {
        var el = angular.element('<button aria-label="Words" bb-help-button bb-help-key="bb-security-users.html"></button>');

        $compile(el)($scope);

        $scope.$digest();

        expect(el.attr('role')).not.toBe('button');
        expect(el.attr('aria-label')).toBe('Words');
    });
});
