/*jshint jasmine: true */
/*global angular, inject, module */

describe('Page directive', function () {
    'use strict';
    var pageStatuses,
        $compile,
        $provide,
        $scope,
        fakeWindow;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.page', 'sky.resources', 'sky.data', 'sky.templates'));

    beforeEach(module(function (_$provide_) {
        $provide = _$provide_;

        fakeWindow = {
            location: {
                href: ''
            }
        };

        $provide.value('$window', fakeWindow);
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_, bbPage) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        pageStatuses = bbPage.pageStatuses;
    }));

    describe('bbPage', function () {
        var el,
            elScope;

        beforeEach(function () {
            el = angular.element('<bb-page bb-page-status="status"></bb-page>');
            $compile(el)($scope);
            $scope.$digest();

            elScope = el.isolateScope();
        });

        it('defines local bindings', function () {
            expect(elScope.locals).toBeDefined();
            expect(elScope.locals.pageStatuses).toEqual(pageStatuses);
        });

        it('begins waiting when loading status is specified', function () {
            spyOn(elScope, '$emit');

            elScope.bbPageStatus = pageStatuses.LOADING;
            elScope.$digest();

            expect(elScope.$emit).toHaveBeenCalledWith('bbBeginWait');
            expect(elScope.value).toBeDefined();
        });

        it('ends waiting when status changes', function () {
            elScope.bbPageStatus = pageStatuses.LOADING;
            elScope.$digest();

            spyOn(elScope, '$emit');

            elScope.bbPageStatus = pageStatuses.LOADED;
            elScope.$digest();

            expect(elScope.$emit).toHaveBeenCalledWith('bbEndWait');
        });

        it('does not set the load manager when it is not used', function () {
            elScope.bbPageStatus = pageStatuses.LOADING;
            elScope.bbPageUsesLoadManager = false;
            elScope.$digest();

            elScope.bbPageStatus = pageStatuses.NOT_AUTHORIZED;
            elScope.$digest();

            expect(elScope.loadManager).toBeUndefined();
        });

        it('cancels the load manager when not authorized', inject(function (bbData) {
            var fakeLoadManager;

            fakeLoadManager = {
                cancelWaiting: function () {
                    return null;
                }
            };

            spyOn(bbData, 'loadManager').and.returnValue(fakeLoadManager);

            elScope.bbPageUsesLoadManager = true;
            elScope.$digest();

            elScope.bbPageStatus = pageStatuses.LOADED;
            elScope.$digest();

            spyOn(fakeLoadManager, 'cancelWaiting');

            elScope.bbPageStatus = pageStatuses.NOT_AUTHORIZED;
            elScope.$digest();

            expect(fakeLoadManager.cancelWaiting).toHaveBeenCalled();
        }));

        it('cancels the load manager when not found', inject(function (bbData) {
            var fakeLoadManager;

            fakeLoadManager = {
                cancelWaiting: function () {
                    return null;
                }
            };

            spyOn(bbData, 'loadManager').and.returnValue(fakeLoadManager);

            elScope.bbPageUsesLoadManager = true;
            elScope.$digest();

            elScope.bbPageStatus = pageStatuses.LOADED;
            elScope.$digest();

            spyOn(fakeLoadManager, 'cancelWaiting');

            elScope.bbPageStatus = pageStatuses.NOT_FOUND;
            elScope.$digest();

            expect(fakeLoadManager.cancelWaiting).toHaveBeenCalled();
        }));

        it('redirects to the not found url when status is not found', inject(function ($location, bbPageConfig) {
            bbPageConfig.notFoundUrl = '/notfound';

            elScope.bbPageStatus = pageStatuses.NOT_FOUND;
            elScope.$digest();

            expect($location.path()).toEqual(bbPageConfig.notFoundUrl);
        }));

        it('goes to the redirect url when navigating away', inject(function (bbPageConfig) {
            bbPageConfig.redirectUrl = 'http://localhost/redirect';
            elScope.$digest();

            elScope.locals.navigateAway();

            expect(fakeWindow.location.href).toEqual(bbPageConfig.redirectUrl);
        }));

        it('goes to the window origin when navigating away without a redirect url', inject(function (bbPageConfig) {
            bbPageConfig.redirectUrl = null;
            fakeWindow.location.origin = 'http://localhost/origin';
            elScope.$digest();

            elScope.locals.navigateAway(fakeWindow);

            expect(fakeWindow.location.href).toEqual(fakeWindow.location.origin);
        }));
    });
});