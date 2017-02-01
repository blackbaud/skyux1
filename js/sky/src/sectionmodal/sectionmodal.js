/* global angular */

(function () {
    'use strict';

    angular.module('sky.sectionmodal', ['sky.tabset', 'ui.bootstrap.tabs'])
        .directive('bbSectionModal', function() {
            return {
                link: function(scope, el) {
                    el.addClass('bb-sectionmodal');
                },
                restrict: 'A'
            };
        })
        .directive('bbSectionedForm', function($timeout, bbMediaBreakpoints) {
            return {
                controller: function ($scope) {

                    $scope.buildSectionHeading = function (section) {
                        return section.heading + (section.itemCount ? ' (' + section.itemCount + ')' : '');
                    };
                },
                link: function ($scope, el) {
                    function getFirstEl(selector) {
                        var foundElements = el.find(selector);
                        return foundElements.length > 0 ? angular.element(foundElements[0]) : undefined;
                    }

                    function toggleElementDisplay(selector, show) {
                        var el = getFirstEl(selector);

                        if(!el) {
                            return;
                        }

                        if(show) {
                            el.removeClass('ng-hide');
                        } else {
                            el.addClass('ng-hide');
                        }
                    }

                    function toggleNavivationDisplay(show) {
                        toggleElementDisplay('.bb-sectionedform .nav-tabs', show);
                        $scope.sectionsHidden = !show;
                    }

                    function toggleContentDisplay(show) {
                        toggleElementDisplay('.bb-sectionedform .tab-content', show);
                    }

                    function setInitialState() {
                        if($scope.isMobile) {
                            $scope.displayOnlyFormSections();
                        } else {
                            $scope.displayFormSectionsAndContent();
                        }
                    }

                    function isValidSectionIndex(sectionIndex) {
                        return angular.isDefined(sectionIndex) && sectionIndex !== null && sectionIndex !== -1 && $scope.sections[sectionIndex] !== undefined;
                    }

                    function mediaBreakpointHandler(breakpoints) {
                        $scope.isMobile = breakpoints.xs;
                    }

                    $scope.displayOnlyFormContent = function() {
                        toggleNavivationDisplay(false);
                        toggleContentDisplay(true);
                    };

                    $scope.displayOnlyFormSections = function() {
                        toggleNavivationDisplay(true);
                        toggleContentDisplay(false);
                        $scope.activeSection = -1;
                    };

                    $scope.displayFormSectionsAndContent = function() {
                        toggleNavivationDisplay(true);
                        toggleContentDisplay(true);
                        $scope.activeSection = 0;
                    };

                    $scope.$watch('activeSection', function(newSectionIndex, oldSectionIndex) {
                        if($scope.isMobile) {
                            if(isValidSectionIndex(newSectionIndex)) {
                                $scope.displayOnlyFormContent();
                            } else {
                                $scope.displayOnlyFormSections();
                            }
                        }

                        if(isValidSectionIndex(oldSectionIndex) && (isValidSectionIndex(newSectionIndex) || $scope.mobileLoadStable)) {
                            $scope.sections[oldSectionIndex].isInvalid = !$scope.sectionValidator.sectionIsValid(oldSectionIndex);
                        }
                    });

                    $scope.$watch('isMobile', function(newIsMobile, oldIsMobile) {
                        setInitialState();

                        if(angular.isUndefined(oldIsMobile) || newIsMobile) {
                            $timeout(function () {
                                $scope.mobileLoadStable = true;
                            });
                        }
                    });

                    $scope.$watch('showSectionNavigation', setInitialState);

                    bbMediaBreakpoints.register(mediaBreakpointHandler);
                    
                    $scope.$on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    });
                },
                restrict: 'E',
                scope: {
                    sections: '=bbSectionedFormSections',
                    showSectionNavigation: '=',
                    sectionsHidden: '=',
                    sectionValidator: '=bbSectionValidator'
                },
                templateUrl: 'sky/templates/sectionmodal/sectionedform.html'
            };
        })
        .factory('bbSectionValidator', [function () {
            return {
                init: function(options) {
                    options = options || {};
                   
                    return {
                        sectionIsValid: function (sectionIndex) {
                            if(angular.isFunction(options.sectionIsValid)) {
                                return options.sectionIsValid(sectionIndex);
                            }

                            return true;
                        }
                    };
                }
            };
        }]);

}());