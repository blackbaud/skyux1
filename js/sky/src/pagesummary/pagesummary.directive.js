/*global angular */

/** @module Page Summary
@icon eye
@summary The page summary should contain critical information and actions that need to be accessed quickly and frequently.
 @description The page summary should contain critical information and actions that need to be accessed quickly and frequently. The summary components described here are all optional - the exact content will depend on the type of page and the scenario being designed for.

##1. Record title and subtitle
The data used in the title should be chosen so that it is understandable to the user and uniquely identifies the record. There may be multiple pieces of data that could be used or combined - the correct data to use will depend on your understanding of your users and the context in which they are visiting the page. If you have two pieces of data that can be used to identify a record, you can use both a title and a subtitle. A common case for this would be if a record has a natural language name as well as a system-generated or coded identifier.

##2. Image
An image may be used if it will help the user quickly identify the record or complete a core task. Images used only for decorative purposes are likely to be distracting and interfere with task completion.

##3. Record status
Important information about the status of a record can be shown in a label.

##4. Key information
Often a core task can be addressed by highlighting a few pieces of key information. While this content can be arbitrary a common example would be using a key information block to highlight some important summary numbers.

##5.Arbitrary content
The content you put in the record summary should support the key tasks of the user visiting the page and account for the context in which the information will be used. The less information the summary contains, the more impact each element will have. There is a delicate balance in making effective use of the prime real estate without overloading it.

##6. Alert
Messages about the record that need to be seen right away can be shown in an alert. These could be system-generated messages triggered by certain criteria being met, or manually-entered notes about the record.

##7. Action bar
Actions related to the record overall, rather than to the child data shown in tiles, should be in the action bar. Ideally there would be just a handful of key actions for the record - if you find yourself needing to take many actions from the record page, it is worth re-examining the tasks you are supporting to see if an alternative workflow would be more effective.
 */

(function () {
    'use strict';

    var components = [{
        name: 'Alert',
        cls: 'alert'
    }, {
        name: 'Content',
        cls: 'content'
    }, {
        name: 'KeyInfo',
        cls: 'key-info'
    }, {
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Status',
        cls: 'status'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Subtitle',
        cls: 'subtitle'
    }],
    pageSummaryModule = angular.module('sky.pagesummary');

    function makePageSummaryComponent(component) {
        var controllerName,
            name = component.name;

        function Controller($scope) {
            var vm = this;

            $scope.$on('$destroy', function () {
                vm.onDestroy();
                vm = null;
            });
        }

        Controller.$inject = ['$scope'];

        function componentFn() {
            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbPageSummary = ctrls[1];

                vm.el = el;

                bbPageSummary['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbPageSummary' + name, '^bbPageSummary'],
                controller: controllerName,
                controllerAs: 'bbPageSummary' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBPageSummary' + name + 'Controller';

        pageSummaryModule
            .controller(controllerName, Controller)
            .directive('bbPageSummary' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBPageSummaryController() {
        var vm = this;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl) {
                var propName = getCtrlPropName(component);

                vm[propName] = ctrl;

                ctrl.onDestroy = function () {
                    vm[propName] = null;
                };
            };
        }

        components.forEach(addComponentSetter);

        vm.getPageSummaryLeftCls = function () {
            return {
                'col-sm-9': !!vm.keyInfoCtrl
            };
        };
    }

    function bbPageSummary(bbMediaBreakpoints) {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-page-summary-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            function mediaBreakpointHandler(breakpoint) {
                var keyInfoEl = el.find('.bb-page-summary-key-info'),
                    toEl;

                if (breakpoint.xs) {
                    toEl = el.find('.bb-page-summary-key-info-xs');
                } else {
                    toEl = el.find('.bb-page-summary-key-info-sm');
                }

                if (!keyInfoEl.parent().is(toEl)) {
                    toEl.append(keyInfoEl);
                }
            }

            components.forEach(watchForComponent);

            bbMediaBreakpoints.register(mediaBreakpointHandler);

            scope.$on('$destroy', function () {
                bbMediaBreakpoints.unregister(mediaBreakpointHandler);
            });
        }

        return {
            restrict: 'E',
            controller: 'BBPageSummaryController',
            controllerAs: 'bbPageSummary',
            bindToController: true,
            link: link,
            scope: {},
            templateUrl: 'sky/templates/pagesummary/pagesummary.directive.html',
            transclude: true
        };
    }

    bbPageSummary.$inject = ['bbMediaBreakpoints'];

    pageSummaryModule
        .controller('BBPageSummaryController', BBPageSummaryController)
        .directive('bbPageSummary', bbPageSummary);

    components.forEach(makePageSummaryComponent);
}());
