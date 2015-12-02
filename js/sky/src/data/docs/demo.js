/* global angular */
(function () {
    'use strict';

    function DataTestController(bbData) {
        var self = this;

        self.getFoo = function () {
            bbData.load(
                {
                    data: '/sampledata/foo.json',
                    resources: '/sampledata/resources.json'
                }
            ).then(function (result) {
                self.result = result;
            });

        };
    }

    DataTestController.$inject = ['bbData'];

    angular.module('stache')
        .controller('DataTestController', DataTestController);
}());
