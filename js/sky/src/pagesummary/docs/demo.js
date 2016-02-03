/* global angular*/

(function () {
    'use strict';

    function PageSummaryTestController() {
        var vm = this;

        vm.name = 'Robert C. Hernandez';

        vm.showAlert = true;
        vm.showImage = true;
        vm.showTitle = true;
        vm.showSubtitle = true;
        vm.showStatus = true;
        vm.showContent = true;
        vm.showKeyInfo = true;
        vm.showActionBar = true;

        vm.actionBarItems = [
            {
                action: function () {},
                actionText: 'Action 1',
                visible: true
            },
            {
                action: function () {},
                actionText: 'Action 2',
                visible: true
            },
            {
                action: function () {},
                actionText: 'Action 3',
                visible: true
            }
        ];

        vm.avatarChange = function (file) {
            if (file) {
                vm.avatarSrc = file;
            }
        };
    }

    angular.module('stache')
        .controller('PageSummaryTestController', PageSummaryTestController);
}());
