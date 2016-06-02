/*jshint browser: true, jasmine: true */
/*global angular, inject, module*/

describe('Phone number directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        directiveElements,
        compileDirective,
        nationalCountryData,
        internationalCountryData,
        setNumber,
        setCountry;

    directiveElements =
    {
        container: function (el) {
            return el.find('.intl-tel-input');
        },
        input: function (el) {
            return el.find('[data-bbauto-field="PhoneNumberInput"]');
        },
        flag_container: function (el) {
            return el.find('.flag-container');
        },
        selected_flag: function (el) {
            return el.find('.selected-flag');
        },
        label: function (el) {
            return el.find('[data-bbauto-field="PhoneNumberLabel"]');
        },
        dropdown: function (el) {
            return el.find('.country-list');
        },
        dropdownItems: function (el) {
            return el.find('.country');
        }
    };

    nationalCountryData = {
        name: 'United States',
        iso2: 'us',
        dialCode: '1',
        unformattedTestNumber: '2015555555',
        formattedTestNumber: '(201) 555-5555'
    };

    internationalCountryData = {
        name: 'Bangladesh (বাংলাদেশ)',
        iso2: 'bd',
        dialCode: '880',
        unformattedTestNumber: '1812345678',
        formattedTestNumber: '+880 01812-345678'
    };

    compileDirective = function ($scope, properties) {
        var html = '<bb-phone-number ';

        if (properties) {
            if (properties.country) {
                html += 'bb-phone-number-country="' + properties.country + '" ';
            }
            if (properties.countryChanged) {
                html += 'bb-phone-number-country-changed="' + properties.countryChanged + '" ';
            }
            if (properties.label) {
                html += 'bb-phone-number-label="' + properties.label + '" ';
            }
            if (properties.result) {
                html += 'bb-phone-number-result="' + properties.result + '" ';
            }
            if (properties.valid) {
                html += 'bb-phone-number-valid="' + properties.valid + '" ';
            }
        }

        html += '></bb-phone-number>';
        return $compile(html)($scope);
    };

    setNumber = function (el, number) {
        directiveElements.input(el).intlTelInput("setNumber", number).change();
    };

    setCountry = function (el, countryIso2) {
        directiveElements.input(el).intlTelInput('setCountry', countryIso2);
    };

    beforeEach(module('ngMock'));
    beforeEach(module('sky.templates'));
    beforeEach(module('sky.phonenumber'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should implement the intl-tel-input jQuery plugin and provide an intl-tel-input div container, input, and flag contianer.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();

        // ** act **
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** assert **
        expect(directiveElements.container(el)).toBeVisible();
        expect(directiveElements.input(el)).toBeVisible();
        expect(directiveElements.flag_container(el)).toBeVisible();

        // ** clean up **
        el.remove();
    });

    it('should set the selected country / flag based on bb-phone-number-local-country.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            flagContainer,
            properties = { country: internationalCountryData.iso2};

        // ** act ***
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** assert **
        flagContainer = directiveElements.selected_flag(el);
        // we can't unit test the picture of the flag, but each flag has a title in the format {country name}: {country dialCode}
        expect(flagContainer.attr('title')).toBe(internationalCountryData.name + ': +' + internationalCountryData.dialCode);
        // also, the class / icon of the flag is always names after the country's iso 2 code
        expect(flagContainer.find('.' + internationalCountryData.iso2)).toBeVisible('The flag class be visible and match the selected country iso2');

        // ** clean up **
        el.remove();
    });

    it('should call the function provided in bb-phone-number-country-changed when the selected country changes.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            countryChangedSpy,
            properties = {
                country: nationalCountryData.iso2,
                countryChanged: 'countryChanged(countryData)'
            };
        $scope.countryChanged = angular.noop;
        countryChangedSpy = spyOn($scope, 'countryChanged');
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setCountry(el, internationalCountryData.iso2);

        // ** assert **
        expect(countryChangedSpy).toHaveBeenCalledWith(jasmine.objectContaining({
            name: internationalCountryData.name,
            iso2: internationalCountryData.iso2,
            dialCode: internationalCountryData.dialCode
        }));

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to bb-phone-number-formatted-number to a nationally formatted number for local country.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            properties = {
                country: nationalCountryData.iso2,
                result: 'result'
            };
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, nationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.result).toBe(nationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to bb-phone-number-formatted-number to an internationally formatted number for non-local country.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            properties = {
                country: nationalCountryData.iso2,
                result: 'result'
            };
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setCountry(el, internationalCountryData.iso2);
        setNumber(el, internationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.result).toBe(internationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should display the provided bb-phone-number-label if a label is provided.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            properties = {
                label: 'speak of the devil and he shall appear'
            };

        // ** act **
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** assert **
        expect(directiveElements.label(el)).toHaveText(properties.label);

        // ** clean up **
        el.remove();
    });

    it('should set the value provided in bb-phone-number-valid to true if the provided phone number is valid.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            properties = {
                country: nationalCountryData.iso2,
                valid: 'valid'
            };
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, nationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.valid).toBeTruthy();

        // ** clean up **
        el.remove();
    });

    it('should set the value provided in bb-phone-number-valid to false if the provided phone number is invalid.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            properties = {
                country: nationalCountryData.iso2,
                valid: 'valid'
            };
        el = compileDirective($scope, properties);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, 'invalid_number');

        // ** assert **
        expect($scope.valid).toBeFalsy();

        // ** clean up **
        el.remove();
    });

    it('should apply ARIA (accessibility rich internet application) tags to the necessary elements.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new(),
            dropdownItems;

        // ** act **
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** assert **
        dropdownItems = directiveElements.dropdownItems(el);
        // Check that the country dropdown (as a ul element) has the listbox role
        expect(directiveElements.dropdown(el).attr('role')).toBe('listbox');
        // Check that every item in the country dropdown has the option role
        angular.forEach(dropdownItems, function (value) {
            expect(value.getAttribute('role')).toBe('option');
        });

        // ** clean up **
        el.remove();
    });

});
