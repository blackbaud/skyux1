/* global angular*/

(function () {
    'use strict';

    function PageSummaryTestController() {
        var vm = this;

        vm.photoUrl = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y&s=300';

        vm.showAlert = true;
        vm.showPhoto = true;
        vm.showTitle = true;
        vm.showSubtitle = true;
        vm.showStatus = true;
        vm.showContent = true;
        vm.showKeyInfo = true;
    }

    angular.module('stache')
        .controller('PageSummaryTestController', PageSummaryTestController);
}());
