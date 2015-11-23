/*global angular, define, require */

/** @module Moment
@icon clock-o
@summary The moment module use the moment.js library to parse, validate, manipulate, or display dates.
@description The moment module allows you to use the [moment](http://momentjs.com/) library.
*/

(function () {
    'use strict';

    function bbMoment($window) {
        return $window.moment;
    }

    bbMoment.$inject = ['$window'];

    /*istanbul ignore next boilerplate require gunk */
    function runRegisterMoment($window) {

        function registerMoment(moment) {
            $window.moment = moment;
        }

        if (angular.isUndefined($window.moment) && typeof define === 'function' && define.amd) {
            require(['moment'], registerMoment);
        }
    }

    runRegisterMoment.$inject = ['$window'];

    angular.module('sky.moment', [])
        .run(runRegisterMoment)
        .factory('bbMoment', bbMoment);

}());
