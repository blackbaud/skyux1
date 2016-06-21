/*jshint browser: true, jasmine: true */
/*global inject, module*/

describe('Phone field directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        directiveElements,
        compileDirective,
        nationalCountryData,
        internationalCountryData,
        setNumber,
        setCountry,
        bbPhoneFieldConfig;

    directiveElements =
    {
        input: function (el) {
            return el.find('input');
        },
        container: function (el) {
            return el.find('.intl-tel-input');
        },
        flag_container: function (el) {
            return el.find('.flag-container');
        },
        selected_flag: function (el) {
            return el.find('.selected-flag');
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

    compileDirective = function ($scope) {
        var html = '<form name="form">' +
                   '  <input bb-phone-field="phoneFieldConfig" ' +
                   '         ng-model="phoneNumber"' +
                   '         name="phoneNumber"/>' +
                   '</form>';
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
    beforeEach(module('sky.phonefield'));
    beforeEach(inject(function (_$compile_, _$rootScope_, _bbPhoneFieldConfig_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbPhoneFieldConfig = _bbPhoneFieldConfig_;
    }));

    it('should implement the intl-tel-input jQuery plugin and provide an intl-tel-input div container, input, and flag contianer.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {};

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
            flagContainer;
        $scope.phoneFieldConfig = {
            countryIso2: internationalCountryData.iso2
        };

        // ** act ***
        el = compileDirective($scope);
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

    it('should change the phoneFieldConfig selectedCountry property to whatever the selected country is.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: nationalCountryData.iso2
        };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setCountry(el, internationalCountryData.iso2);

        // ** assert **
        expect($scope.phoneFieldConfig.selectedCountry.name).toBe(internationalCountryData.name);
        expect($scope.phoneFieldConfig.selectedCountry.iso2).toBe(internationalCountryData.iso2);
        expect($scope.phoneFieldConfig.selectedCountry.dialCode).toBe(internationalCountryData.dialCode);

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to ng-model to a nationally formatted number for local country.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: nationalCountryData.iso2
        };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, nationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.phoneNumber).toBe(nationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to ng-model to an internationally formatted number for non-local country.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: nationalCountryData.iso2
        };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setCountry(el, internationalCountryData.iso2);
        setNumber(el, internationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.phoneNumber).toBe(internationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should set the validation of the ng-model to true if the provided phone number is valid.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
                countryIso2: nationalCountryData.iso2
            };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, nationalCountryData.unformattedTestNumber);

        // ** assert **
        expect($scope.form.$valid).toBeTruthy();

        // ** clean up **
        el.remove();
    });

    it('should set the validation of the ng-model to false if the provided phone number is invalid.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
                countryIso2: nationalCountryData.iso2
            };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        setNumber(el, 'invalid_number');

        // ** assert **
        expect($scope.form.$valid).toBeFalsy();

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to ng-model to a nationally formatted number when the input text is changed manually.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: nationalCountryData.iso2
        };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        directiveElements.input(el).val(nationalCountryData.unformattedTestNumber).change();

        // ** assert **
        expect($scope.phoneNumber).toBe(nationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should set the value provided to ng-model to a nationally formatted number when the ng-model variable is changed programmatically.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: nationalCountryData.iso2
        };
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** act **
        $scope.phoneNumber = nationalCountryData.unformattedTestNumber;
        $scope.$digest();

        // ** assert **
        expect($scope.form.phoneNumber.$viewValue).toBe(nationalCountryData.formattedTestNumber);

        // ** clean up **
        el.remove();
    });

    it('should set the scope bbPhoneField countryIso2 to that of bbPhoneFieldConfig if no countryIso2 is provided in the bbPhoneField param.', function () {
        // ** arrange **
        var el,
            $scope = $rootScope.$new();
        $scope.phoneFieldConfig = {
            countryIso2: undefined
        };
        // ** act **
        el = compileDirective($scope);
        el.appendTo(document.body);
        $scope.$digest();

        // ** assert **
        expect($scope.phoneFieldConfig.countryIso2).toBe(bbPhoneFieldConfig.countryIso2);

        // ** clean up **
        el.remove();
    });

});
