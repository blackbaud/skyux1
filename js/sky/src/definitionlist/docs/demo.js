/*global angular */

(function () {
    'use strict';

    function DefinitionListController() {
        var personalInfo = [
            {
                label: 'Job title',
                value: 'Engineer'
            },
            {
                label: 'Hobby',
                value: 'Volleyball'
            },
            {
                label: 'Experience',
                value: '3 years'
            }
        ],
        systemInfo = [
            {
                label: 'Username',
                value: 'user1'
            },
            {
                label: 'Role',
                value: 'Admin'
            },
            {
                label: 'Last log-in time'
            }
        ],
        self = this;

        self.personalInfo = personalInfo;
        self.systemInfo = systemInfo;
    }

    angular.module('stache')
        .controller('DefinitionListTestController', DefinitionListController);
}());