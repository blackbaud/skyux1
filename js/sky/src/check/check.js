/*jshint browser: true */

/*global angular */

/** @module Check
@icon check-square
@summary The check applies a commonly styled selector to a checkbox or radio button.
 @description The check directive allows you to change an input element of type checkbox or radio into a commonly-styled selector.  The value that is selected is driven through the `ng-model` attribute specified on the input element and for radio input types the value to set on the `ng-model` can be specified by the value attribute.

---

 */

(function () {
    'use strict';
    angular.module('sky.check', [])
        .directive('bbCheck', [function () {
            return {
                link: function (scope, el, attr) {
                    var labelEl = el.parent('label'),
                        typeClass;

                    if (labelEl.length < 1) {
                        el.wrap('<label class="bb-check-wrapper"></label>');
                    } else {
                        labelEl.addClass('bb-check-wrapper');
                    }
                    if (attr.type === 'radio') {
                        typeClass = 'bb-check-radio';
                    } else {
                        typeClass = 'bb-check-checkbox';
                    }
                    el.after('<span class="' + typeClass + '"></span>');

                }
            };
        }]);
}());
