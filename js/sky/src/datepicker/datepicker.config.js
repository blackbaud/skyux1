/*global angular */
(function () {
    'use strict';

    var bbDatepickerConfig = {
        currentCultureDateFormatString: 'MM/dd/yyyy',
        showWeeks: false,
        startingDay: 0,
        minDate: '',
        maxDate: '',
        altInputFormats: []
    };

    angular.module('sky.datepicker.config', [])
        .constant('bbDatepickerConfig', bbDatepickerConfig);
}());
