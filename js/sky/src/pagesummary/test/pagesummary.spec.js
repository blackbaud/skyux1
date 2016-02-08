/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Page summary directive', function () {
    'use strict';

    var bbMediaBreakpoints,
        $compile,
        $rootScope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.pagesummary'));
    beforeEach(module('sky.templates'));

    beforeEach(module(function ($provide) {
        var fakeBreakpoint;

        bbMediaBreakpoints = {
            register: function (handler) {
                this.handlers = this.handlers || [];

                this.handlers.push(handler);

                handler(this.getCurrent());
            },
            unregister: angular.noop,
            getCurrent: function () {
                return fakeBreakpoint;
            },
            _fireBreakpoint: function (bp) {
                var handlers = this.handlers;

                fakeBreakpoint = {};
                fakeBreakpoint[bp] = true;

                if (handlers) {
                    handlers.forEach(function (handler) {
                        handler(this.getCurrent());
                    }.bind(this));
                }
            }
        };

        fakeBreakpoint = {
            lg: true
        };

        $provide.value('bbMediaBreakpoints', bbMediaBreakpoints);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should move the key info section under the status section at small screen sizes', function () {
        var el,
            smSelector = '.bb-page-summary-key-info-sm .bb-page-summary-key-info',
            xsSelector = '.bb-page-summary-key-info-xs .bb-page-summary-key-info',
            $scope = $rootScope.$new();

        function validateAtBreakpoint(breakpoint) {
            var shouldExist,
                shouldNotExist;

            if (breakpoint === 'xs') {
                shouldExist = xsSelector;
                shouldNotExist = smSelector;
            } else {
                shouldExist = smSelector;
                shouldNotExist = xsSelector;
            }

            bbMediaBreakpoints._fireBreakpoint('xs');

            $scope.$digest();

            expect(el.find(smSelector)).not.toExist();
            expect(el.find(xsSelector)).toExist();
        }

        el = $compile('<bb-page-summary><bb-page-summary-status></bb-page-summary-status><bb-page-summary-key-info></bb-page-summary-key-info></bb-page-summary>')($scope);

        $scope.$digest();

        validateAtBreakpoint('xs');
        validateAtBreakpoint('sm');
        validateAtBreakpoint('md');
        validateAtBreakpoint('lg');
    });

    it('should stop listening to breakpoint changes when destroyed', function () {
        var el,
            unregisterSpy,
            $scope = $rootScope.$new();

        el = $compile('<bb-page-summary><bb-page-summary-title></bb-page-summary-title></bb-page-summary>')($scope);

        $scope.$digest();

        unregisterSpy = spyOn(bbMediaBreakpoints, 'unregister');

        $scope.$destroy();

        expect(unregisterSpy).toHaveBeenCalled();
    });

    it('should hide the placeholder element of the corresponding child component when the child component is removed from the page', function () {
        var el,
            titleEl,
            $scope = $rootScope.$new();

        el = $compile('<bb-page-summary><bb-page-summary-title ng-if="showTitle">Test</bb-page-summary-title></bb-page-summary>')($scope);
        el.appendTo(document.body);

        $scope.showTitle = true;
        $scope.$digest();

        titleEl = el.find('.bb-page-summary-title');

        expect(titleEl).toBeVisible();

        $scope.showTitle = false;
        $scope.$digest();

        expect(titleEl).not.toBeVisible();

        el.remove();
    });
});
