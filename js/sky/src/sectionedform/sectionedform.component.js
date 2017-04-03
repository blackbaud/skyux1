/* global angular */

(function () {
    'use strict';

    function Controller($scope, $element, $timeout, bbMediaBreakpoints) {
        var defaultSelectedTabIndex = 0,
            noSelectedTabIndex = -1,
            postLinkComplete = false,
            vm = this;

        function getFirstEl(selector) {
            var foundElements = $element.find(selector);
            return foundElements.length > 0 ? angular.element(foundElements[0]) : undefined;
        }

        function getSectionFormController(section) {
            if (section && section.formName && vm.form && vm.form.hasOwnProperty(section.formName)) {
                return vm.form[section.formName];
            }
        }

        function mediaBreakpointHandler(breakpoints) {
            /* istanbul ignore else */
            /* sanity check */
            if (vm.isMobile !== breakpoints.xs) {
                vm.isMobile = breakpoints.xs;
                setInitialState();
            }
        }

        function setInitialState() {
            if (vm.isMobile) {
                if (!angular.isDefined(vm.activeSectionIndex) || vm.activeSectionIndex === null ||  vm.activeSectionIndex < 0) {
                    displayOnlyFormSections();
                } else {
                    displayOnlyFormContent();
                }                
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

            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(vm.onSectionsVisibilityChange)) {
                vm.onSectionsVisibilityChange({ data: { visible: show }});
            }
        }

        function displayFormSectionsAndContent() {
            toggleNavivationDisplay(true);
            toggleContentDisplay(true);
            
            if (angular.isUndefined(vm.activeSection) || vm.activeSection <= 0) {
                vm.activeSection = defaultSelectedTabIndex;
                vm.onActiveSectionChange({index: vm.activeSection});
            }
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

        vm.tabSelected = function ($index) {
            if (vm.isMobile) {
                displayOnlyFormContent();
                
                //Only raise onActiveSectionIndexChange after post link sets the initial state.
                if (postLinkComplete && $index !== vm.activeSectionIndex) {
                    vm.onActiveSectionIndexChange({index: $index});
                }
            }
        };

        $scope.$on('reinitializeSectionDisplay', function reinitializeSectionDisplay() {
            /* istanbul ignore else */
            /* sanity check */
            if (vm.isMobile) {
                vm.activeSection = noSelectedTabIndex;
                vm.activeSectionIndex = undefined;
                vm.onActiveSectionIndexChange({index: undefined});
            }
            setInitialState();
        });

        $scope.$watch('$ctrl.activeSection', function (newValue, oldValue) {
            if (newValue !== oldValue) {                
                //When the active section bound to the tab component changes, raise that change out
                //Do not do this on mobile, where the value is set initially to 0 even though the tabs aren't being displayed.  For mobile,
                //this will be triggerd by clicking tabSelected instead of the watch
                if (!vm.isMobile) {
                    vm.onActiveSectionIndexChange({index: newValue});
                }
            }
        });

        $scope.$watch('$ctrl.activeSectionIndex', function () {
            //When input for active section index changes, update the activeSection bound to the tab component.
            if (vm.activeSectionIndex !== vm.activeSection) {
                vm.activeSection = vm.activeSectionIndex;
            }
        });   

        vm.$onDestroy = function () {
            bbMediaBreakpoints.unregister(mediaBreakpointHandler);
        };

        vm.$onInit = function () {
            bbMediaBreakpoints.register(mediaBreakpointHandler);
        };

        vm.$postLink = function () {
            // Ref: https://docs.angularjs.org/guide/component
            // postLink fires before child elements load their templates and since setInitialState tries to manipulate tab elements
            // use $timeout to call setInitialState on the next digest
            $timeout(function () {
                postLinkComplete = true;
                setInitialState();
            });
        };
    }

    Controller.$inject = ['$scope', '$element', '$timeout', 'bbMediaBreakpoints'];

    angular.module('sky.sectionedform.component', ['sky.tabset', 'ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .component('bbSectionedForm', {
            bindings: {
                onSectionsVisibilityChange: '&bbSectionedFormOnSectionsVisibilityChange',
                sections: '<bbSectionedFormSections',
                activeSectionIndex: '<bbSectionedFormActiveSectionIndex',
                onActiveSectionIndexChange: '&bbSectionedFormOnActiveSectionIndexChange'
            },
            controller: Controller,
            require: {
                form: '^^form'
            },
            templateUrl: 'sky/templates/sectionedform/sectionedform.component.html'
        });
}());