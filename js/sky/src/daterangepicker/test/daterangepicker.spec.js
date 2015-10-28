/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Date range picker', function () {
    'use strict';
    
    var $compile,
        $filter,
        $rootScope,
        $timeout,
        bbDateRangePicker,
        bbResources;
    
    beforeEach(module(
        'ngMock',
        'sky.daterangepicker',
        'sky.templates'
    ));
    
    beforeEach(inject(function (_$compile_, _$filter_, _$rootScope_, _$timeout_, _bbDateRangePicker_, _bbResources_) {
        $compile = _$compile_;
        $filter = _$filter_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbDateRangePicker = _bbDateRangePicker_;
        bbResources = _bbResources_;
    }));
    
    describe('directive', function () {
        it('should have the expected default options', function () {
            var $scope = $rootScope.$new(),
                el,
                options,
                p,
                selectEl;

            el = $compile('<bb-date-range-picker bb-date-range-picker-value="pickerValue"></bb-date-range-picker')($scope);

            $scope.$digest();

            selectEl = el.find('select');

            options = bbDateRangePicker.defaultDateRangeOptions;

            expect(selectEl.find('> option').length).toBe(options.length);

            for (p in options) {
                if (options.hasOwnProperty(p)) {
                    expect(selectEl.find('> option[value="' + options[p] + '"]').length).toBe(1);
                }
            }
        });

        it('should update the select element\'s value when the scope\'s value changes', function () {
            var $scope = $rootScope.$new(),
                dateRangeTypes = bbDateRangePicker.dateRangeTypes,
                el,
                p,
                selectEl;

            el = $compile('<bb-date-range-picker bb-date-range-picker-value="pickerValue"></bb-date-range-picker')($scope);

            $scope.$digest();

            selectEl = el.find('select');

            expect($scope.pickerValue.dateRangeType).toBe(bbDateRangePicker.dateRangeTypes.AT_ANY_TIME);

            for (p in dateRangeTypes) {
                if (dateRangeTypes.hasOwnProperty(p)) {
                    $scope.pickerValue = {dateRangeType: dateRangeTypes[p]};
                    $scope.$apply();

                    expect(selectEl.find('option:selected')).toHaveText(
                        bbDateRangePicker.getDateRangeTypeCaption(bbDateRangePicker.dateRangeTypes[p])
                    );
                }
            }
        });
    });
    
    describe('service', function () {
        describe('get caption method', function () {
            it('should return the "At any time" caption when no date range type is specified', function () {
                expect(bbDateRangePicker.getDateRangeTypeCaption()).toBe(bbResources.date_range_picker_at_any_time);
            });

            it('should return the expected caption based on either the object value or the numeric value', function () {
                var dateRangeTypes = bbDateRangePicker.dateRangeTypes,
                    expectedCaption,
                    p;

                for (p in dateRangeTypes) {
                    if (dateRangeTypes.hasOwnProperty(p)) {
                        expectedCaption = bbResources['date_range_picker_' + p.toLowerCase()];

                        expect(bbDateRangePicker.getDateRangeTypeCaption(dateRangeTypes[p])).toBe(expectedCaption);
                        expect(bbDateRangePicker.getDateRangeTypeCaption({dateRangeType: dateRangeTypes[p]})).toBe(expectedCaption);
                    }
                }
            });
        });
        
        describe('get filter description method', function () {
            it('should return the "At any time" caption when no date range type is specified', function () {
                expect(bbDateRangePicker.getDateRangeFilterDescription()).toBe(bbResources.date_range_picker_filter_description_at_any_time);
            });

            it('should return the expected description based on either the object value or the numeric value', function () {
                var dateRangeTypes = bbDateRangePicker.dateRangeTypes,
                    expectedDescription,
                    p;

                for (p in dateRangeTypes) {
                    if (dateRangeTypes.hasOwnProperty(p)) {
                        expectedDescription = bbResources['date_range_picker_filter_description_' + p.toLowerCase()];

                        //expect(bbDateRangePicker.getDateRangeFilterDescription(dateRangeTypes[p])).toBe(expectedDescription);
                        expect(bbDateRangePicker.getDateRangeFilterDescription({dateRangeType: dateRangeTypes[p]})).toBe(expectedDescription);
                    }
                }
            });
        });
    });
});