/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Alert directive', function () {
    'use strict';

    var bbResources,
        $compile,
        $rootScope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.alert'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbResources = _bbResources_;
    }));

    it('should hide the close button if it is not cloesable', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-alert bb-alert-closeable="{{closeable}}"></bb-alert>')($scope);
        el.appendTo(document.body);

        $scope.closeable = false;
        $scope.$digest();

        expect(el.find('button.close')).toBeHidden();

        $scope.closeable = true;
        $scope.$digest();

        expect(el.find('button.close')).toBeVisible();
        expect(el.find('.alert')).toHaveClass('alert-dismissible');

        el.remove();
    });

    it('should be hidden when the close button is clicked', function () {
        var alertEl,
            el,
            $scope = $rootScope.$new();

        el = $compile('<bb-alert bb-alert-closeable="true">Test alert</bb-alert>')($scope);
        el.appendTo(document.body);

        $scope.$digest();

        alertEl = el.find('.alert');

        expect(alertEl).toBeVisible();

        el.find('button.close').click();

        expect(alertEl).toBeHidden();

        el.remove();
    });

    it('should allow the screen reader text for the close button to be localizable', function () {
        var el,
            $scope = $rootScope.$new();

        bbResources.alert_close = '__test__close';

        el = $compile('<bb-alert bb-alert-closeable="true"></bb-alert>')($scope);
        el.appendTo(document.body);

        $scope.$digest();

        expect(el.find('button.close .sr-only')).toHaveText(bbResources.alert_close);

        el.remove();
    });

    it('should add the appropriate styling when an alert type is specified', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-alert bb-alert-type="danger">Hello</bb-alert>')($scope);

        $scope.$digest();

        expect(el.find('.alert')).toHaveClass('alert-danger');
    });
});
