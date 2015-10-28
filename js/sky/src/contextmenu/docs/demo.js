/* global angular */

(function () {
    'use strict';

    function ContextMenuTestController() {
        var self = this;

        self.items = [
            {
                onClick: function () {
                    self.lastAction = 'Item 1';
                },
                text: 'Item 1'
            },
            {
                onClick: function () {
                    self.lastAction = 'Item 2';
                },
                text: 'Item 2'
            },
            {
                onClick: function () {
                    self.lastAction = 'Item 3';
                },
                text: 'Item 3'
            }

        ];

        self.doAction = function (item) {
            self.lastAction = item;
        };

        self.isOpen = false;

        self.openDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            self.isOpen = true;
        };

    }
    angular.module('stache')
        .controller('ContextMenuTestController', ContextMenuTestController);

}());
