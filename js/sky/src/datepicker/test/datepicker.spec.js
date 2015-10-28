/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Datepicker directive', function () {
    'use strict';

    var $compile,
        datepickerHtml,
        $scope,
        $q,
        $timeout,
        dateConfig,
        resources,
        datepickerScope;


    beforeEach(module('ngMock'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('sky.templates'));
    beforeEach(module('sky.datepicker'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _$timeout_, bbResources, bbDatepickerConfig) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        dateConfig = bbDatepickerConfig;
        resources = bbResources;
        $timeout = _$timeout_;

        dateConfig.currentCultureDateFormatString = 'MM/dd/yyyy';


        datepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                    '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
                '</form>' +
            '</div>';

    }));

    afterEach(function () {
        if (angular.isDefined(datepickerScope)) {
            datepickerScope.locals.opened = false;
            datepickerScope.$digest();
        }
    });


    function setupDatepicker(templateHtml, initalValue, appendToBody) {
        var el;

        el = angular.element(templateHtml);

        if (appendToBody) {
            el.appendTo(document.body);
        }

        $scope.testdate1 = initalValue;


        $compile(el)($scope);
        $scope.$digest();

        $timeout.flush();

        datepickerScope = el.find('div').isolateScope();

        return el;
    }

    function setInput(inputEl, value) {

        inputEl.val(value).trigger('change');

        $timeout.flush();
    }

    function getCalendar(el) {
        return el.find('ul.dropdown-menu');
    }

    function getCalendarButton(el) {
        return el.find('button.btn.btn-default.bb-date-field-calendar-button');
    }

    function getDate(calendarEl, day) {
        return calendarEl.find('td button span:contains(\'' + day + '\')');
    }

    function openCalendar(el) {
        var buttonEl = getCalendarButton(el);

        expect(buttonEl.length).toBe(1);

        buttonEl.click();

        $scope.$digest();
    }


    it('sets up everything correctly with a valid date', function () {
        var el,
            inputEl,
            dateFieldEl,
            buttonEl,
            iconEl;

        el = setupDatepicker(datepickerHtml, '5/17/1985');

        dateFieldEl = el.find('.input-group.bb-datefield');

        expect(dateFieldEl.length).toBe(1);

        inputEl = dateFieldEl.find('input');

        expect(inputEl).toHaveValue('05/17/1985');
        expect(inputEl).toHaveClass('form-control');

        buttonEl = dateFieldEl.find('span.input-group-btn button.bb-date-field-calendar-button');
        expect(buttonEl.length).toBe(1);

        iconEl = buttonEl.find('i.fa.fa-calendar');
        expect(iconEl.length).toBe(1);
    });

    it('renders SQL UTC dates properly', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '2015-05-28T00:00:00');

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('05/28/2015');

        expect(inputEl.attr('placeholder')).toBe('mm/dd/yyyy');
    });

    it('handles input changing to SQL UTC dates', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '5/17/1999');

        inputEl = el.find('input');

        setInput(inputEl, '2009-06-15T00:00:00');

        expect(inputEl).toHaveValue('06/15/2009');

        expect($scope.testdate1).toEqual(new Date('06/15/2009'));
    });

    it('renders Javascript dates properly', function () {
        var el,
           inputEl;

        el = setupDatepicker(datepickerHtml, new Date('05/28/2015'));

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('05/28/2015');

    });

    it('handles date change to valid date', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '5/17/1985');

        inputEl = el.find('input');

        setInput(inputEl, '5/18/1985');

        expect($scope.testdate1).toEqual(new Date('05/18/1985'));
    });

    it('handles date change to invalid date', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '5/17/1985');

        inputEl = el.find('input');

        setInput(inputEl, 'blaaaaaaah');

        expect(angular.isDefined($scope.testdate1)).toBe(true);

        expect($scope.testform.testDate1.$error.dateFormat).toBe(true);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);

    });

    it('handles date change to invalid date from model', function () {
        var el;

        el = setupDatepicker(datepickerHtml, '5/17/1985');

        $scope.testdate1 = 'blaaaaaaah';
        $scope.$digest();

        expect(angular.isDefined($scope.testdate1)).toBe(true);

        expect($scope.testform.testDate1.$error.dateFormat).toBe(true);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
    });

    it('handles validation when the ng-model starts as undefined', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml);

        inputEl = el.find('input');

        setInput(inputEl, 'blaaaaaaah');

        expect(angular.isDefined($scope.testdate1)).toBe(true);

        expect($scope.testform.testDate1.$error.dateFormat).toBe(true);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);

    });

    it('handles empty string when date is not required', function () {
        var el;

        el = setupDatepicker(datepickerHtml, '');

        expect($scope.testdate1).toBe('');
        expect(angular.isDefined($scope.testform.$error.dateFormat)).toBe(false);
        expect($scope.testform.$valid).toBe(true);
    });

    it('handles date being required', function () {
        var el,
            requiredHtml = '<div>' +
                '<form name="testform" novalidate>' +
                    '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" ng-required="{{true}}"></bb-datepicker>' +
                '</form>' +
            '</div>';
        el = setupDatepicker(requiredHtml, '');

        expect($scope.testdate1).toBe('');
        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect($scope.testform.$valid).toBe(false);
        expect($scope.testform.testDate1.$error.required).toBe(true);
    });

    it('handles invalid date and then required date', function () {
        var el,
            inputEl,
            requiredHtml = '<div>' +
                '<form name="testform" novalidate>' +
                    '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" ng-required="{{true}}"></bb-datepicker>' +
                '</form>' +
            '</div>';
        el = setupDatepicker(requiredHtml, '');

        inputEl = el.find('input');

        setInput(inputEl, 'a');

        expect($scope.testdate1).toBe('a');
        expect($scope.testform.testDate1.$error.dateFormat).toBe(true);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
        expect(angular.isDefined($scope.testform.testDate1.$error.required)).toBe(false);
        expect($scope.testform.$valid).toBe(false);

        setInput(inputEl, '');
        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(null);
        expect($scope.testform.testDate1.$error.required).toBe(true);
        expect($scope.testform.$valid).toBe(false);
    });

    it('handles invalid and then valid date', function () {
        var el,
            inputEl,
            dateHtml = '<div>' +
                '<form name="testform" novalidate>' +
                    '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
                '</form>' +
            '</div>';
        el = setupDatepicker(dateHtml, '');

        inputEl = el.find('input');

        setInput(inputEl, 'a');

        expect($scope.testdate1).toBe('a');
        expect($scope.testform.testDate1.$error.dateFormat).toBe(true);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
        expect($scope.testform.$valid).toBe(false);

        setInput(inputEl, '7/8/1991');
        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(null);
        expect($scope.testform.$valid).toBe(true);
    });

    it('handles MMddyyy translations', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '05181991');

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('05/18/1991');
        expect($scope.testdate1).toEqual(new Date('05/18/1991'));

        setInput(inputEl, '05161992');

        expect(inputEl).toHaveValue('05/16/1992');
        expect($scope.testdate1).toEqual(new Date('05/16/1992'));
    });

    it('handles ddMMyyyy translations', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd/MM/yyyy';

        el = setupDatepicker(datepickerHtml, '18051991');

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('18/05/1991');
        expect($scope.testdate1).toEqual(new Date('05/18/1991'));


        setInput(inputEl, '16051992');

        expect(inputEl).toHaveValue('16/05/1992');
        expect($scope.testdate1).toEqual(new Date('05/16/1992'));

    });

    it('handles yyyyMMdd translations', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'yyyy/MM/dd';

        el = setupDatepicker(datepickerHtml, '19910518');

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('1991/05/18');
        expect($scope.testdate1).toEqual(new Date('05/18/1991'));

        setInput(inputEl, '19920516');

        expect(inputEl).toHaveValue('1992/05/16');

        expect($scope.testdate1).toEqual(new Date('05/16/1992'));
    });

    it('does not handle ddyyyyMM translations', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd/yyyy/MM';

        el = setupDatepicker(datepickerHtml, '12/19/1991');

        inputEl = el.find('input');

        setInput(inputEl, '19058518');

        expect(angular.isDefined($scope.testdate1)).toBe(true);
        expect(angular.isDefined($scope.testform.$error.dateFormat)).toBe(true);
        expect($scope.testform.$error.dateFormat[0].invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
    });

    it('handles yyyy/MM/dd dates', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'yyyy/MM/dd';

        el = setupDatepicker(datepickerHtml, '1991/05/18');

        inputEl = el.find('input');

        setInput(inputEl, '1992/05/16');

        expect(inputEl).toHaveValue('1992/05/16');

        expect($scope.testdate1).toEqual(new Date('05/16/1992'));

        setInput(inputEl, '1992/5/6');

        expect(inputEl).toHaveValue('1992/05/06');

        expect($scope.testdate1).toEqual(new Date('05/06/1992'));
    });

    it('hanldes dd/MM/yyyy dates', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd/MM/yyyy';

        el = setupDatepicker(datepickerHtml, '18/05/1992');

        inputEl = el.find('input');

        setInput(inputEl, '16/05/1992');

        expect(inputEl).toHaveValue('16/05/1992');

        expect($scope.testdate1).toEqual(new Date('05/16/1992'));

        setInput(inputEl, '16/4/1992');

        expect(inputEl).toHaveValue('16/04/1992');

        expect($scope.testdate1).toEqual(new Date('04/16/1992'));

    });

    it('handles dd.MM.yyyy dates', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd.MM.yyyy';

        el = setupDatepicker(datepickerHtml, '18.5.1992');

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('18.05.1992');

        expect($scope.testdate1).toEqual(new Date('05/18/1992'));

        setInput(inputEl, '16.05.1992');

        expect(inputEl).toHaveValue('16.05.1992');

        expect($scope.testdate1).toEqual(new Date('05/16/1992'));

        setInput(inputEl, '16.4.1992');

        expect(inputEl).toHaveValue('16.04.1992');

        expect($scope.testdate1).toEqual(new Date('04/16/1992'));
    });

    it('does not attempt to parse dd/yyyy/MM dates', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd/yyyy/MM';

        el = setupDatepicker(datepickerHtml, '12/19/1991');

        inputEl = el.find('input');

        setInput(inputEl, '19/1905/8');

        expect(inputEl).not.toHaveValue('19/1905/08');

    });

    it('does not attempt to parse strings with length less than 8', function () {
        var el,
            inputEl;

        dateConfig.currentCultureDateFormatString = 'dd.MM.yyyy';

        el = setupDatepicker(datepickerHtml, '18.5.1992');

        inputEl = el.find('input');

        setInput(inputEl, '18.5.19');

        expect(angular.isDefined($scope.testdate1)).toBe(true);
        expect(angular.isDefined($scope.testform.$error.dateFormat)).toBe(true);

        expect($scope.testform.$error.dateFormat[0].invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
        expect($scope.testform.testDate1.invalidFormatMessage).toBe(resources.date_field_invalid_date_message);
    });

    it('handles ng-model changes after initialization', function () {
        var el,
            inputEl;

        el = setupDatepicker(datepickerHtml, '05/18/1992');

        inputEl = el.find('input');

        setInput(inputEl, '05/16/1992');

        expect(inputEl).toHaveValue('05/16/1992');

        expect($scope.testdate1).toEqual(new Date('05/16/1992'));

        $scope.testdate1 = '05/22/1992';

        $scope.$digest();

        expect(inputEl).toHaveValue('05/22/1992');

        expect($scope.testdate1).toEqual(new Date('05/22/1992'));

    });

    it('handles opening datepicker', function () {
        var el,
            inputEl,
            calendarEl,
            dateEl;

        el = setupDatepicker(datepickerHtml, '05/18/1992', true);

        inputEl = el.find('input');

        calendarEl = getCalendar(el);
        expect(calendarEl.length).toBe(0);

        openCalendar(el);
        $timeout.flush();

        calendarEl = getCalendar(el);

        expect(calendarEl.length).toBe(1);

        dateEl = getDate(calendarEl, 19);
        expect(dateEl.length).toBe(1);
        dateEl.closest('button').click();
        $scope.$digest();

        expect(inputEl).toHaveValue('05/19/1992');

        expect($scope.testdate1).toEqual(new Date('05/19/1992'));
        openCalendar(el);
        $timeout.flush();

        el.remove();
    });

    it('handles opening datepicker with different date formats', function () {
        var el,
            inputEl,
            calendarEl,
            dateEl;

        dateConfig.currentCultureDateFormatString = 'dd/MM/yyyy';

        el = setupDatepicker(datepickerHtml, '18/05/1992', true);

        inputEl = el.find('input');

        calendarEl = getCalendar(el);
        expect(calendarEl.length).toBe(0);

        openCalendar(el);
        $timeout.flush();

        calendarEl = getCalendar(el);

        expect(calendarEl.length).toBe(1);

        dateEl = getDate(calendarEl, 19);
        expect(dateEl.length).toBe(1);
        dateEl.closest('button').click();
        $scope.$digest();

        expect(inputEl).toHaveValue('19/05/1992');

        expect($scope.testdate1).toEqual(new Date('05/19/1992'));

        openCalendar(el);
        $timeout.flush();

        el.remove();
    });

    it('handles validation when a form element does not exist', function () {
        var el,
            inputEl,
            noFormHtml = '<div>' +
            '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
            '</div>';

        el = setupDatepicker(noFormHtml, '5/18/1992');

        inputEl = el.find('input');

        setInput(inputEl, 'blaaaaaaah');

        expect(angular.isDefined($scope.testdate1)).toBe(true);

    });

    it('handles validation when there is a form in the parent but no form in parent scope', function () {
        var el,
            inputEl,
            noFormHtml =
            '<div>' +
            '<form>' +
            '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
            '</form>' +
            '</div>';

        el = setupDatepicker(noFormHtml, '5/18/1992');

        inputEl = el.find('input');

        setInput(inputEl, 'blaaaaaaah');

        expect(angular.isDefined($scope.testdate1)).toBe(true);
    });

    it('adds placeholder text when specified', function () {
        var el,
            inputEl,
            placeholderTextHtml =
            '<div>' +
            '<form name="testform">' +
            '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" placeholder="myPlaceholder"></bb-datepicker>' +
            '</form>' +
            '</div>';

        $scope.myPlaceholder = 'All about dat money';

        el = setupDatepicker(placeholderTextHtml, '5/18/1992');

        inputEl = el.find('input');

        expect(inputEl.attr('placeholder')).toBe('All about dat money');
    });

    it('can have custom bootstrap datepicker options', function () {
        var el,
            inputEl,
            buttonBarEl,
            weekEl,
            customOptionsEl = '<div>' +
            '<form name="testform" novalidate>' +
            '<div>' +
            '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" bb-date-options="dateOptions" bb-date-format="\'dd/MM/yyyy\'" show-button-bar="true" close-on-date-selection="true"></bb-datepicker>' +
            '</div>' +
            '</form>';

        $scope.dateOptions = {
            showWeeks: true
        };

        el = setupDatepicker(customOptionsEl, new Date('05/18/1992'));

        inputEl = el.find('input');

        expect(inputEl).toHaveValue('18/05/1992');
        openCalendar(el);

        $scope.$digest();

        buttonBarEl = el.find('ul button.btn-success');

        expect(buttonBarEl.length).toBe(1);

        weekEl = el.find('ul td em');
        expect(weekEl.length).toBe(6);

        openCalendar(el);
    });

    describe('custom validation', function () {
        it('accepts a custom validation formatter', function () {
            var el,
                inputEl,
                customValidationEl = '<div>' +
                '<form name="testform" novalidate>' +
                    '<div class="form-group">' +
                        '<bb-datepicker bb-datepicker-name="testDate1" ng-required="{{true}}" ng-model="testdate1" bb-custom-validation="dateOptions"></bb-datepicker>' +
                    '</div>' +
                '</form>' +
            '</div>';

            // Custom date formatting method
            $scope.dateOptions = {
                formatValue: function (value) {

                    return $q(function (resolve) {
                        var formattedValue = value,
                            formattingErrorMessage;

                        if (value.toUpperCase() !== value) {
                            formattingErrorMessage = 'Any letters should be capitalized.';
                        } else {
                            formattedValue = '[' + value.toUpperCase() + ']';
                        }

                        resolve({
                            formattedValue: formattedValue,
                            formattingErrorMessage: formattingErrorMessage
                        });
                    });
                }
            };

            el = setupDatepicker(customValidationEl, '5/17/1985');

            expect($scope.testdate1).toBe('5/17/1985');

            inputEl = el.find('input');

            setInput(inputEl, '5/22/1929');

            expect($scope.testdate1).toBe('[5/22/1929]');

            expect($scope.testform.$valid).toBe(true);

            setInput(inputEl, 'May2009');

            expect($scope.testdate1).toBe('May2009');
            expect($scope.testform.$error.dateFormat[0].invalidFormatMessage).toBe('Any letters should be capitalized.');

        });

        it('handles a required error when using custom validation', function () {
            var el,
                inputEl,
                customValidationEl = '<div>' +
                '<form name="testform" novalidate>' +
                    '<div class="form-group">' +
                        '<bb-datepicker bb-datepicker-name="testDate1" ng-required="{{true}}" ng-model="testdate1" bb-custom-validation="dateOptions"></bb-datepicker>' +
                    '</div>' +
                '</form>' +
            '</div>';

            // Custom date formatting method
            $scope.dateOptions = {
                formatValue: function (value) {

                    return $q(function (resolve) {
                        var formattedValue = value,
                            formattingErrorMessage;

                        if (value.toUpperCase() !== value) {
                            formattingErrorMessage = 'Any letters should be capitalized.';
                        } else {
                            formattedValue = '[' + value.toUpperCase() + ']';
                        }

                        resolve({
                            formattedValue: formattedValue,
                            formattingErrorMessage: formattingErrorMessage
                        });
                    });
                }
            };

            el = setupDatepicker(customValidationEl, '5/17/1985');

            expect($scope.testdate1).toBe('5/17/1985');

            inputEl = el.find('input');

            setInput(inputEl, '');

            expect($scope.testdate1).toBe('');

            expect($scope.testform.$valid).toBe(false);
            expect($scope.testform.testDate1.$error.required).toBe(true);

        });

        it('accepts a custom validation formatter that doesnt return deferred', function () {
            var el,
                inputEl,
                customValidationEl = '<div>' +
                '<form name="testform" novalidate>' +
                    '<div class="form-group">' +
                        '<bb-datepicker bb-datepicker-name="testDate1" ng-required="{{true}}" ng-model="testdate1" bb-custom-validation="dateOptions"></bb-datepicker>' +
                    '</div>' +
                '</form>' +
            '</div>';

            // Custom date formatting method
            $scope.dateOptions = {
                formatValue: function (value) {

                    var formattedValue = value,
                        formattingErrorMessage;

                    if (value.toUpperCase() !== value) {
                        formattingErrorMessage = 'Any letters should be capitalized.';
                    } else {
                        formattedValue = '[' + value.toUpperCase() + ']';
                    }
                    return {
                        formattedValue: formattedValue,
                        formattingErrorMessage: formattingErrorMessage
                    };
                }
            };

            el = setupDatepicker(customValidationEl, '5/17/1985');


            inputEl = el.find('input');

            setInput(inputEl, '5/22/1929');


            expect($scope.testdate1).toBe('[5/22/1929]');

            expect($scope.testform.$valid).toBe(true);

            setInput(inputEl, 'May2009');

            expect($scope.testdate1).toBe('May2009');
            expect($scope.testform.$error.dateFormat[0].invalidFormatMessage).toBe('Any letters should be capitalized.');
        });

        it('does not have custom validation if the formatValue function is not defined', function () {
            var el,
                inputEl,
                customValidationEl = '<div>' +
                '<form name="testform" novalidate>' +
                    '<div class="form-group">' +
                        '<bb-datepicker bb-datepicker-name="testDate1" ng-required="{{true}}" ng-model="testdate1" bb-custom-validation="dateOptions"></bb-datepicker>' +
                    '</div>' +
                '</form>' +
            '</div>';

            // Custom date formatting method
            $scope.dateOptions = {
            };

            el = setupDatepicker(customValidationEl, '5/17/1985');


            inputEl = el.find('input');

            setInput(inputEl, '5/22/1929');


            expect($scope.testdate1).toEqual(new Date('05/22/1929'));

        });

        it('handles custom validation returning undefined', function () {
            var el,
                inputEl,
                customValidationEl = '<div>' +
                '<form name="testform" novalidate>' +
                    '<div class="form-group">' +
                        '<bb-datepicker bb-datepicker-name="testDate1" ng-required="{{true}}" ng-model="testdate1" bb-custom-validation="dateOptions"></bb-datepicker>' +
                    '</div>' +
                '</form>' +
            '</div>';

            // Custom date formatting method
            $scope.dateOptions = {
                formatValue: function (value) {

                    return $q(function (resolve) {
                        var formattedValue = value,
                            formattingErrorMessage;

                        if (value.toUpperCase() !== value) {
                            formattingErrorMessage = 'Any letters should be capitalized.';
                        } else {
                            formattedValue = '[' + value.toUpperCase() + ']';
                        }

                        resolve();
                    });
                }
            };

            el = setupDatepicker(customValidationEl, '5/17/1985');

            inputEl = el.find('input');

            setInput(inputEl, '5/22/1929');

            setInput(inputEl, 'aaa');

            $scope.$digest();

            expect(angular.isDefined($scope.testdate1)).toBe(true);

            expect($scope.testform.$valid).toBe(true);

        });
    });

    describe('datepicker append to body', function () {
        it('adds the appropriate class when appended to body and positions intelligently on open', function () {
            var el,
                expectedWidth,
                nestedCalendarEl,
                bodyCalendarEl,
                inputEl,
                spanEl,
                appendToBodyHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" datepicker-append-to-body="true"></bb-datepicker>' +
                '</form>' +
                '</div>';

            el = setupDatepicker(appendToBodyHtml, '5/17/1985', true);

            inputEl = el.find('input');

            spanEl = el.find('span.bb-datepicker-button-container');

            nestedCalendarEl = el.find('ul.dropdown-menu');
            expect(nestedCalendarEl.length).toBe(0);

            openCalendar(el);
            $timeout.flush();

            bodyCalendarEl = $('body > ul[datepicker-popup-wrap]');

            expect(bodyCalendarEl.length).toBe(1);

            expect(bodyCalendarEl).toHaveClass('bb-datefield');

            expectedWidth = inputEl.offset().left + inputEl.innerWidth() + spanEl.innerWidth() - bodyCalendarEl.innerWidth();

            expect(bodyCalendarEl[0].style.left).toBe(expectedWidth.toString() + 'px');

            openCalendar(el);
            $timeout.flush();

            inputEl.width(10);

            openCalendar(el);
            $timeout.flush();

            bodyCalendarEl = $('body > ul[datepicker-popup-wrap]');
            expect(bodyCalendarEl[0].style.left).not.toBe(expectedWidth.toString() + 'px');
            expect(bodyCalendarEl).toHaveClass('bb-datefield');

            openCalendar(el);
            $timeout.flush();

            el.remove();
        });
    });

    function runMinAndMaxDateFullTest(el, minDateCompare, maxDateCompare, middleDateCompare, minDay, maxDay, middleDay) {
        var calendarEl,
            calendarDayEl,
            inputEl;

        openCalendar(el);

        calendarEl = getCalendar(el);
        calendarDayEl = getDate(calendarEl, minDay);

        expect(calendarDayEl.parent('button')).toBeDisabled();

        calendarDayEl = getDate(calendarEl, middleDay);

        expect(calendarDayEl.parent('button')).not.toBeDisabled();

        calendarDayEl = getDate(calendarEl, maxDay);

        expect(calendarDayEl.parent('button')).toBeDisabled();


        inputEl = el.find('input');

        setInput(inputEl, minDateCompare);

        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(true);

        setInput(inputEl, maxDateCompare);

        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(true);

        setInput(inputEl, middleDateCompare);
        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);

        $scope.testdate1 = minDateCompare;
        $scope.$digest();
        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(true);

        $scope.testdate1 = maxDateCompare;
        $scope.$digest();

        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(true);

        $scope.testdate1 = middleDateCompare;
        $scope.$digest();

        expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);
        expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);

        openCalendar(el);
    }

    describe('min and max date', function () {
        it('can set a min and max date from the directive', function () {
            var el,
                minMaxDatepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" min-date="minDate" max-date="maxDate"></bb-datepicker>' +
                '</form>' +
                '</div>';

            $scope.minDate = new Date('5/15/2015');

            $scope.maxDate = new Date('5/18/2015');

            el = setupDatepicker(minMaxDatepickerHtml, '5/17/2015');

            runMinAndMaxDateFullTest(el, '5/3/2015', '5/19/2015', '5/16/2015', 3, 19, 16);
        });

        it('can set a min and max date from the bbDatepickerConfig if no min and max date are specified', function () {
            var el,
                minMaxDatepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
                '</form>' +
                '</div>';

            dateConfig.minDate = new Date('5/15/2015');
            dateConfig.maxDate = new Date('5/18/2015');


            el = setupDatepicker(minMaxDatepickerHtml, '5/17/2015');

            runMinAndMaxDateFullTest(el, '5/3/2015', '5/19/2015', '5/16/2015', 3, 19, 16);
        });

        it('only does min and max date validation if they are Javascript Date objects', function () {
            var el,
                inputEl,
                minMaxDatepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1"></bb-datepicker>' +
                '</form>' +
                '</div>';

            dateConfig.minDate = '5/15/2015';
            dateConfig.maxDate = '5/18/2015';


            el = setupDatepicker(minMaxDatepickerHtml, '5/17/2015');

            inputEl = el.find('input');

            setInput(inputEl, '5/3/2015');

            expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
            expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);
            expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);

            setInput(inputEl, '5/19/2015');

            expect(angular.isDefined($scope.testform.testDate1.$error.dateFormat)).toBe(false);
            expect(angular.isDefined($scope.testform.testDate1.$error.minDate)).toBe(false);
            expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(false);

        });

        it('can have the min and max date changed after initialization', function () {
            var el,
                minMaxDatepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" min-date="minDate" max-date="maxDate"></bb-datepicker>' +
                '</form>' +
                '</div>';

            $scope.minDate = '';

            $scope.maxDate = '';

            dateConfig.minDate = new Date('5/15/2015');
            dateConfig.maxDate = new Date('5/18/2015');

            el = setupDatepicker(minMaxDatepickerHtml, '5/17/2015');

            runMinAndMaxDateFullTest(el, '5/3/2015', '5/19/2015', '5/16/2015', 3, 19, 16);

            $scope.minDate = new Date('5/20/2015');

            $scope.maxDate = new Date('5/25/2015');
            $scope.testdate1 = '5/22/2015';
            $scope.$digest();

            runMinAndMaxDateFullTest(el, '5/19/2015', '5/26/2015', '5/23/2015', 19, 26, 23);
        });

        it('does max date validation without a min date', function () {
            var el,
                inputEl,
                maxDatepickerHtml = '<div>' +
                '<form name="testform" novalidate>' +
                '<bb-datepicker bb-datepicker-name="testDate1" ng-model="testdate1" max-date="maxDate"></bb-datepicker>' +
                '</form>' +
                '</div>';

            $scope.maxDate = new Date('5/25/2015');

            el = setupDatepicker(maxDatepickerHtml, '5/17/2015');
            inputEl = el.find('input');
            setInput(inputEl, '5/27/2015');
            expect(angular.isDefined($scope.testform.testDate1.$error.maxDate)).toBe(true);
        });
    });
});
