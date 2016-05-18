/*jshint browser: true, jasmine: true */
/*global inject, module, angular */

describe('Date range picker', function () {
    'use strict';

    var $compile,
        $filter,
        $rootScope,
        $timeout,
        bbDateRangePicker,
        bbResources,
        everyFourYearsType = 1001,
        customCaption = 'Every four years',
        customDescription = '{0} for every four years';

    beforeEach(module(
        'ngMock',
        'ui.bootstrap',
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

    function getSpecificDateOption(el) {
        return el.find('option[value="number:19"]');
    }

    function getDateRangeTypeInfo(dateRangeType) {
        if (dateRangeType === everyFourYearsType) {
            return {
                caption: customCaption,
                description: customDescription
            };
        }
    }

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
                    expect(selectEl.find('> option[value="number:' + options[p] + '"]').length).toBe(1);
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
                    if (p !== 'SPECIFIC_RANGE') {
                        $scope.pickerValue = {dateRangeType: dateRangeTypes[p]};
                        $scope.$apply();

                        expect(selectEl.find('option:selected')).toHaveText(
                            bbDateRangePicker.getDateRangeTypeCaption(bbDateRangePicker.dateRangeTypes[p])
                        );
                    }

                }
            }

            expect(getSpecificDateOption(el).length).toBe(0);
        });

        it('should allow the use of custom date ranges', function () {

            var $scope = $rootScope.$new(),
                el,
                availableTypes,
                p,
                selectEl,
                customRangeHtml = '<bb-date-range-picker bb-date-range-picker-value="pickerValue" ' +
                                  'bb-date-range-picker-options="dateRangePickerOptions"' +
                                  '></bb-date-range-picker>';


            el = $compile(customRangeHtml)($scope);
            $scope.pickerValue = {
                dateRangeType: everyFourYearsType
            };
            availableTypes = bbDateRangePicker.getDateRangeOptions(
                {
                    includeDefault: true
                });

            availableTypes.push(everyFourYearsType);



            $scope.dateRangePickerOptions = {
                availableDateRangeTypes: availableTypes,
                getDateRangeTypeInfo: getDateRangeTypeInfo
            };

            $scope.$digest();

            selectEl = el.find('select');

            expect(selectEl.find('option:selected')).toHaveText(customCaption);

            for (p in bbDateRangePicker.dateRangeTypes) {
                if (bbDateRangePicker.dateRangeTypes.hasOwnProperty(p)) {
                    if (p !== 'SPECIFIC_RANGE') {
                        $scope.pickerValue = {dateRangeType: bbDateRangePicker.dateRangeTypes[p]};
                        $scope.$apply();

                        expect(selectEl.find('option:selected')).toHaveText(
                            bbDateRangePicker.getDateRangeTypeCaption(bbDateRangePicker.dateRangeTypes[p])
                        );
                    }
                }
            }

            expect(getSpecificDateOption(el).length).toBe(0);
        });

        function getFormatErrEl(el) {
            return el.find('.bb-date-range-picker-date-format-error');
        }

        function getMinErrEl(el) {
            return el.find('.bb-date-range-picker-date-min-error');
        }

        function getMaxErrEl(el) {
            return el.find('.bb-date-range-picker-date-max-error');
        }

        function setDatepickerInput(datepickerEl, value, $scope) {
            datepickerEl.val(value).trigger('change');
            $timeout.flush();
            $scope.$digest();
        }

        it('should show the datepickers when using specific date range', function () {
            var $scope = $rootScope.$new(),
                el,
                labelsEl,
                datepickerInputEl,
                dateFormatErrorEl,
                minDateErrorEl,
                maxDateErrorEl;


            $scope.dateRangePickerOptions = {};

            $scope.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.specificDateRangeOptions;
            $scope.dateRangePickerValue = {
                dateRangeType: bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE
            };

            el = angular.element('<div><bb-date-range-picker bb-date-range-picker-value="dateRangePickerValue"' +
                          'bb-date-range-picker-options="dateRangePickerOptions"' +
                          'bb-date-range-picker-from-date="fromDate"' +
                          'bb-date-range-picker-to-date="toDate"' +
                          'bb-date-range-picker-label="\'Date Range Picker\'"' +
                          'bb-date-range-picker-valid="isValid"' +
                          '></bb-date-range-picker></div>');

            el.appendTo(document.body);

            el = $compile(el)($scope);

            $scope.$digest();
            $timeout.flush();
            expect(getSpecificDateOption(el).length).toBe(1);
            expect(getSpecificDateOption(el)).toHaveText(
                bbDateRangePicker.getDateRangeTypeCaption(bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE));


            //verify presence of datepickers and labels and no placeholder text
            labelsEl = el.find('div.bb-date-range-picker-form-group > .bb-date-range-picker-label');
            expect(labelsEl.length).toBe(3);
            expect(labelsEl.eq(0)).toHaveText('Date Range Picker');
            expect(labelsEl.eq(1)).toHaveText(bbResources.date_range_picker_from_date);
            expect(labelsEl.eq(2)).toHaveText(bbResources.date_range_picker_to_date);

            datepickerInputEl = el.find('.bb-datefield input');
            expect(datepickerInputEl.length).toBe(2);
            expect(datepickerInputEl.eq(0).val()).toBe('');
            expect(datepickerInputEl.eq(1).val()).toBe('');
            expect($scope.toDate).toEqual(undefined);
            expect($scope.fromDate).toEqual(undefined);
            expect(datepickerInputEl.eq(0)).toHaveAttr('placeholder', '');
            expect(datepickerInputEl.eq(1)).toHaveAttr('placeholder', '');
            //verify binding of to and from date
            setDatepickerInput(datepickerInputEl.eq(0), '12/12/1999', $scope);
            expect($scope.fromDate).toEqual(new Date('12/12/1999'));

            setDatepickerInput(datepickerInputEl.eq(1), '12/12/2000', $scope);
            expect($scope.toDate).toEqual(new Date('12/12/2000'));
            expect($scope.isValid).toBe(true);

            //verify validation of dateFormat, min, and max date
            setDatepickerInput(datepickerInputEl.eq(0), 'a', $scope);

            expect($scope.isValid).toBe(false);
            dateFormatErrorEl = getFormatErrEl(el);

            expect(dateFormatErrorEl.eq(0)).toBeVisible();
            expect(dateFormatErrorEl.eq(0)).toHaveText(bbResources.date_field_invalid_date_message);
            setDatepickerInput(datepickerInputEl.eq(0), '12/12/2001', $scope);

            expect($scope.isValid).toBe(false);
            dateFormatErrorEl = getFormatErrEl(el);
            maxDateErrorEl = getMaxErrEl(el);

            expect(dateFormatErrorEl.eq(0)).not.toBeVisible();
            expect(dateFormatErrorEl.eq(0)).toHaveText(bbResources.date_field_invalid_date_message);
            expect(maxDateErrorEl.eq(0)).toBeVisible();
            expect(maxDateErrorEl.eq(0)).toHaveText(bbResources.date_range_picker_max_date_error);

            setDatepickerInput(datepickerInputEl.eq(1), '12/12/2003', $scope);

            expect($scope.isValid).toBe(true);
            expect(dateFormatErrorEl.eq(0)).not.toBeVisible();
            expect(maxDateErrorEl.eq(0)).not.toBeVisible();


            setDatepickerInput(datepickerInputEl.eq(1), '12/12/2000', $scope);

            expect($scope.isValid).toBe(false);
            minDateErrorEl = getMinErrEl(el);

            expect(minDateErrorEl.eq(0)).toBeVisible();
            expect(minDateErrorEl.eq(0)).toBeVisible();
            expect(minDateErrorEl.eq(0)).toHaveText(bbResources.date_range_picker_min_date_error);

            setDatepickerInput(datepickerInputEl.eq(0), '12/12/1991', $scope);

            expect($scope.isValid).toBe(true);
            setDatepickerInput(datepickerInputEl.eq(1), 'b', $scope);

            expect($scope.isValid).toBe(false);
            dateFormatErrorEl = getFormatErrEl(el);

            expect(dateFormatErrorEl.eq(1)).toBeVisible();
            expect(dateFormatErrorEl.eq(1)).toHaveText(bbResources.date_field_invalid_date_message);

            el.remove();

        });

        it('should allow the use of no labels when that option is set', function () {
            var $scope = $rootScope.$new(),
                el,
                labelsEl,
                datepickerInputEl;

            $scope.dateRangePickerOptions = {};

            $scope.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.specificDateRangeOptions;
            $scope.dateRangePickerValue = {
                dateRangeType: bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE
            };

            el = angular.element('<div><bb-date-range-picker bb-date-range-picker-value="dateRangePickerValue"' +
                          'bb-date-range-picker-options="dateRangePickerOptions"' +
                          'bb-date-range-picker-from-date="fromDate"' +
                          'bb-date-range-picker-to-date="toDate"' +
                          'bb-date-range-picker-label="\'Date Range Picker\'"' +
                          'bb-date-range-picker-valid="isValid"' +
                          'bb-date-range-picker-no-labels="true"' +
                          '></bb-date-range-picker></div>');

            el.appendTo(document.body);

            el = $compile(el)($scope);

            $scope.$digest();
            $timeout.flush();

            //verify presence of datepickers and labels and no placeholder text
            labelsEl = el.find('div.bb-date-range-picker-form-group > .bb-date-range-picker-label');
            expect(labelsEl.length).toBe(0);

            datepickerInputEl = el.find('.bb-datefield input');
            expect(datepickerInputEl.length).toBe(2);
            expect(datepickerInputEl.eq(0).val()).toBe('');
            expect(datepickerInputEl.eq(1).val()).toBe('');
            expect($scope.toDate).toEqual(undefined);
            expect($scope.fromDate).toEqual(undefined);
            expect(datepickerInputEl.eq(0)).toHaveAttr('placeholder', bbResources.date_range_picker_from_date);
            expect(datepickerInputEl.eq(1)).toHaveAttr('placeholder', bbResources.date_range_picker_to_date);

            el.remove();
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

            it('should return expected caption when custom date range type function is provided', function () {
                expect(bbDateRangePicker.getDateRangeTypeCaption(everyFourYearsType, getDateRangeTypeInfo)).toBe(customCaption);
                expect(bbDateRangePicker.getDateRangeTypeCaption({dateRangeType: everyFourYearsType}, getDateRangeTypeInfo)).toBe(customCaption);
            });

            it('should return empty string when a custom date range type does not have an associated caption', function () {
                expect(bbDateRangePicker.getDateRangeTypeCaption(1005, getDateRangeTypeInfo)).toBe('');
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

                        expect(bbDateRangePicker.getDateRangeFilterDescription(dateRangeTypes[p])).toBe(expectedDescription);
                        expect(bbDateRangePicker.getDateRangeFilterDescription({dateRangeType: dateRangeTypes[p]})).toBe(expectedDescription);
                    }
                }
            });

            it('should return expected description when custom date range type function is provided', function () {
                expect(bbDateRangePicker.getDateRangeFilterDescription(everyFourYearsType, getDateRangeTypeInfo)).toBe(customDescription);
                expect(bbDateRangePicker.getDateRangeFilterDescription({dateRangeType: everyFourYearsType}, getDateRangeTypeInfo)).toBe(customDescription);
            });

            it('should return empty string when a custom date range type does not have an associated description', function () {
                expect(bbDateRangePicker.getDateRangeFilterDescription(1005, getDateRangeTypeInfo)).toBe('');
            });
        });

        describe('getDateRangeOptions function', function () {
            var defaultOptions,
                pastOptions,
                specificOption;
            beforeEach(function () {
                defaultOptions = [
                    bbDateRangePicker.dateRangeTypes.AT_ANY_TIME,
                    bbDateRangePicker.dateRangeTypes.YESTERDAY,
                    bbDateRangePicker.dateRangeTypes.TODAY,
                    bbDateRangePicker.dateRangeTypes.TOMORROW,
                    bbDateRangePicker.dateRangeTypes.LAST_WEEK,
                    bbDateRangePicker.dateRangeTypes.THIS_WEEK,
                    bbDateRangePicker.dateRangeTypes.NEXT_WEEK,
                    bbDateRangePicker.dateRangeTypes.LAST_MONTH,
                    bbDateRangePicker.dateRangeTypes.THIS_MONTH,
                    bbDateRangePicker.dateRangeTypes.NEXT_MONTH,
                    bbDateRangePicker.dateRangeTypes.LAST_QUARTER,
                    bbDateRangePicker.dateRangeTypes.THIS_QUARTER,
                    bbDateRangePicker.dateRangeTypes.NEXT_QUARTER,
                    bbDateRangePicker.dateRangeTypes.LAST_CALENDAR_YEAR,
                    bbDateRangePicker.dateRangeTypes.THIS_CALENDAR_YEAR,
                    bbDateRangePicker.dateRangeTypes.NEXT_CALENDAR_YEAR,
                    bbDateRangePicker.dateRangeTypes.LAST_FISCAL_YEAR,
                    bbDateRangePicker.dateRangeTypes.THIS_FISCAL_YEAR,
                    bbDateRangePicker.dateRangeTypes.NEXT_FISCAL_YEAR
                ];
                pastOptions = [
                    bbDateRangePicker.dateRangeTypes.AT_ANY_TIME,
                    bbDateRangePicker.dateRangeTypes.YESTERDAY,
                    bbDateRangePicker.dateRangeTypes.TODAY,
                    bbDateRangePicker.dateRangeTypes.LAST_WEEK,
                    bbDateRangePicker.dateRangeTypes.THIS_WEEK,
                    bbDateRangePicker.dateRangeTypes.LAST_MONTH,
                    bbDateRangePicker.dateRangeTypes.THIS_MONTH,
                    bbDateRangePicker.dateRangeTypes.LAST_QUARTER,
                    bbDateRangePicker.dateRangeTypes.THIS_QUARTER,
                    bbDateRangePicker.dateRangeTypes.LAST_CALENDAR_YEAR,
                    bbDateRangePicker.dateRangeTypes.THIS_CALENDAR_YEAR,
                    bbDateRangePicker.dateRangeTypes.LAST_FISCAL_YEAR,
                    bbDateRangePicker.dateRangeTypes.THIS_FISCAL_YEAR
                ];
                specificOption = [
                    bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE
                ];
            });



            it('should return default options when the include default flag is set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includeDefault: true})).toEqual(defaultOptions);
            });

            it('should return past options when the include past flag is set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includePast: true})).toEqual(pastOptions);
            });

            it('should return specific date option when the include specific flag is set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includeSpecific: true})).toEqual([bbDateRangePicker.dateRangeTypes.AT_ANY_TIME, bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE]);
            });

            it('should return default options when default and past flags are set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includeDefault: true, includePast: true})).toEqual(defaultOptions);
            });

            it('should return default and specific options when both flags are set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includeDefault: true, includeSpecific: true})).toEqual(defaultOptions.concat(specificOption));
            });

            it('should return past and specific options when both flags are set', function () {
                expect(bbDateRangePicker.getDateRangeOptions({includePast: true, includeSpecific: true})).toEqual(pastOptions.concat(specificOption));
            });

            it('should return at any time when no flags are set', function () {
                expect(bbDateRangePicker.getDateRangeOptions()).toEqual([bbDateRangePicker.dateRangeTypes.AT_ANY_TIME]);
            });

        });
    });
});
