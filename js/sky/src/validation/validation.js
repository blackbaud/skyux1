/*global angular */

/** @module Email Validation
@icon check
@summary The email validation directive allows you to validate email strings in input fields.
 @description The email validation provides the ability to validate email strings in input fields.

### Email Validation Settings ###

- `ng-model` An object to bind the email value to on the input.
- `type=email` indicates that email validation can be used.
 */

(function () {
    'use strict';
    angular.module('sky.validation', [])
        .directive('bbEmailValidation', [function () {
            var EMAIL_REGEXP = /[\w\-]+@([\w\-]+\.)+[\w\-]+/;
            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    /*jslint unparam: true */
                    if (ctrl && ctrl.$validators.email) {
                        ctrl.$validators.email = function (modelValue) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        };
                    }
                }
            };
        }]);
}());
