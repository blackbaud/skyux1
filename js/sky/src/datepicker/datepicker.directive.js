/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbDatepicker(bbResources, bbDatepickerConfig, bbDatepickerParser, $timeout, $q) {
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
                placeholderText: '=?placeholder',
                bbAltInputFormats: '=?'
            },
            templateUrl: 'sky/templates/datepicker/datepicker.directive.html',
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
                    dateChangeInternal = false;

                function open($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.locals.opened = !$scope.locals.opened;
                }

                function setDatepickerInput(newValue) {
                    /*  uib-datepicker does not allow setting model directly
                        to anything but a JavaScript Date. However, we can clear
                        the current model and set the input manually to get the
                        correct value to display */
                    $scope.locals.date = null;
                    $timeout(function () {
                        inputEl.val(newValue);
                    });
                }

                function setDate() {
                    var inputNgModel;
                    if (angular.isDate($scope.date)) {
                        $scope.locals.date = angular.copy($scope.date);
                    } else if (!$scope.locals.hasCustomValidation) {
                        parsedDate = bbDatepickerParser.runModelParsers($scope.date, $scope.format);
                        if (angular.isDate(parsedDate)) {
                            $scope.date = angular.copy(parsedDate);
                            $scope.locals.date = angular.copy(parsedDate);
                        } else {
                            setDatepickerInput($scope.date);

                            inputNgModel = $scope.getInputNgModel();
                            if (inputNgModel && !inputNgModel.$validators.date($scope.date)) {
                                inputNgModel.invalidFormatMessage = bbResources.date_field_invalid_date_message;
                                inputNgModel.$setValidity('dateFormat', false);
                            }
                        }
                    } else {
                        setDatepickerInput($scope.date);
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
                        if (inputNgModel) {
                            deferred[inputNgModel.invalidFormatMessage ? 'reject' : 'resolve']();
                            inputNgModel.$setValidity('dateFormat', !inputNgModel.invalidFormatMessage || inputNgModel.invalidFormatMessage === '');
                        } else {
                            deferred.resolve();
                        }
                    }

                    function setInvalidFormatMessage(errorMessage) {
                        var inputNgModel = $scope.getInputNgModel();
                        /* istanbul ignore else: sanity check */
                        if (inputNgModel) {
                            inputNgModel.invalidFormatMessage = errorMessage;
                        }
                    }

                    function handleCustomFormattingValidation(result) {
                        result = result || {};

                        setInvalidFormatMessage(result.formattingErrorMessage);
                        resolveValidation();

                        if (angular.isDefined(result.formattedValue) && result.formattedValue !== $scope.date) {
                            skipValidation = true;
                            dateChangeInternal = true;
                            $scope.date = angular.copy(result.formattedValue);

                            /* istanbul ignore else: sanity check */
                            if (inputEl) {
                                inputEl.val($scope.date);
                            }

                            if (angular.isDate(result.formattedValue)) {
                                $scope.locals.date = angular.copy(result.formattedValue);
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
                        if (inputNgModel && inputNgModel.$error && inputNgModel.$error.date) {
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
                    inputName: attr.bbDatepickerName,
                    altInputFormats: bbDatepickerConfig.altInputFormats
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

                if (angular.isArray($scope.bbAltInputFormats)) {
                    angular.extend($scope.locals.altInputFormats, $scope.bbAltInputFormats);
                }

                if ($scope.locals.altInputFormats.length < 1) {
                    $scope.locals.altInputFormats = bbDatepickerParser.getAltInputFormats($scope.format);
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
                            $scope.date = angular.copy($scope.locals.date);
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
                                $scope.date = angular.copy($scope.locals.date);
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
    }

    bbDatepicker.$inject = ['bbResources', 'bbDatepickerConfig', 'bbDatepickerParser', '$timeout', '$q'];


    angular.module('sky.datepicker.directive',
        [
            'sky.resources',
            'sky.moment',
            'ui.bootstrap.datepicker',
            'sky.datepicker.customvalidate',
            'sky.datepicker.maxdate',
            'sky.datepicker.mindate',
            'sky.datepicker.parser',
            'sky.datepicker.config'
        ])
        .directive('bbDatepicker', bbDatepicker);

}());
