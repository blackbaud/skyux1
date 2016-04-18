/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function BBDatepickerController() {
        var vm = this;

        function open($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.pickerOpened = !vm.pickerOpened;
        }

        vm.open = open;

    }


    function bbDatepicker(bbResources, bbDatepickerConfig, bbDatepickerParser, $timeout, $q, $log) {

        function link($scope, el, attr, ctrls) {
            var parsedDate,
                inputEl,
                skipValidation = false,
                dateChangeInternal = false,
                ngModel = ctrls[0],
                vm = ctrls[1];


            function setDatepickerInput(newValue) {
                /*  uib-datepicker does not allow setting model directly
                    to anything but a JavaScript Date. However, we can clear
                    the current model and set the input manually to get the
                    correct value to display */
                vm.pickerDate = null;
                $timeout(function () {
                    inputEl.val(newValue);
                });
            }

            function setDate() {
                var inputNgModel;
                if (angular.isDate(vm.date)) {
                    vm.pickerDate = angular.copy(vm.date);
                } else if (!vm.hasCustomValidation) {
                    parsedDate = bbDatepickerParser.runModelParsers(vm.date, vm.format);
                    if (angular.isDate(parsedDate)) {
                        vm.date = angular.copy(parsedDate);
                        vm.pickerDate = angular.copy(parsedDate);
                    } else {
                        setDatepickerInput(vm.date);

                        inputNgModel = vm.getInputNgModel();
                        if (inputNgModel && !inputNgModel.$validators.date(vm.date)) {
                            inputNgModel.invalidFormatMessage = bbResources.date_field_invalid_date_message;
                            inputNgModel.$setValidity('dateFormat', false);
                        }
                    }
                } else {
                    setDatepickerInput(vm.date);
                }
            }

            function hasMinMaxError() {
                var inputNgModel = vm.getInputNgModel();

                return inputNgModel && inputNgModel.$error && (inputNgModel.$error.minDate || inputNgModel.$error.maxDate);
            }

            function dateFormatValidator(modelValue) {
                var customFormattingResult,
                    deferred,
                    inputNgModel;

                function resolveValidation() {
                    var inputNgModel = vm.getInputNgModel();
                    /* istanbul ignore else: sanity check */
                    if (inputNgModel) {
                        deferred[inputNgModel.invalidFormatMessage ? 'reject' : 'resolve']();
                        inputNgModel.$setValidity('dateFormat', !inputNgModel.invalidFormatMessage || inputNgModel.invalidFormatMessage === '');
                    } else {
                        deferred.resolve();
                    }
                }

                function setInvalidFormatMessage(errorMessage) {
                    var inputNgModel = vm.getInputNgModel();
                    /* istanbul ignore else: sanity check */
                    if (inputNgModel) {
                        inputNgModel.invalidFormatMessage = errorMessage;
                    }
                }

                function handleCustomFormattingValidation(result) {
                    result = result || {};

                    setInvalidFormatMessage(result.formattingErrorMessage);
                    resolveValidation();

                    if (angular.isDefined(result.formattedValue) && result.formattedValue !== vm.date) {
                        skipValidation = true;
                        dateChangeInternal = true;
                        vm.date = angular.copy(result.formattedValue);

                        /* istanbul ignore else: sanity check */
                        if (inputEl) {
                            inputEl.val(vm.date);
                        }
                        if (angular.isDate(result.formattedValue)) {
                            vm.pickerDate = angular.copy(result.formattedValue);
                        }
                    }
                }


                deferred = $q.defer();

                if (skipValidation || angular.isDate(modelValue) || modelValue === '' || hasMinMaxError() || (!vm.required && modelValue === null)) {
                    setInvalidFormatMessage(null);
                    resolveValidation();
                } else if (vm.hasCustomValidation && angular.isString(modelValue)) {
                    customFormattingResult = vm.customValidation.formatValue(modelValue);
                    if (customFormattingResult.then) {
                        customFormattingResult.then(handleCustomFormattingValidation);
                    } else {
                        handleCustomFormattingValidation(customFormattingResult);
                        return deferred.promise;
                    }
                } else {
                    inputNgModel = vm.getInputNgModel();
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

            if (vm.maxDate) {
                $log.warn('bbDatepicker maxDate attribute is deprecated, use bbMaxDate instead');
                vm.bbMaxDate = vm.maxDate;
            }

            if (vm.minDate) {
                $log.warn('bbDatepicker minDate attribute is deprecated, use bbMinDate instead');
                vm.bbMinDate = vm.minDate;
            }

            vm.showButtonBar = false;
            vm.appendToBody = false;
            vm.pickerDate = '';
            vm.pickerOpened = false;
            vm.loaded = false;
            vm.closeOnSelection = true;
            vm.pickerOptions = {
                showWeeks: bbDatepickerConfig.showWeeks,
                startingDay: bbDatepickerConfig.startingDay,
                maxDate: vm.bbMaxDate,
                minDate: vm.bbMinDate
            };

            vm.hasCustomValidation = false;
            vm.inputName = attr.bbDatepickerName;
            vm.altInputFormats = angular.copy(bbDatepickerConfig.bbAltInputFormats);

            if (!vm.bbMaxDate && bbDatepickerConfig.maxDate) {
                vm.bbMaxDate = angular.copy(bbDatepickerConfig.maxDate);
                vm.pickerOptions.maxDate = vm.bbMaxDate;
                vm.maxDate = vm.bbMaxDate;
            }

            if (!vm.bbMinDate && bbDatepickerConfig.minDate) {
                vm.bbMinDate = angular.copy(bbDatepickerConfig.minDate);
                vm.pickerOptions.minDate = vm.bbMinDate;
                vm.minDate = vm.bbMinDate;
            }

            vm.resources = bbResources;

            if (angular.isDefined(attr.showButtonBar)) {
                vm.showButtonBar = attr.showButtonBar;
            }

            if (angular.isDefined(attr.closeOnDateSelection)) {
                vm.closeOnSelection = attr.closeOnDateSelection;
            }

            if (angular.isDefined(attr.datepickerAppendToBody)) {
                vm.appendToBody = (attr.datepickerAppendToBody === 'true');
            }

            if (angular.isUndefined(vm.format)) {
                vm.format = bbDatepickerConfig.currentCultureDateFormatString;
            }

            if (angular.isArray(vm.bbAltInputFormats)) {
                angular.extend(vm.altInputFormats, vm.bbAltInputFormats);
            }

            if (vm.altInputFormats.length < 1) {
                vm.altInputFormats = bbDatepickerParser.getAltInputFormats(vm.format);
            }

            if (angular.isDefined(vm.bbDateOptions)) {
                angular.extend(vm.pickerOptions, vm.bbDateOptions);

            }

            if (angular.isDefined(vm.customValidation)) {
                if (angular.isFunction(vm.customValidation.formatValue)) {
                    vm.hasCustomValidation = true;
                }
            }

            vm.required = angular.isDefined(attr.required);

            vm.bbPlaceholder = vm.placeholderText;

            if (vm.bbPlaceholder === null || angular.isUndefined(vm.bbPlaceholder)) {
                vm.bbPlaceholder = vm.format.toLowerCase();
            }

            $timeout(function () {
                inputEl = el.find('input');
                setDate();

                ngModel.$asyncValidators.dateFormat = dateFormatValidator;
                ngModel.$validate();

                $scope.$watch(
                    function () {
                        return vm.date;
                    },
                    function (newValue, oldValue) {
                        if (newValue !== oldValue && !dateChangeInternal) {
                            setDate();
                        } else if (dateChangeInternal) {
                            dateChangeInternal = false;
                        }
                    }
                );

                function inputChanged() {
                    var inputNgModel = vm.getInputNgModel();
                    /*istanbul ignore else: sanity check */
                    if ((angular.isUndefined(vm.pickerDate) || !angular.isDate(vm.pickerDate)) && angular.isDefined(inputEl.val()) && inputEl.val() !== '') {
                        if (vm.date !== inputEl.val()) {
                            dateChangeInternal = true;
                            vm.date = inputEl.val();
                        }
                    } else if (vm.required && inputEl.val() === '') {
                        if (vm.date !== '') {
                            dateChangeInternal = true;
                            vm.date = '';
                        }

                        inputNgModel.invalidFormatMessage = null;
                        inputNgModel.$setValidity('dateFormat', true);

                    } else if (vm.date !== vm.pickerDate) {
                        dateChangeInternal = true;
                        vm.date = angular.copy(vm.pickerDate);
                    }
                }

                function enterPress($event) {
                    if ($event.keyCode === 13) {
                        inputChanged();
                    }
                }

                vm.enterPress = enterPress;

                /*  Need to handle input change instead of model change
                    because ngModelOptions updateOn blur does not work
                    correctly with the uib-datepicker */
                inputEl.on('change blur', function () {
                    $timeout(function () {
                        inputChanged();
                    });
                });

                $scope.$watch(
                    function () {
                        return vm.pickerDate;
                    },
                    function () {
                        if (vm.date !== vm.pickerDate) {
                            if (angular.isDate(vm.pickerDate)) {
                                dateChangeInternal = true;
                                vm.date = angular.copy(vm.pickerDate);
                            }
                        }
                    }
                );

                $scope.$watch(function () {
                    return ngModel.$error && ngModel.$error.required;
                }, function (newValue) {
                    var inputNgModel;
                    if (vm.required) {
                        inputNgModel = vm.getInputNgModel();
                        inputNgModel.$setValidity('required', !newValue);
                    }
                });

            });

            function runValidators() {
                var inputNgModel = vm.getInputNgModel();
                /*istanbul ignore else: sanity check */
                if (inputNgModel) {
                    inputNgModel.$validate();
                }
            }

            $scope.$watch(
                function () {
                    if (angular.isDefined(attr.maxDate)) {
                        vm.bbMaxDate = vm.maxDate;
                    }
                    return vm.bbMaxDate;
                },
                function (newValue) {
                    runValidators();
                    vm.pickerOptions.maxDate = newValue;
                }
            );

            $scope.$watch(
                function () {
                    if (angular.isDefined(attr.minDate)) {
                        vm.bbMinDate = vm.minDate;
                    }
                    return vm.bbMinDate;
                },
                function (newValue) {
                    runValidators();
                    vm.pickerOptions.minDate = newValue;
                }
            );

            vm.loaded = true;
        }

        return {
            replace: true,
            restrict: 'E',
            controller: BBDatepickerController,
            controllerAs: 'bbDatepicker',
            bindToController: {
                date: '=ngModel',
                bbDateOptions: '=?',
                customValidation: '=?bbCustomValidation',
                format: '=?bbDateFormat',
                bbMaxDate: '=?bbDatepickerMax',
                bbMinDate: '=?bbDatepickerMin',
                bbAltInputFormats: '=?',
                bbPlaceholder: '=?bbDatepickerPlaceholder',
                maxDate: '=?maxDate', //deprecated
                minDate: '=?minDate', //deprecated
                placeholderText: '=?placeholder' //deprecated

            },
            require: ['ngModel', 'bbDatepicker'],
            scope: {},
            templateUrl: 'sky/templates/datepicker/datepicker.directive.html',
            link: link

        };
    }

    bbDatepicker.$inject = ['bbResources', 'bbDatepickerConfig', 'bbDatepickerParser', '$timeout', '$q', '$log'];


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
