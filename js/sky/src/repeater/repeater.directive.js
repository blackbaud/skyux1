/*global angular */

(function () {
    'use strict';

    function bbRepeater() {
        function link() {

        }

        return {
            scope: {},
            bindToController: {
                bbRepeaterExpandMode: '@?'
            },
            controller: 'BBRepeaterController',
            controllerAs: 'bbRepeater',
            link: link,
            templateUrl: 'sky/templates/repeater/repeater.directive.html',
            transclude: true
        };
    }

    angular.module('sky.repeater.directive', ['sky.repeater.controller'])
        .directive('bbRepeater', bbRepeater);
}());
