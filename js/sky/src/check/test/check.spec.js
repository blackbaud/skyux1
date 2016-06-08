/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Check directive', function () {
    'use strict';

    var $compile,
        $scope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.check'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));


    describe('checkbox', function () {
        var el;

        function verifyFancyCheck(el) {
            var wrapperEl,
                spanEl;
            $compile(el)($scope);
            $scope.$digest();

            wrapperEl = el.find('label.bb-check-wrapper');
            expect(wrapperEl.length).toBe(1);

            spanEl = wrapperEl.find('input + span.bb-check-checkbox');

            expect(spanEl.length).toBe(1);
        }

        it('wraps the input in a label if no parent label exists and adds a bb-check-checkbox element after', function () {

            el = angular.element('<div><input type="checkbox" bb-check /></div>');

            verifyFancyCheck(el);
        });

        it('adds the bb-check-wrapper class to the parent label if it exists and a bb-check-checkbox element after', function () {
            el = angular.element('<div><label><input type="checkbox" bb-check /> Some Label Words</label></div>');

            verifyFancyCheck(el);

            expect(el.find('label span.bb-check-label-text')).toHaveText('Some Label Words');
        });
    });

    describe('radio button', function () {
        var el;

        function verifyFancyRadio(el) {
            var wrapperEl,
                spanEl;
            $compile(el)($scope);
            $scope.$digest();

            wrapperEl = el.find('label.bb-check-wrapper');
            expect(wrapperEl.length).toBe(1);

            spanEl = wrapperEl.find('input + span.bb-check-radio');

            expect(spanEl.length).toBe(1);
        }

        it('wraps the input in a label if no parent label exists and adds a bb-check-radio element after', function () {
            el = angular.element('<div><input type="radio" bb-check /></div>');
            verifyFancyRadio(el);
        });

        it('adds the bb-check-wrapper class to the parent label if it exists and a bb-check-radio element after', function () {
            el = angular.element('<div><label><input type="radio" bb-check /> Some Label Words</label></div>');

            verifyFancyRadio(el);
            expect(el.find('label span.bb-check-label-text')).toHaveText('Some Label Words');
        });
    });
});
