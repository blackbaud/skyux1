/*jshint browser: true, jasmine: true */
/*global inject, module*/
describe('datepicker hide directive', function () {
    'use strict';

    var $scope,
        $compile,
        $document;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.templates'));
    beforeEach(module('sky.datepicker'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $document = _$document_;

    }));

    it('toggles the ng-hide class based on datepickermode input', function () {
        var el,
            internalEl,
            eventEmitted = 0,
            hideHtml = '<bb-datepicker-hide bb-datepicker-hide-mode="hideCtrl.mode" bb-datepicker-hide-mode-match="day">' +
                        '<div class="bb-test-whaddup"></div>' +
                        '</bb-datepicker-hide>';

        $scope.hideCtrl = {
            mode: 'day'
        };

        $scope.$on('uib:datepicker.mode', function () {
            eventEmitted++;
        });

        el = $compile(hideHtml)($scope);

        $document.find('body').append(el);

        internalEl = el.find('ng-transclude .bb-test-whaddup');

        expect(internalEl).toBeVisible();

        $scope.hideCtrl.mode = 'month';
        $scope.$digest();

        expect(internalEl).not.toBeVisible();
        expect(eventEmitted).toEqual(1);

        $scope.hideCtrl.mode = 'day';
        $scope.$digest();

        expect(internalEl).toBeVisible();
        expect(eventEmitted).toEqual(2);

        el.remove();


    });
});