/*global angular */

/** @module Email Validation
@icon check
@summary The email validation directive validates email address strings in input fields.
 @description The email validation directive validates email address strings in input fields.

### Email Validation Settings ###

- `ng-model` &mdash; Specifies an object to bind the email value to on the input.
- `type=email` &mdash; Indicates that email validation can be used.
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
