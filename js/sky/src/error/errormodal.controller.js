/*global angular */

(function () {
    'use strict';

    function BBErrorModalController($uibModalInstance, options) {
        var vm = this;

        vm.options = options;

        vm.close = function () {
            $uibModalInstance.close();
        };
    }

    BBErrorModalController.$inject = ['$uibModalInstance', 'options'];

    angular.module('sky.errormodal.controller', ['sky.error.directive'])
        .controller('BBErrorModalController', BBErrorModalController);
}());
