/*global angular */

(function () {
    'use strict';

    function BBChevronController(bbResources) {
        var vm = this;

        function getDirection() {
            return vm.bbChevronDirection || 'up';
        }

        vm.getCls = function () {
            return 'bb-chevron-flip-' + getDirection();
        };

        vm.getLabel = function () {
            return bbResources['chevron_' + (getDirection() === 'up' ? 'collapse' : 'expand')];
        };

        vm.click = function ($event) {
            $event.stopPropagation();

            vm.bbChevronDirection = (getDirection() === 'up' ? 'down' : 'up');
        };
    }

    BBChevronController.$inject = ['bbResources'];

    angular.module('sky.chevron.controller', ['sky.resources'])
        .controller('BBChevronController', BBChevronController);
}());
