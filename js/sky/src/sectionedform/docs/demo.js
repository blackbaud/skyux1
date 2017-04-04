/*global angular */
(function () {
    'use strict';

    function SectionedModalTestPageController(bbModal) {
        var self = this;

        self.openForm = function () {
            bbModal.open({
                templateUrl: 'demo/sectionedform/contactsectionedform.html'
            });
        };
    }

    function ContactSectionedFormController($scope, ContactSectionedFormService) {
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

        //Open to addresses section
        self.activeSectionIndex = 1;

        // Simulate requesting a value from within a section
        self.save = function () {
            alert('Name = ' + ContactSectionedFormService.basicInfo.name);
            // Could also navigate form controllers, if using
            // alert('Name = ' + $scope.contactForm.basicInfoForm.name.$modelValue);
        }

        self.sectionsVisibilityChanged = function (data) {
            self.sectionsHidden = !data.visible;
        }

        self.showSections = function () {
            $scope.$broadcast('reinitializeSectionDisplay');
        };

        // Simulate pre-populating a field within a section
        ContactSectionedFormService.basicInfo = {
            id: '5324901'
        };
    }

    function BasicInfoSectionController(ContactSectionedFormService) {
        var self = this;
        self.fields = ContactSectionedFormService.basicInfo;
    }

    SectionedModalTestPageController.$inject = ['bbModal'];
    ContactSectionedFormController.$inject = ['$scope', 'ContactSectionedFormService'];
    BasicInfoSectionController.$inject = ['ContactSectionedFormService'];

    angular.module('stache')
        .controller('SectionedModalTestPageController', SectionedModalTestPageController)
        .controller('ContactSectionedFormController', ContactSectionedFormController)
        .service('ContactSectionedFormService', function () {})
        .controller('BasicInfoSectionController', BasicInfoSectionController);
}());