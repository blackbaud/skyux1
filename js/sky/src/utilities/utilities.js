/*global angular */

/** @module Utilities
@icon gear
@summary The utilities module provides methods to encode URI components and format arguments.
@description The Sky UX utilities module gives you the following angular filters:

  - `encodeURIComponent` Uses the $window.encodeURIComponent function on your string.
  - `format` Formats the args with a given format string.

*/

(function () {
    'use strict';

    angular.module('sky.utilities', ['sky.format'])
        .filter('encodeURIComponent', ['$window', function ($window) {
            return function (value) {
                return $window.encodeURIComponent(value);
            };
        }])
        .filter('format', ['bbFormat', function (bbFormat) {
            return function () {
                return bbFormat.formatText.apply(this, arguments);
            };
        }]);
}());
