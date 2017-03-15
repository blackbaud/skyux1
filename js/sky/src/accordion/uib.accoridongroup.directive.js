/* global angular */
/* 
    From https://github.com/angular-ui/bootstrap/blob/1.2.5/src/accordion/accordion.js
    so that we can have graceful deprecation of accordion group element directive
*/
(function () {
    'use strict';
    function uibAccoridonGroup($log) {
        return {
            require: '^uibAccordion',         // We need this directive to be inside an accordion
            transclude: true,              // It transcludes the contents of the directive into the template
            replace: true,
            restrict: 'E',
            templateUrl: function (element, attrs) {
                return attrs.templateUrl || 'sky/templates/accordion/uib.accordiongroup.directive.html';
            },
            scope: {
                heading: '@',               // Interpolate the heading attribute onto this scope
                panelClass: '@?',           // Ditto with panelClass
                isOpen: '=?',
                isDisabled: '=?'
            },
            controller: function () {
                this.setHeading = function (element) {
                    this.heading = element;
                };
            },
            link: function (scope, element, attrs, accordionCtrl) {
                var id;

                $log.warn('uibAccordionGroup should not be used as an element directive, instead use as an attribute directive');

                accordionCtrl.addGroup(scope);

                scope.openClass = attrs.openClass || 'panel-open';
                scope.panelClass = attrs.panelClass || 'panel-default';
                scope.$watch('isOpen', function (value) {
                    element.toggleClass(scope.openClass, !!value);
                    if (value) {
                        accordionCtrl.closeOthers(scope);
                    }
                });

                scope.toggleOpen = function ($event) {
                    if (!scope.isDisabled) {
                        if (!$event || $event.which === 32) {
                            scope.isOpen = !scope.isOpen;
                        }
                    }
                };

                id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
                scope.headingId = id + '-tab';
                scope.panelId = id + '-panel';
            }
        };
    }

    uibAccoridonGroup.$inject = ['$log'];

    angular.module('sky.accordion.uibaccordiongroup', [
            'ui.bootstrap.accordion'
            ])
        .directive('uibAccordionGroup', uibAccoridonGroup);
})();
