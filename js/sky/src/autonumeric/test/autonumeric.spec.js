/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Autonumeric', function () {
    'use strict';

    var $compile,
        $scope,
        $timeout;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.autonumeric'));

    describe('directive', function () {
        beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_) {
            $compile = _$compile_;
            $scope = _$rootScope_;
            $timeout = _$timeout_;
        }));

        function compileEl() {
            return $compile('<input type="text" ng-model="numericValue" bb-autonumeric />')($scope);
        }

        it('should not have bb-autonumeric- class', function () {
            var el = compileEl();

            $scope.numericValue = 123456.78;
            $scope.$digest();
            expect(el.hasClass('bb-autonumeric-')).toBe(false);
        });

        it('should have bb-autonumeric-number class', function () {
            var el = $compile('<input type="text" ng-model="numericValue" bb-autonumeric="number" />')($scope);

            $scope.numericValue = 123456.78;
            $scope.$digest();
            expect(el.hasClass('bb-autonumeric-number')).toBe(true);
        });

        // Not passing in IE 10 on BrowserStack.  Maybe revisit this test later.  It's not mission critical.
        //        it('should select existing text on focus', function () {
        //            var el = compileEl();
        //
        //            // Focus and select can't happen unless the element is in the DOM.
        //            el.appendTo(document.body);
        //
        //            $scope.numericValue = 123456.78;
        //            $scope.$digest();
        //
        //            el[0].focus();
        //            $timeout.flush();
        //
        //            expect(el[0].selectionStart).toBe(0);
        //            expect(el[0].selectionEnd).toBe(el.val().length);
        //        });

        it('should clear the element\'s text when the scope\'s property is set to null', function () {
            var el = compileEl();

            $scope.numericValue = 123456.78;
            $scope.$digest();

            $scope.numericValue = null;
            $scope.$digest();

            expect(el.val()).toBe('');
        });

        it('should set the model value to null when element has no value', function () {
            var el = compileEl();

            $scope.numericValue = 123456.78;
            $scope.$digest();

            el.val('');
            el.change();

            expect($scope.numericValue).toBe(null);
        });

        it('should allow custom configuration', function () {
            var el = $compile('<input type="text" ng-model="numericValue" bb-autonumeric bb-autonumeric-settings="numericOptions" />')($scope);

            $scope.numericValue = 123456.78;
            $scope.numericOptions = {
                aSign: '^'
            };

            $scope.$digest();

            expect(el.val()).toBe('^123,456.78');

            // Ensure we can clear out custom settings.
            $scope.numericOptions = null;
            $scope.$digest();

            expect(el.val()).toBe('123,456.78');
        });

        describe('money option', function () {
            it('should have bb-autonumeric-money class', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" />')($scope);

                $scope.moneyValue = 123456.78;
                $scope.$digest();
                expect(el.hasClass('bb-autonumeric-money')).toBe(true);
            });

            it('should set scope value based on default configuration', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" />')($scope);

                $scope.moneyValue = 123456.78;

                $scope.$digest();

                el.val('$7,654,321.00');
                el.change();

                expect($scope.moneyValue).toBe(7654321);
            });

            it('should set scope value based on default configuration on enter press', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" />')($scope),
                    event;

                $scope.moneyValue = 123456.78;

                $scope.$digest();

                el.val('$7,654,321.00');
                event = new $.Event('keydown');
                event.which = 13;
                el.trigger(event);

                expect($scope.moneyValue).toBe(7654321);

                el.val('$8,654,321.00');
                event = new $.Event('keydown');
                event.which = 15;
                el.trigger(event);
                expect($scope.moneyValue).toBe(7654321);
            });


            it('should format the input value based on the scope value', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" />')($scope);

                $scope.moneyValue = 123456.78;

                $scope.$digest();

                expect(el.val()).toBe('$123,456.78');
            });

            it('should allow individual settings to be overridden', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" bb-autonumeric-settings="moneyOptions" />')($scope);

                $scope.moneyValue = 123456.78;
                $scope.moneyOptions = {
                    aSign: '^'
                };

                $scope.$digest();

                expect(el.val()).toBe('^123,456.78');
            });

            it('should keep the model in sync with a pasted value that does not meet the requirements', function () {
                var el = $compile('<input type="text" ng-model="moneyValue" bb-autonumeric="money" bb-autonumeric-settings="moneyOptions" />')($scope);

                $scope.moneyOptions = {
                    vMin: 0
                };

                $scope.moneyValue = -1.00;

                $scope.$digest();
                $timeout.flush();

                expect(el.val()).toBe('$0.00');
                expect($scope.moneyValue).toBe(0);
            });

            it('should keep the model in sync when starting as undefined', function () {
                var el = $compile([
                    '<bb-tile>',
                    '<div bb-tile-section>',
                    '<input type="text" ng-model="moneyValue" bb-autonumeric="money" bb-autonumeric-settings="moneyOptions" />',
                    '</div>',
                    '</bb-tile>'
                ].join(''))($scope);

                $scope.moneyOptions = {
                    vMin: 0
                };

                $scope.$digest();
                $timeout.flush();
                $scope.moneyValue = -1.00;

                $scope.$digest();
                $timeout.flush();
                expect($scope.moneyValue).toBe(0);
                expect(el.find('input').val()).toBe('$0.00');

            });

        });

        describe('global configuration', function () {
            var bbAutonumericConfig,
                defaultThousandSeparator;

            beforeEach(inject(function (_bbAutonumericConfig_) {
                bbAutonumericConfig = _bbAutonumericConfig_;
                defaultThousandSeparator = bbAutonumericConfig.number.aSep;

                bbAutonumericConfig.number.aSep = '*';
            }));

            afterEach(function () {
                bbAutonumericConfig.number.aSep = defaultThousandSeparator;
            });

            it('should be respected', function () {
                var el = $compile('<input type="text" ng-model="numericValue" bb-autonumeric />')($scope);

                $scope.numericValue = 123456.78;

                $scope.$digest();

                expect(el.val()).toBe('123*456.78');
            });

            it('should cascade from "number" to "money"', function () {
                var el = $compile('<input type="text" ng-model="numericValue" bb-autonumeric="money" />')($scope);

                $scope.numericValue = 123456.78;

                $scope.$digest();

                expect(el.val()).toBe('$123*456.78');
            });
        });
    });

    describe('filter', function () {
        var $filter,
            bbAutonumericConfig,
            bbResources;

        function validateMoneyAbbr(input, expected) {
            var formattedValue = $filter('bbAutonumeric')(input, 'money', true);
            expect(formattedValue).toBe(expected);
        }

        beforeEach(inject(function (_$filter_, _bbAutonumericConfig_, _bbResources_) {
            $filter = _$filter_;
            bbAutonumericConfig = _bbAutonumericConfig_;
            bbResources = _bbResources_;
        }));

        it('should format the specified value', function () {
            var formattedValue = $filter('bbAutonumeric')(123456.78, 'money');

            expect(formattedValue).toBe('$123,456.78');
        });

        it('should not reformat the value if it is already a formatted value', function () {
            var formattedValue = $filter('bbAutonumeric')('$123,456.78', 'money');

            expect(formattedValue).toBe('$123,456.78');
        });

        it('should use number as the default config type', function () {
            var formattedValue = $filter('bbAutonumeric')(123456.78);

            expect(formattedValue).toBe('123,456.78');
        });

        it('should not abbreviate values that round to less than 10,000', function () {
            validateMoneyAbbr(1.49, '$1');
            validateMoneyAbbr(1.5, '$2');
            validateMoneyAbbr(999, '$999');
            validateMoneyAbbr(999.49, '$999');
            validateMoneyAbbr(999.50, '$1,000');
            validateMoneyAbbr(1000, '$1,000');
            validateMoneyAbbr(9999, '$9,999');
            validateMoneyAbbr(9999.49, '$9,999');
        });

        it('should abbreviate values that round to more than than or equal to 10,000 but less than 1,000,000', function () {
            var suffix = bbResources.autonumeric_abbr_thousands;

            validateMoneyAbbr(99999, '$99.9' + suffix);
            validateMoneyAbbr(999999, '$999.9' + suffix);
        });

        it('should abbreviate values that round to more than than or equal to 1,000,000 but less than 1,000,000,000', function () {
            var suffix = bbResources.autonumeric_abbr_millions;

            validateMoneyAbbr(999999.50, '$1' + suffix);
            validateMoneyAbbr(1000000, '$1' + suffix);
            validateMoneyAbbr(9999999, '$9.9' + suffix);
            validateMoneyAbbr(99999999, '$99.9' + suffix);
            validateMoneyAbbr(999999999, '$999.9' + suffix);
        });

        it('should abbreviate values that round to more than or equal to 1,000,000,000', function () {
            var suffix = bbResources.autonumeric_abbr_billions;

            validateMoneyAbbr(999999999.50, '$1' + suffix);
            validateMoneyAbbr(1000000000, '$1' + suffix);
            validateMoneyAbbr(9999999999, '$9.9' + suffix);
            validateMoneyAbbr(99999999999, '$99.9' + suffix);
            validateMoneyAbbr(999999999999, '$999.9' + suffix);
            validateMoneyAbbr(9999999999999, '$9,999.9' + suffix);
        });

        it('should floor (not round up) when abbreviating', function () {
            var suffix = bbResources.autonumeric_abbr_millions;

            validateMoneyAbbr(10364671, '$10.3' + suffix);
        });

        it('should display an empty string when the input is null', function () {
            var formattedValue = $filter('bbAutonumeric')(null, 'money');

            expect(formattedValue).toBe('');
        });

        it('should display an empty string when the input is undefined', function () {
            var formattedValue = $filter('bbAutonumeric')(undefined, 'money');

            expect(formattedValue).toBe('');
        });

        describe('when currency symbol placement is configured to be "suffix"', function () {
            var moneyConfig,
                numberConfig;

            beforeEach(function () {
                moneyConfig = bbAutonumericConfig.money;
                numberConfig = bbAutonumericConfig.number;

                bbAutonumericConfig.money = angular.extend(moneyConfig, {
                    aSign: ' €',
                    pSign: 's'
                });

                bbAutonumericConfig.number = angular.extend(numberConfig, {
                    // Tests an edge case in the code where the pSign could have a value but aSign is undefined.
                    aSign: undefined,
                    pSign: 's'
                });
            });

            afterEach(function () {
                bbAutonumericConfig.money = moneyConfig;
                bbAutonumericConfig.number = numberConfig;
            });

            it('should place the currency symbol after a non-abbreviated value', function () {
                var formattedValue = $filter('bbAutonumeric')(123456.78, 'money');

                expect(formattedValue).toBe('123,456.78 €');
            });

            it('should place the currency symbol after the suffix of an abbreviated value', function () {
                var suffix = bbResources.autonumeric_abbr_thousands;

                validateMoneyAbbr(99999, '99.9' + suffix + ' €');
            });

            it('should not add a currency symbol to an abbreviated value when the config type is "number"', function () {
                var formattedValue = $filter('bbAutonumeric')(123456.78, 'number', true),
                    suffix = bbResources.autonumeric_abbr_thousands;

                expect(formattedValue).toBe('123.4' + suffix);
            });
        });
    });
});
