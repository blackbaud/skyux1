/*global angular */

/** @module Moment
@icon clock-o
@summary The moment module use the moment.js library to parse, validate, manipulate, or display dates.
@description The moment module allows you to use the [moment](http://momentjs.com/) library.
*/

(function () {
    'use strict';

    function bbMoment($window) {
        /*istanbul ignore next boilerplate require gunk */
        if (typeof $window.define === 'function' && $window.define.amd) {
            return $window.define(['moment']);
        } else if ($window.module !== undefined && $window.module && $window.module.exports) {
            return $window.require('moment');
        } else {
            return $window.moment;
        }
    }

    bbMoment.$inject = ['$window'];

    angular.module('sky.moment', [])
        .factory('bbMoment', bbMoment);

}());
