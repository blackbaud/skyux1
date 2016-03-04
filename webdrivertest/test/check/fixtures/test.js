/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .controller('CheckTestController',
        ['$scope', function ($scope) {
            var checkBoxItems,
                radioItems;

            checkBoxItems = [
                { description: 'Checkbox 1', checked: false, disabled: false },
                { description: 'Checkbox 2', checked: true, disabled: false },
                { description: 'Disabled', checked: false, disabled: true },
                { description: 'Disabled and checked', checked: true, disabled: true }
            ];

            radioItems = [
                { id: 1, description: 'Option 1', disabled: false },
                { id: 2, description: 'Option 2', disabled: false },
                { id: 3, description: 'Option 3', disabled: false },
                { id: 4, description: 'Disabled', disabled: true }
            ];
            $scope.locals = {
                checkBoxItems: checkBoxItems,
                radioItems: radioItems,
                selectedRadioItem: radioItems[1].id
            };
        }]);
}());