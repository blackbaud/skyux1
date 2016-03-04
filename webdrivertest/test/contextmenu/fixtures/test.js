/*global angular */

(function () {
    'use strict';

    function ContextMenuTestController() {
        var self = this;

        self.items = [
            {
                text: 'Item 1'
            },
            {
                text: 'Item 2'
            },
            {
                text: 'Item 3'
            }

        ];
    }


    angular.module('screenshots', ['sky'])
    .controller('ContextMenuTestController', ContextMenuTestController);
}());
