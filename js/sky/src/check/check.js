/*jshint browser: true */
/*global angular */

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
