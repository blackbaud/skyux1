/*global angular */

(function () {
    'use strict';

    function SectionedFormTestController($scope) {
        var vm = this;

        vm.sections = [
            {
                formName: 'section1Form',
                heading: 'Section1',
                templateUrl: 'demo/sectionedform/section1.html'
            },
            {
                heading: 'Section2',
                itemCount: 2,
                templateUrl: 'demo/sectionedform/section2.html'
            }
        ];

        vm.showMobile = function () {
            $scope.$broadcast('reinitializeSectionDisplay');
        };
    }

    SectionedFormTestController.$inject = ['$scope'];

    angular.module('screenshots', ['sky'])
        .controller('SectionedFormTestController', SectionedFormTestController);
}());