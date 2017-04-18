/* global angular */

(function () {
    'use strict';

    angular.module('sky.sectionedform')
        .directive('bbSectionedModal', function () {
            return {
                link: function (scope, el) {
                    el.addClass('bb-sectionedmodal');
                },
                restrict: 'A'
            };
        });
}());