/*global angular */

/** @module Page Summary
@icon newspaper-o
@summary The page summary displays critical information and actions for users to access quickly and frequently.
 @description The page summary displays critical information and actions for users to access quickly and frequently. The parent `bb-page-summary` directive can contain multiple directives, and each one is optional. You select the directives to include in the summary based on the type of page and the scenario you design for.

The directives available within the `bb-page-summary` directive are simple wrappers that you can specify in any order. The page summary component arranges the directives to allow for perfect placement, spacing, etc. It maintains this even when the CSS classes that arrange the directives change behind the scenes.

Keep in mind that the page summary is prime real estate on a page. To use it effectively, we recommend that you avoid overloading it. When you limit the number of items in the summary, you magnify the impact of each individual item.

### Title and Subtitle
You can display a title and subtitle to uniquely identify the content on the page. You can pull data for the title from multiple sources, and you can combine multiple pieces of data in the title. The data to use depends on your users and the context in which they visit the page. You can display additional information in the subtitle. For example, you can display a record's natural language name in the title and its system-generated or coded identifier in the subtitle.

You use the `bb-page-summary-title` and `bb-page-summary-subtitle` directives to display the title and subtitle.

### Image
You can display an image in the summary to help users identify a record or complete a core task. We recommend that you do not include images just for decorative purposes because they are likely to distract users and interfere with task completion.

You use the `bb-page-summary-image` directive to display the image. As the example below demonstrates, you can use this directive in conjunction with the [`bb-profile-photo`](../profilephoto) directive to allow users to manage and upload images.

### Status
You can display important status information about a page's content with labels in the status section of the page summary.

You use the `bb-page-summary-status` directive to display the status section. You typically display the labels with  a series of `span` elements and the [Bootstrap CSS classes for labels](http://getbootstrap.com/components/#labels).

### Key Information
You can highlight important information about a page's content in the key information section of the page summary. This section can display any type of content, but it generally highlights a key information block such as important summary numbers.

You use the `bb-page-summary-keyinfo` directive to display the key information section.

### Arbitrary Content
You can display any kind of content in the arbitrary content section of the page summary. We recommend that you display content to support the key tasks of users who visit the page. We also recommend that you keep in mind the context of how users will use the content and limit the amount of content to avoid overloading the summary.

You use the `bb-page-summary-content` directive to display the arbitrary content section.

### Alert
You can display messages that require immediate attention in alerts within the page summary. For example, you can display system-generated messages when certain criteria are met, or you can display notes about a record that you enter manually.

You use the `bb-page-summary-alert` directive to display the alerts. You can use in conjunction with the [`bb-alert`](../alert) directive.

### Action Bar
You can display actions within an action bar in the page summary. We recommend that you include only actions that relate to the page as a whole and that you exclude actions that are specific to tiles within the page. We also recommend that you limit the number of actions in the action bar. If your summary requires many actions, we recommend that you re-examine the tasks and consider an alternative workflow.

You can use the `bb-page-summary-action-bar` directive to display the action bar. You can use this directive in conjunction with the [`bb-action-bar`](../actionbar) directive.

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
    }, {
        name: 'ActionBar',
        cls: 'action-bar'
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
