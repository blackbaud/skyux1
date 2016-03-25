/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Tab Sref directive', function () {
    'use strict';

    var uibTabHtml,
        $compile,
        $provide,
        $rootScope,
        $state,
        $timeout;

    beforeEach(module(
        'ngMock',
        'ui.router',
        'sky.tabsref',
        'uib/template/tabs/tabset.html',
        'uib/template/tabs/tab.html'
    ));

    beforeEach(module(function (_$provide_) {
        $provide = _$provide_;

        $state = {
            go: angular.noop,
            is: angular.noop
        };

        $provide.value('$state', $state);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    describe('active on tabset', function () {
        beforeEach(function () {
            /*jslint white: true */
            uibTabHtml =
                '<uib-tabset active="locals.active">' +
                    '<uib-tab heading="1" bb-tab-sref="tabstate.a"></uib-tab>' +
                    '<uib-tab heading="2" bb-tab-sref="tabstate.b" select="tabSelectB()"></uib-tab>' +
                '</uib-tabset>';
            /*jslint white: false */
        });


        it('should select the corresponding tab on state change', function () {
            var el,
                tabSelectCalled,
                $scope = $rootScope.$new();

            $state.is = function (sref) {
                return sref === 'tabstate.b';
            };

            $scope.tabSelectB = function () {
                tabSelectCalled = true;
            };

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */
            $scope.$digest();
            $timeout.flush();

            $rootScope.$broadcast('$stateChangeSuccess');

            $scope.$digest();


            expect(tabSelectCalled).toBe(true);
        });

        it('should change state when a tab is selected', function () {
            var el,
                stateGoCalled,
                $scope = $rootScope.$new();

            $state.go = function (sref) {
                expect(sref).toBe('tabstate.b');
                stateGoCalled = true;
            };

            $state.is = function (sref) {
                return sref === "tabstate.a";
            };

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */

            $timeout.flush();

            $scope.locals.active = 1;
            $scope.$digest();

            $timeout.flush();

            expect(stateGoCalled).toBe(true);
        });

        it('should remove state change handler on destroy', function () {
            var el,
                initialListenerCount,
                $scope = $rootScope.$new();

            function listenerCount() {
                return $rootScope.$$listenerCount.$stateChangeSuccess || 0;
            }

            initialListenerCount = listenerCount();

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */

            $scope.$digest();
            $timeout.flush();

            // There should be one listener per tab.
            expect(listenerCount()).toBe(initialListenerCount + 2);
            $scope.$destroy();

            expect(listenerCount()).toBe(initialListenerCount);
        });
    });

    describe('active on tab', function () {
        beforeEach(function () {
            /*jslint white: true */
            uibTabHtml =
                '<uib-tabset active="locals.active">' +
                    '<uib-tab heading="1" bb-tab-sref="tabstate.a" active="locals.activeTabA"></uib-tab>' +
                    '<uib-tab heading="2" bb-tab-sref="tabstate.b" select="tabSelectB()" active="locals.activeTabB"></uib-tab>' +
                '</uib-tabset>';
            /*jslint white: false */
        });


        it('should select the corresponding tab on state change', function () {
            var el,
                tabSelectCalled,
                $scope = $rootScope.$new();

            $state.is = function (sref) {
                return sref === 'tabstate.b';
            };

            $scope.tabSelectB = function () {
                tabSelectCalled = true;
            };

            $scope.locals = {
                activeTabA: true,
                activeTabB: false
            };

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */
            $scope.$digest();
            $timeout.flush();

            $rootScope.$broadcast('$stateChangeSuccess');

            $scope.$digest();


            expect(tabSelectCalled).toBe(true);
        });

        it('should change state when a tab is selected', function () {
            var el,
                stateGoCalled,
                $scope = $rootScope.$new();

            $state.go = function (sref) {
                expect(sref).toBe('tabstate.b');
                stateGoCalled = true;
            };

            $state.is = function (sref) {
                return sref === "tabstate.a";
            };

            $scope.locals = {
                activeTabA: true,
                activeTabB: false
            };

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */

            $timeout.flush();

            $scope.locals.active = 1;
            $scope.$digest();

            $timeout.flush();

            expect(stateGoCalled).toBe(true);
        });

        it('should remove state change handler on destroy', function () {
            var el,
                initialListenerCount,
                $scope = $rootScope.$new();

            function listenerCount() {
                return $rootScope.$$listenerCount.$stateChangeSuccess || 0;
            }

            initialListenerCount = listenerCount();

            $scope.locals = {
                activeTabA: true,
                activeTabB: false
            };

            /*jslint white: true */
            el = $compile(uibTabHtml)($scope);
            /*jslint white: false */

            $scope.$digest();
            $timeout.flush();

            // There should be one listener per tab.
            expect(listenerCount()).toBe(initialListenerCount + 2);
            $scope.$destroy();

            expect(listenerCount()).toBe(initialListenerCount);
        });
    });


});
