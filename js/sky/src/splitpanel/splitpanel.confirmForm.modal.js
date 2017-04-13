/* global angular */
(function () {
    'use strict';

    function ListbuilderModalController($uibModalInstance, body) {
        var self = this;
        self.body = body;
        self.$uibModalInstance = $uibModalInstance;
    }

    ListbuilderModalController.$inject = ['$uibModalInstance', 'body'];

    angular
    .module('sky.splitpanel')
    .controller('ListbuilderModalController', ListbuilderModalController);
}());
