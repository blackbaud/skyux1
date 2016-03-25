/*jshint browser: true */
/*global angular */

(function () {
    'use strict';
    angular.module('sky.datepicker', ['sky.resources', 'sky.moment', 'ui.bootstrap.datepicker'])
        .constant('bbDatepickerConfig', {
            currentCultureDateFormatString: 'MM/dd/yyyy',
            showWeeks: false,
            startingDay: 0,
            minDate: '',
            maxDate: ''
        })
        .directive('bbDatepicker', ['bbResources', 'bbDatepickerConfig', 'bbDatepickerParser', '$timeout', '$q',
        function (bbResources, bbDatepickerConfig, bbDatepickerParser, $timeout, $q) {
            return {
                replace: true,
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    date: '=ngModel',
                    dateOptions: '=?bbDateOptions',
                    customValidation: '=?bbCustomValidation',
                    format: '=?bbDateFormat',
                    maxDate: '=?maxDate',
                    minDate: '=?minDate',
                    placeholderText: '=?placeholder'
                },
                templateUrl: 'sky/templates/datepicker/datepicker.html',
                controller: ['$scope', function ($scope) {
                    var self = this;

                    $scope.getInputNgModel = function () {
                        /* istanbul ignore else: sanity check */
                        if (angular.isFunction(self.getInputNgModel)) {
                            return self.getInputNgModel();
                        } else {
                            return null;
                        }
                    };
                }],
                link: function ($scope, el, attr, ngModel) {
                    var parsedDate,
                        inputEl,
                        skipValidation = false,
                        dateChangeInternal = false,
                        pickerDateChangeInternal;

                    function open($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.locals.opened = !$scope.locals.opened;
                    }

                    function setDate() {
                        var inputNgModel;
                        if (angular.isDate($scope.date)) {
                            $scope.locals.date = $scope.date;
                        } else {
                            parsedDate = bbDatepickerParser.runParsers($scope.date, $scope.format);
                            if (angular.isDate(parsedDate)) {
                                $scope.date = parsedDate;
                                $scope.locals.date = parsedDate;
                            } else if (!$scope.locals.hasCustomValidation) {
                                $scope.locals.date = $scope.date;
                                pickerDateChangeInternal = true;
                                inputNgModel = $scope.getInputNgModel();
                                if (inputNgModel && !inputNgModel.$validators.date($scope.date)) {
                                    inputNgModel.invalidFormatMessage = bbResources.date_field_invalid_date_message;
                                    inputNgModel.$setValidity('dateFormat', false);
                                }
                            } else {
                                inputEl.val($scope.date);
                            }
                        }
                    }

                    function hasMinMaxError() {
                        var inputNgModel = $scope.getInputNgModel();

                        return inputNgModel && inputNgModel.$error && (inputNgModel.$error.minDate || inputNgModel.$error.maxDate);
                    }

                    function dateFormatValidator() {
                        var customFormattingResult,
                            deferred,
                            inputNgModel;

                        function resolveValidation() {
                            var inputNgModel = $scope.getInputNgModel();
                            /* istanbul ignore else: sanity check */
                            if (inputNgModel !== null) {
                                deferred[inputNgModel.invalidFormatMessage ? 'reject' : 'resolve']();
                                inputNgModel.$setValidity('dateFormat', !inputNgModel.invalidFormatMessage || inputNgModel.invalidFormatMessage === '');
                            } else {
                                deferred.resolve();
                            }
                        }

                        function setInvalidFormatMessage(errorMessage) {
                            var inputNgModel = $scope.getInputNgModel();
                            /* istanbul ignore else: sanity check */
                            if (inputNgModel !== null) {
                                inputNgModel.invalidFormatMessage = errorMessage;
                            }
                        }

                        function handleCustomFormattingValidation(result) {
                            result = result || {};

                            setInvalidFormatMessage(result.formattingErrorMessage);
                            resolveValidation();

                            if (result.formattedValue !== $scope.date) {
                                skipValidation = true;
                                dateChangeInternal = true;
                                $scope.date = result.formattedValue;

                                /* istanbul ignore else: sanity check */
                                if (inputEl) {
                                    inputEl.val($scope.date);
                                }

                                if (angular.isDate(result.formattedValue)) {
                                    $scope.locals.date = result.formattedValue;
                                }
                            }
                        }

                        deferred = $q.defer();

                        if (skipValidation || angular.isDate($scope.date) || $scope.date === '' || hasMinMaxError() || (!$scope.locals.required && $scope.date === null)) {
                            setInvalidFormatMessage(null);
                            resolveValidation();
                        } else if ($scope.locals.hasCustomValidation && angular.isString($scope.date)) {
                            customFormattingResult = $scope.customValidation.formatValue($scope.date);
                            if (customFormattingResult.then) {
                                customFormattingResult.then(handleCustomFormattingValidation);
                            } else {
                                handleCustomFormattingValidation(customFormattingResult);
                                return deferred.promise;
                            }
                        } else {
                            inputNgModel = $scope.getInputNgModel();
                            /* istanbul ignore else: sanity check */
                            if (inputNgModel !== null && inputNgModel.$error && inputNgModel.$error.date) {
                                setInvalidFormatMessage(bbResources.date_field_invalid_date_message);
                            }
                            resolveValidation();
                        }

                        skipValidation = false;
                        return deferred.promise;
                    }

                    ngModel.$options = {
                        allowInvalid: true
                    };

                    $scope.locals = {
                        showButtonBar: false,
                        appendToBody: false,
                        date: '',
                        opened: false,
                        open: open,
                        loaded: false,
                        closeOnSelection: true,
                        dateOptions: {
                            showWeeks: bbDatepickerConfig.showWeeks,
                            startingDay: bbDatepickerConfig.startingDay,
                            maxDate: $scope.maxDate,
                            minDate: $scope.minDate
                        },
                        hasCustomValidation: false,
                        inputName: attr.bbDatepickerName
                    };

                    if (!$scope.maxDate && bbDatepickerConfig.maxDate) {
                        $scope.maxDate = bbDatepickerConfig.maxDate;
                        $scope.locals.dateOptions.maxDate = $scope.maxDate;
                    }

                    if (!$scope.minDate && bbDatepickerConfig.minDate) {
                        $scope.minDate = bbDatepickerConfig.minDate;
                        $scope.locals.dateOptions.minDate = $scope.minDate;
                    }

                    $scope.resources = bbResources;

                    if (angular.isDefined(attr.showButtonBar)) {
                        $scope.locals.showButtonBar = attr.showButtonBar;
                    }

                    if (angular.isDefined(attr.closeOnDateSelection)) {
                        $scope.locals.closeOnSelection = attr.closeOnDateSelection;
                    }

                    if (angular.isDefined(attr.datepickerAppendToBody)) {
                        $scope.locals.appendToBody = (attr.datepickerAppendToBody === 'true');
                    }

                    if (angular.isUndefined($scope.format)) {
                        $scope.format = bbDatepickerConfig.currentCultureDateFormatString;
                    }

                    if (angular.isDefined($scope.dateOptions)) {
                        angular.extend($scope.locals.dateOptions, $scope.dateOptions);

                    }

                    if (angular.isDefined($scope.customValidation)) {
                        if (angular.isFunction($scope.customValidation.formatValue)) {
                            $scope.locals.hasCustomValidation = true;
                        }
                    }

                    $scope.locals.required = angular.isDefined(attr.required);


                    if ($scope.placeholderText === null || angular.isUndefined($scope.placeholderText)) {
                        $scope.placeholderText = $scope.format.toLowerCase();
                    }

                    $timeout(function () {
                        inputEl = el.find('input');
                        setDate();

                        ngModel.$asyncValidators.dateFormat = dateFormatValidator;

                        ngModel.$validate();


                        $scope.$watch('date', function (newValue, oldValue) {
                            if (newValue !== oldValue && !dateChangeInternal) {
                                setDate();
                            } else if (dateChangeInternal) {
                                dateChangeInternal = false;
                            }

                        });

                        function inputChanged() {
                            var inputNgModel = $scope.getInputNgModel();

                            if ((angular.isUndefined($scope.locals.date) || !angular.isDate($scope.locals.date)) && angular.isDefined(inputEl.val()) && inputEl.val() !== '') {
                                if ($scope.date !== inputEl.val()) {
                                    dateChangeInternal = true;
                                    $scope.date = inputEl.val();
                                }

                            } else if ($scope.locals.required && inputEl.val() === '') {
                                if ($scope.date !== '') {
                                    dateChangeInternal = true;
                                    $scope.date = '';
                                }

                                inputNgModel.invalidFormatMessage = null;
                                inputNgModel.$setValidity('dateFormat', true);
                            } else if ($scope.date !== $scope.locals.date) {
                                dateChangeInternal = true;
                                $scope.date = $scope.locals.date;
                            }
                        }

                        /*  Need to handle input change instead of model change
                            because ngModelOptions updateOn blur does not work
                            correctly with the uib-datepicker */
                        inputEl.on('change blur', function () {
                            $timeout(function () {
                                inputChanged();
                            });
                        });

                        $scope.$watch('locals.date', function () {

                            if ($scope.date !== $scope.locals.date) {
                                if (angular.isDate($scope.locals.date)) {
                                    dateChangeInternal = true;
                                    $scope.date = $scope.locals.date;
                                }
                            }

                        });

                        $scope.$watch(function () {
                            return ngModel.$error && ngModel.$error.required;
                        }, function (newValue) {
                            var inputNgModel;
                            if ($scope.locals.required) {
                                inputNgModel = $scope.getInputNgModel();
                                inputNgModel.$setValidity('required', !newValue);
                            }
                        });

                    });

                    function runValidators() {
                        var inputNgModel = $scope.getInputNgModel();
                        /*istanbul ignore else: sanity check */
                        if (inputNgModel) {
                            inputNgModel.$validate();
                        }
                    }

                    $scope.$watch('maxDate', function () {
                        runValidators();
                        $scope.locals.dateOptions.maxDate = $scope.maxDate;
                    });

                    $scope.$watch('minDate', function () {
                        runValidators();
                        $scope.locals.dateOptions.minDate = $scope.minDate;
                    });

                    $scope.locals.loaded = true;

                }
            };
        }])
        .directive('bbDatepickerCustomValidate', ['$filter', 'bbDatepickerParser', function ($filter, bbDatepickerParser) {
            return {
                restrict: 'A',
                require: ['ngModel', '^bbDatepicker'],
                link: function ($scope, el, attr, controllers) {
                    var ngModel = controllers[0],
                        format = attr.uibDatepickerPopup;

                    if (attr.bbDatepickerCustomValidate && attr.bbDatepickerCustomValidate === 'true') {
                        ngModel.$parsers = [];
                        ngModel.$validators.date = function () {
                            return true;
                        };
                    } else {
                        ngModel.$parsers.unshift(function (viewValue) {
                            var newDate = ngModel.$viewValue,
                                date = null;
                            //date was changed from datepicker or is empty so just return
                            if (typeof newDate === 'object' || newDate === '') {
                                return newDate;
                            }

                            date = bbDatepickerParser.runParsers(newDate, format);

                            if (angular.isDate(date)) {
                                el.val($filter('date')(date, format));
                            }

                            return date ? date : viewValue;
                        });
                    }

                    controllers[1].getInputNgModel = function () {
                        return ngModel;
                    };
                }
            };
        }])
    .directive('bbMinDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.minDate = function (modelValue) {
                    return !$scope.minDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.minDate) || modelValue >= $scope.minDate;
                };
            }
        };
    })
    .directive('bbMaxDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.maxDate = function (modelValue) {
                    return !$scope.maxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.maxDate) || modelValue <= $scope.maxDate;
                };
            }
        };
    })
    .factory('bbDatepickerParser', ['bbMoment', function (bbMoment) {

        function parseUTCString(value) {
            var date = null,
                dateArray,
                datePart;

            if (angular.isString(value) && value.indexOf('T00:00:00') !== -1) {
                datePart = value.split('T')[0];

                dateArray = datePart.split('-');
                date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            }
            return date;
        }

        function parseNoSeparatorDateString(value, format) {
            var date = null,
                yearBegin = format.indexOf('y'),
                monthBegin = format.indexOf('M'),
                dayBegin = format.indexOf('d'),
                yearIndex,
                monthIndex,
                dayIndex;
            if (angular.isString(value) && value.length === 8 && !isNaN(value)) {
                if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                    yearIndex = 4;
                    if (monthBegin < dayBegin) {
                        dayIndex = 2;
                        monthIndex = 0;
                    } else {
                        dayIndex = 0;
                        monthIndex = 2;
                    }
                } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                    yearIndex = 0;
                    monthIndex = 4;
                    dayIndex = 6;
                } else {
                    return null;
                }

                date = new Date(value.substr(yearIndex, 4), (value.substr(monthIndex, 2) - 1), value.substr(dayIndex, 2));
            }
            return date;
        }

        function matchSeparator(value) {
            return value.match(/[.\/\-\s].*?/);
        }

        function dateHasSeparator(value) {
            /*
            * Validation criteria:
            * A separator exists
            * There is no separator at the beginning
            * There is no separator at the end
            * Two separators exist
            * All parts of the date have a non-zero value
            */

            var separator = matchSeparator(value),
                valueArray = value.split(separator),
                separatorAtEnd = value.indexOf(separator, value.length - 1) !== -1,
                separatorAtBeginning = value.indexOf(separator) === 0,
                hasTwoSeparators = valueArray.length - 1 === 2,
                anyPartIsZero = valueArray.some(function (e) {
                    return Number(e) === 0;
                });

            return (separator && !separatorAtEnd && !separatorAtBeginning && hasTwoSeparators && !anyPartIsZero);
        }

        function isMomentParsable(value, format) {
            var yearParts,
                yearIndex,
                monthIndex,
                dayIndex,
                separator;

            if (angular.isString(value) && dateHasSeparator(value)) {

                if (value.length === 10) {
                    return true;
                } else if (value.length === 9 || value.length === 8) {
                    //insure that years have 4 characters
                    separator = matchSeparator(value);
                    yearParts = value.split(separator);
                    yearIndex = format.indexOf('y');
                    monthIndex = format.indexOf('M');
                    dayIndex = format.indexOf('d');
                    if (yearIndex > monthIndex && yearIndex > dayIndex) {
                        return yearParts[2].length === 4;
                    }

                    if (yearIndex < monthIndex && yearIndex < dayIndex) {
                        return yearParts[0].length === 4;
                    }

                }

            }

            return false;
        }

        function parseMoment(value, format) {
            var date = null,
                momentDate;

            if (isMomentParsable(value, format)) {
                momentDate = bbMoment(value, format.toUpperCase());
                if (momentDate.isValid()) {
                    date = momentDate.toDate();
                }
            }

            return date;
        }

        return {
            parseUTCString: parseUTCString,
            parseNoSeparatorDateString: parseNoSeparatorDateString,
            parseMoment: parseMoment,
            runParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseMoment(value, format);

                return date;
            }
        };
    }]);
}());
