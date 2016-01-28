/* global angular*/

(function () {
    'use strict';

    function ProfilePhotoTestController() {
        var vm = this;
        
        vm.profilePhotoChange = function (file) {
            if (file) {
                vm.profilePhotoSrc = file;
            }
        };
    }

    angular.module('stache')
        .controller('ProfilePhotoTestController', ProfilePhotoTestController);
}());
