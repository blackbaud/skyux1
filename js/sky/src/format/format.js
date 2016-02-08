/*global angular */

(function () {
    'use strict';
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    function replaceTag(tag) {
        return tagsToReplace[tag];
    }

    function isEmpty(str) {
        return str === null || angular.isUndefined(str);
    }

    angular.module('sky.format', [])
        .factory('bbFormat', function () {
            return {
                formatText: function (format) {
                    var args;

                    if (isEmpty(format)) {
                        return '';
                    }

                    args = arguments;

                    return String(format).replace(/\{(\d+)\}/g, function (match, capture) {
                        /*jslint unparam: true */
                        return args[parseInt(capture, 10) + 1];
                    });
                },
                escape: function (str) {
                    if (isEmpty(str)) {
                        return '';
                    }

                    return String(str).replace(/[&<>]/g, replaceTag);
                }
            };
        });
}());
