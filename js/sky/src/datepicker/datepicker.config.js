/*global angular */
(function () {
    'use strict';

    var bbDatepickerConfig = {
        currentCultureDateFormatString: 'MM/dd/yyyy',
        showWeeks: false,
        startingDay: 0,
        bbMinDate: '',
        bbMaxDate: '',
        minDate: '', //deprecated
        maxDate: '', //deprecated
        bbAltInputFormats: []
    };

    angular.module('sky.datepicker.config', [])
        .constant('bbDatepickerConfig', bbDatepickerConfig);
}());
