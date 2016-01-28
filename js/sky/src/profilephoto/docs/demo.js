/* global angular*/

(function () {
    'use strict';

    function ProfilePhotoTestController() {
        var vm = this;

        vm.name = 'Robert C. Hernandez';

        vm.profilePhotoChange = function (file) {
            // This is where you might upload the new profile photo, but for this
            // demo we'll just update it locally.
            if (file) {
                vm.profilePhotoSrc = file;
            }
        };
    }

    angular.module('stache')
        .controller('ProfilePhotoTestController', ProfilePhotoTestController);
}());
