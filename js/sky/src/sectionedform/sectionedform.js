/* global angular */

(function () {
    'use strict';

    function bbSectionedFormController($scope) {
        function getSectionFormController(section) {
            if (section && section.formName && $scope.formController.hasOwnProperty(section.formName)) {
                return $scope.formController[section.formName];
            }
        }

        $scope.buildSectionHeading = function (section) {
            return section.heading + (section.itemCount ? ' (' + section.itemCount + ')' : '');
        };

        $scope.sectionHasRequiredField = function (section) {
            var sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                if (sectionFormController.$error && sectionFormController.$error.required) {
                    return sectionFormController.$error.required.length > 0;
                }
            }
        };

        $scope.sectionIsInvalid = function (section) {
            var sectionInvalid,
                parentFormSubmitted,
                sectionFormController = getSectionFormController(section);
            
            if (sectionFormController) {
                parentFormSubmitted = $scope.formController.$submitted;
                sectionInvalid = sectionFormController.$invalid;
            }

            return parentFormSubmitted && sectionInvalid;
        };
    }

    bbSectionedFormController.$inject = ['$scope'];

    function bbSectionedForm(bbMediaBreakpoints) {
        return {
            controller: bbSectionedFormController,
            link: function ($scope, el, attrs, ctrls) {
                function getFirstEl(selector) {
                    var foundElements = el.find(selector);
                    return foundElements.length > 0 ? angular.element(foundElements[0]) : undefined;
                }

                function isValidSectionIndex(sectionIndex) {
                    return angular.isDefined(sectionIndex) && sectionIndex !== null && sectionIndex !== -1 && $scope.sections[sectionIndex] !== undefined;
                }

                function mediaBreakpointHandler(breakpoints) {
                    $scope.isMobile = breakpoints.xs;
                }

                function setInitialState() {
                    if ($scope.isMobile) {
                        $scope.displayOnlyFormSections();
                    } else {
                        $scope.displayFormSectionsAndContent();
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
                    $scope.$emit('sectionsVisibilityChanged', { visible: show });
                }

                $scope.displayFormSectionsAndContent = function () {
                    toggleNavivationDisplay(true);
                    toggleContentDisplay(true);
                    $scope.activeSection = 0;
                };

                $scope.displayOnlyFormContent = function () {
                    toggleNavivationDisplay(false);
                    toggleContentDisplay(true);
                };

                $scope.displayOnlyFormSections = function () {
                    toggleNavivationDisplay(true);
                    toggleContentDisplay(false);
                    $scope.activeSection = -1;
                };

                $scope.$watch('activeSection', function (sectionIndex) {
                    if ($scope.isMobile) {
                        if (isValidSectionIndex(sectionIndex)) {
                            $scope.displayOnlyFormContent();
                        } else {
                            $scope.displayOnlyFormSections();
                        }
                    }
                });

                $scope.$watch('isMobile', setInitialState);

                $scope.formController = ctrls[0];

                bbMediaBreakpoints.register(mediaBreakpointHandler);
                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                });

                $scope.$on('reinitializeSectionDisplay', setInitialState);
            },
            restrict: 'E',
            require: ['^form'],
            scope: {
                sections: '=bbSectionedFormSections'
            },
            templateUrl: 'sky/templates/sectionedform/sectionedform.html'
        };
    }

    bbSectionedForm.$inject = ['bbMediaBreakpoints'];

    angular.module('sky.sectionedform', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbSectionedForm', bbSectionedForm);
}());