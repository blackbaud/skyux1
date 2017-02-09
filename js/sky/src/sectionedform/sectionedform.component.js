/* global angular */

(function () {
    'use strict';

    function Controller($scope, $element, bbMediaBreakpoints) {
        var defaultSelectedTabIndex = 0,
            noSelectedTabIndex = -1,
            vm = this;

        function getFirstEl(selector) {
            var foundElements = $element.find(selector);
            return foundElements.length > 0 ? angular.element(foundElements[0]) : undefined;
        }

        function getSectionFormController(section) {
            if (section && section.formName && vm.form.hasOwnProperty(section.formName)) {
                return vm.form[section.formName];
            }
        }

        function isValidSectionIndex(sectionIndex) {
            return angular.isDefined(sectionIndex) && sectionIndex !== null && sectionIndex !== noSelectedTabIndex && vm.sections[sectionIndex] !== undefined;
        }

        function mediaBreakpointHandler(breakpoints) {
            if (vm.isMobile !== breakpoints.xs) {
                vm.isMobile = breakpoints.xs;
                setInitialState();
            }
        }

        function setInitialState() {
            if (vm.isMobile) {
                displayOnlyFormSections();
            } else {
                displayFormSectionsAndContent();
            }
        }

        function toggleElementDisplay(selector, show) {
            var el = getFirstEl(selector);

            if (!el) {
                return;
            }

            if (show) {
                el.removeClass('ng-hide');
            } else {
                el.addClass('ng-hide');
            }
        }

        function toggleContentDisplay(show) {
            toggleElementDisplay('.bb-sectionedform .tab-content', show);
        }

        function toggleNavivationDisplay(show) {
            toggleElementDisplay('.bb-sectionedform .nav-tabs', show);

            if (angular.isFunction(vm.onSectionsVisibilityChange)) {
                vm.onSectionsVisibilityChange({ data: { visible: show }});
            }
        }

        function displayFormSectionsAndContent() {
            toggleNavivationDisplay(true);
            toggleContentDisplay(true);
            vm.activeSection = defaultSelectedTabIndex;
        }

        function displayOnlyFormContent() {
            toggleNavivationDisplay(false);
            toggleContentDisplay(true);
        }

        function displayOnlyFormSections() {
            toggleNavivationDisplay(true);
            toggleContentDisplay(false);
            vm.activeSection = noSelectedTabIndex;
        }

        vm.buildSectionHeading = function (section) {
            return section.heading + (section.itemCount ? ' (' + section.itemCount + ')' : '');
        };

        vm.sectionHasRequiredField = function (section) {
            var sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                if (sectionFormController.$error && sectionFormController.$error.required) {
                    return sectionFormController.$error.required.length > 0;
                }
            }
        };

        vm.sectionIsInvalid = function (section) {
            var sectionInvalid,
                parentFormSubmitted,
                sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                parentFormSubmitted = vm.form.$submitted;
                sectionInvalid = sectionFormController.$invalid;
            }

            return parentFormSubmitted && sectionInvalid;
        };

        $scope.$watch(function () {
            return vm.activeSection;
        }, function (sectionIndex) {
            if (vm.isMobile) {
                if (isValidSectionIndex(sectionIndex)) {
                    displayOnlyFormContent();
                } else {
                    displayOnlyFormSections();
                }
            }
        });

        $scope.$on('reinitializeSectionDisplay', setInitialState);

        vm.$onInit = function () {
            bbMediaBreakpoints.register(mediaBreakpointHandler);
        };

        vm.$onDestroy = function () {
            bbMediaBreakpoints.unregister(mediaBreakpointHandler);
        };
    }

    Controller.$inject = ['$scope', '$element', 'bbMediaBreakpoints'];

    angular.module('sky.sectionedform.component', ['sky.tabset', 'ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .component('bbSectionedForm', {
            bindings: {
                onSectionsVisibilityChange: '&bbSectionedFormOnSectionsVisibilityChange',
                sections: '<bbSectionedFormSections'
            },
            controller: Controller,
            require: {
                form: '^^form'
            },
            templateUrl: 'sky/templates/sectionedform/sectionedform.component.html'
        });
}());