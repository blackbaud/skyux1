/*jshint browser: true */

/*global angular */

/** @module Check
@icon check-square
@summary The check applies a commonly styled selector to a checkbox or radio button.
 @description The check directive allows you to change an input element of type checkbox or radio button into a commonly-styled selector. The value that is selected is driven through the `ng-model` attribute specified on the input element. For radio button input types, the value to set on the `ng-model` can be specified by the value attribute.
 
 The `bb-check` directive applies SKY UX styles ot checkboxes and radio buttons.

---

 */

(function () {
    'use strict';
    angular.module('sky.check', [])
        .directive('bbCheck', ['$templateCache', function ($templateCache) {
            function createEl(name) {
                return angular.element($templateCache.get('sky/templates/check/' + name + '.html'));
            }

            return {
                link: function (scope, el, attr) {
                    var labelEl = el.parent('label'),
                        styledEl,
                        typeClass;

                    if (labelEl.length < 1) {
                        el.wrap(createEl('wrapper'));
                    } else {
                        labelEl.addClass('bb-check-wrapper');
                    }
                    if (attr.type === 'radio') {
                        typeClass = 'bb-check-radio';
                    } else {
                        typeClass = 'bb-check-checkbox';
                    }

                    styledEl = createEl('styled');
                    styledEl.addClass(typeClass);

                    el.after(styledEl);
                }
            };
        }]);
}());
