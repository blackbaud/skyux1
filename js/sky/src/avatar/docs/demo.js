/* global angular*/

(function () {
    'use strict';

    function AvatarTestController() {
        var vm = this;

        vm.name = 'Robert C. Hernandez';

        vm.avatarChange = function (file) {
            // This is where you might upload the new avatar, but for this
            // demo we'll just update it locally.
            if (file) {
                vm.avatarSrc = file;
            }
        };
    }

    angular.module('stache')
        .controller('AvatarTestController', AvatarTestController);
}());
