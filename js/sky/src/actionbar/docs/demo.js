/*global angular */

(function () {
    'use strict';

    function ActionButtonBarTestController() {
        var self = this;

        self.items = [
            {
                action: function () {
                    self.lastAction = 'Action 1';
                },
                actionText: 'Action 1',
                visible: true
            },
            {
                action: function () {
                    self.lastAction = 'Action 2';
                },
                actionText: 'Action 2',
                visible: false
            },
            {
                action: function () {
                    self.lastAction = 'Action 3';
                },
                actionText: 'Action 3',
                visible: true
            }
        ];

        self.addItem = function () {
            self.items.push({
                action: function () {
                    self.lastAction = 'New Action';
                },
                actionText: 'New Action',
                visible: true
            });
        };

        self.rightAction1 = function () {
            self.lastAction = 'Right Action 1';
        };

        self.rightAction2 = function () {
            self.lastAction = 'Right Action 2';
        };

        self.subAction1 = function () {
            self.lastAction = 'Sub Action 1';
        };

        self.subAction2 = function () {
            self.lastAction = 'Sub Action 2';
        };

        self.dropdownText = 'More actions';

        self.collapsedText = 'My actions';
    }

    angular.module('stache')
        .controller('ActionButtonBarTestController', ActionButtonBarTestController);
}());
