/*global angular */
(function () {
    'use strict';

    function SectionedModalTestPageController(bbModal) {
        var self = this;

        self.openForm = function () {
            bbModal.open({
                templateUrl: 'demo/sectionedform/tabsectionedformmodal.html'
            });
        };
    }

    function TabSectionedModalTestController($scope) {
        var self = this;

        self.sections = [
            {
                formName: 'basicInfoForm',
                heading: 'Basic information',
                templateUrl: 'demo/sectionedform/basicinfo.html'
            },
            {
                heading: 'Addresses',
                itemCount: 2,
                templateUrl: 'demo/sectionedform/addresses.html'
            },
            {
                heading: 'Phone numbers',
                itemCount: 3,
                templateUrl: 'demo/sectionedform/phonenumbers.html'
            }
        ];

        self.sectionsVisibilityChanged = function (data) {
            self.sectionsHidden = !data.visible;
        }

        self.showSections = function () {
            $scope.$broadcast('reinitializeSectionDisplay');
        };
    }

    SectionedModalTestPageController.$inject = ['bbModal'];

    angular.module('stache')
        .controller('SectionedModalTestPageController', SectionedModalTestPageController)
        .controller('TabSectionedModalTestController', TabSectionedModalTestController);
}());