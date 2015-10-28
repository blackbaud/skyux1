/*global angular */

(function () {
    'use strict';

    function CheckTestController() {
        var self = this;

        self.checkBoxItems = [
            { description: 'Checkbox 1', checked: false, disabled: false },
            { description: 'Checkbox 2', checked: true, disabled: false },
            { description: 'Disabled', checked: false, disabled: true },
            { description: 'Disabled and checked', checked: true, disabled: true }
        ];

        self.radioItems = [
            { id: 1, description: 'Option 1', disabled: false },
            { id: 2, description: 'Option 2', disabled: false },
            { id: 3, description: 'Option 3', disabled: false },
            { id: 4, description: 'Disabled', disabled: true }
        ];

        self.selectedRadioItem = self.radioItems[1].id;
    }

    angular.module('stache')
        .controller('CheckTestController', CheckTestController);
}());
