/*global angular */
(function () {
    'use strict';

    function SectionModalPageTestController(bbModal) {
        var self = this;

        self.openForm = function () {
            bbModal.open({
                templateUrl: 'demo/sectionmodal/tabsectionmodalform.html'
            });
        };
    }

    function TabSectionModalTestController(bbSectionValidator) {
        var self = this;

        self.sections = [
            {
				hasRequiredField: true,
                heading: 'Basic information',
                templateUrl: 'demo/sectionmodal/basicinfo.html'
            },
            {
                heading: 'Addresses',
				itemCount: 2,
                templateUrl: 'demo/sectionmodal/addresses.html'
            },
            {
                heading: 'Phone numbers',
				itemCount: 3,
                templateUrl: 'demo/sectionmodal/phonenumbers.html'
            }
        ];

        self.sectionValidator = bbSectionValidator.init({
                sectionIsValid: function(sectionIndex) {
                    if(sectionIndex === 0) {
                        return false;
                    }

                    return true;
                }
            }
        );
    }

    SectionModalPageTestController.$inject = ['bbModal'];
    TabSectionModalTestController.$inject = ['bbSectionValidator'];

    angular.module('stache')
        .controller('SectionModalPageTestController', SectionModalPageTestController)
        .controller('TabSectionModalTestController', TabSectionModalTestController);
}());