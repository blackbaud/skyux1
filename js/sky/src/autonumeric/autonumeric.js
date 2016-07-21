/*jslint browser: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    function getBaseSettings(bbAutoNumericConfig, configType) {
        var baseSettings,
            configSettings;

        baseSettings = angular.extend(
            {},
            $.fn.autoNumeric.defaults,
            bbAutoNumericConfig.number
        );

        if (configType) {
            configSettings = angular.isObject(configType) ? configType : bbAutoNumericConfig[configType];

            /* istanbul ignore else */
            /* sanity check */
            if (configSettings) {
                angular.extend(baseSettings, configSettings);
            }
        }

        return baseSettings;
    }

    angular.module('sky.autonumeric', ['sky.resources', 'sky.window'])
        .constant('bbAutonumericConfig', {
            number: {
                aSep: ',',
                dGroup: 3,
                aDec: '.',
                pSign: 'p',
                mDec: 2
            },
            money: {
                aSign: '$'
            },
            percent: {
                aSign: '%',
                pSign: 's',
                mDec: 0
            }
        })
        .directive('bbAutonumeric', ['$timeout', 'bbAutonumericConfig', 'bbWindow', '$document', function ($timeout, bbAutoNumericConfig, bbWindow, $document) {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, el, attrs, ngModel) {
                    var customSettings = {},
                        isIosUserAgent = bbWindow.isIosUserAgent();

                    function applySettings() {
                        el.autoNumeric('update', angular.extend({}, getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric), customSettings));
                    }

                    function applyCssSettings(el) {
                        if (attrs.bbAutonumeric) {
                            el.addClass('bb-autonumeric-' + attrs.bbAutonumeric);
                        }
                    }

                    function autonumericChange() {
                        return $scope.$apply(function () {

                            var value = parseFloat(el.autoNumeric('get'));

                            if (isNaN(value)) {
                                value = null;
                            }
                            return ngModel.$setViewValue(value);
                        });
                    }

                    if (attrs.bbAutonumericSettings) {
                        $scope.$watch(attrs.bbAutonumericSettings, function (newValue) {
                            customSettings = newValue || {};
                            applySettings();
                        }, true);
                    }

                    el.autoNumeric(getBaseSettings(bbAutoNumericConfig, attrs.bbAutonumeric));
                    applyCssSettings(el);

                    // If a valid number, update the autoNumeric value.
                    // Also handles the model being updated, but being in correct (usually a paste).
                    // In that case, updates the model to what the autoNumeric plugin's value.
                    $scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        var getValue,
                            selectionStart;
                        if (newValue !== undefined && newValue !== null && !isNaN(newValue)) {

                            if (parseFloat(newValue) !== parseFloat(oldValue)) {

                                selectionStart = el[0].selectionStart;
                            }

                            el.autoNumeric('set', newValue);
                            getValue = el.autoNumeric('get');
                            if (parseFloat(getValue) !== parseFloat(newValue)) {
                                $timeout(autonumericChange);
                            } else if (el[0] && angular.isFunction(el[0].setSelectionRange) && angular.isDefined(selectionStart)) {
                                $timeout(function () {
                                    if ($document[0] && $document[0].activeElement === el[0]) {
                                        el[0].setSelectionRange(selectionStart, selectionStart);
                                    }
                                });
                            }
                        } else if (newValue === null) {
                            el.val(null);

                        }
                    });

                    el.on('keydown', function (event) {
                        if (event.which === 13) {
                            autonumericChange();
                        }
                    });

                    el.on('change paste onpaste', function () {
                        autonumericChange();

                    });

                    // When focusing in textbox, select all.  This is to workaround not having placeholder text for autonumeric.
                    /* istanbul ignore next */
                    /* The test for this code isn't passing on IE 10 on BrowserStack in automated mode.
                        This isn't mission-critical so I'm just ignoring it for now.
                    */
                    el.on('focusin.bbAutonumeric', function () {
                        $timeout(function () {
                            // Check to ensure the field still has focus once the $timeout callback is executed.
                            // https://github.com/blackbaud/skyux/issues/64
                            if (el.is(':focus')) {
                                if (!isIosUserAgent) {
                                    el.select();
                                } else {
                                    //use setSelectionRange instead of select because select in a timeout does not work with iOS
                                    el[0].setSelectionRange(0, 9999);
                                }
                            }
                        });
                    });

                }
            };
        }])
        .filter('bbAutonumeric', ['bbAutonumericConfig', 'bbResources', function (bbAutonumericConfig, bbResources) {
            return function (input, configType, abbreviate) {
                var aSign,
                    dividend,
                    mDec,
                    formatted,
                    settings,
                    suffix,
                    tempEl;

                if (input === null || angular.isUndefined(input)) {
                    return '';
                }

                if (isNaN(input)) {
                    return input;
                }


                tempEl = $('<span></span>');

                settings = getBaseSettings(bbAutonumericConfig, configType);

                if (abbreviate) {
                    if (settings.pSign === 's') {
                        // The suffix needs to go between the number and the currency symbol, so the currency
                        // symbol has to be left off and appended after the number is formatted.
                        aSign = settings.aSign;
                        settings.aSign = '';
                    }

                    input = Math.round(input);

                    if (input >= 1000000000) {
                        dividend = 100000000;
                        suffix = bbResources.autonumeric_abbr_billions;
                    } else if (input >= 1000000) {
                        dividend = 100000;
                        suffix = bbResources.autonumeric_abbr_millions;
                    } else if (input >= 10000) {
                        dividend = 100;
                        suffix = bbResources.autonumeric_abbr_thousands;
                    }

                    if (suffix) {
                        input = Math.floor(input / dividend) / 10;
                        mDec = Math.floor(input) === input ? 0 : 1;
                    } else {
                        mDec = 0;
                    }

                    settings.mDec = mDec;
                }

                tempEl.autoNumeric(settings);
                tempEl.autoNumeric('set', input);

                formatted = tempEl.text();

                if (suffix) {
                    formatted += suffix;
                }

                if (abbreviate && settings.pSign === 's' && aSign) {
                    formatted += aSign;
                }

                return formatted;
            };
        }]);
}(jQuery));
