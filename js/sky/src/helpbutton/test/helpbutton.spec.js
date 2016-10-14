/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

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
        var el = angular.element('<button type="button" bb-help-button bb-help-key="bb-security-users.html">Help</button>');

        $compile(el)($scope);

        expect(el).toHaveClass('bb-helpbutton');
        expect(el).toHaveClass('fa');
        expect(el).toHaveClass('fa-question-circle');
        expect(el).toHaveClass('close');
    });

    it('handles true override keys', function () {
        var el = angular.element('<button type="button" bb-help-button bb-help-key="bb-security-users.html" bb-set-help-key-override="true">Help</button>'),
            removeEvent;

        $compile(el)($scope);

        expect($state.current.helpKeyOverride).toBe('bb-security-users.html');

        removeEvent = angular.element.Event('remove');

        el.trigger(removeEvent);

        expect($state.current.helpKeyOverride).toBe('oldOverride');


    });

    it('opens the help widget on click', function () {
        var el = angular.element('<button type="button" bb-help-button bb-help-key="bb-security-users.html">Help</button>');

        $compile(el)($scope);

        expect(openCalled).toBe(false);

        el.click();

        $scope.$apply();

        expect(openCalled).toBe(true);
    });
});
