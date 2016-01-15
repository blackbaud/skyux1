/*global angular, jQuery */

/** @module Page Summary
@icon eye
@summary The modal component launches modals in a way that is consistent with Sky UX applications.
 @description The modal directive and service can be used to launch modals in a consistent way in a Sky UX application. Rather than using the ui-bootstrap `$uibModal.open`, use `bbModal.open` instead. This takes the same options object but allows for some custom default behaviors in Sky UX.

In addition to the `bbModal` service for lauching modals, a `bb-modal` directive should be used to have common look-and-feel for modal content. Within `bb-modal`, use `bb-modal-header` to include a common modal header, `bb-modal-footer` to include a common modal footer and buttons, and `bb-modal-body` to wrap the modal's body content.

### Modal Header Settings ###

 - `bb-modal-help-key` Specifies the help key for the modal. This will be be linked from a help button included in the modal header.

### Modal Footer Buttons ##

 - `bb-modal-footer-button` Generic button for the modal footer. HTML included in this tag will be included in the contents of the button. You must register events for the button manually.

 - `bb-modal-footer-button-primary` Primary button for the modal footer which will have a custom look.  Default content is 'Save', but HTML included in this tag will be included as the contents of the button if provided. You must register events for the button manually.

 - `bb-modal-footer-button-cancel` Cancel button for the modal footer. Default content is 'Cancel', but HTML included in this tag will be included as the contents of the button if provided. This button automatically cancels the modal form.

 */

(function ($) {
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
        name: 'Photo',
        cls: 'photo'
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
        var name = component.name;

        function componentFn() {
            function Controller() {

            }

            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbPageSummary = ctrls[1];

                vm.el = el;

                bbPageSummary['set' + name](vm);

                scope.$on('$destroy', function () {
                    vm.onDestroy();
                    vm = null;
                });
            }

            return {
                restrict: 'E',
                require: ['bbPageSummary' + name, '^bbPageSummary'],
                controller: Controller,
                controllerAs: 'bbPageSummary' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        pageSummaryModule.directive('bbPageSummary' + name, componentFn);
    }

    function bbPageSummary(bbMediaBreakpoints) {
        function getCtrlPropName(component) {
            var name = component.name;

            return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
        }

        function Controller() {
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

                if (!$.contains(toEl, keyInfoEl)) {
                    toEl.append(keyInfoEl);
                }
            }

            components.forEach(watchForComponent);

            bbMediaBreakpoints.register(mediaBreakpointHandler);

            scope.$on('$destroy', function () {
                mediaBreakpointHandler.unregister(mediaBreakpointHandler);
            });
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbPageSummary',
            bindToController: true,
            link: link,
            scope: {},
            templateUrl: 'sky/templates/pagesummary/pagesummary.directive.html',
            transclude: true
        };
    }

    bbPageSummary.$inject = ['bbMediaBreakpoints'];

    pageSummaryModule.directive('bbPageSummary', bbPageSummary);

    components.forEach(makePageSummaryComponent);
}(jQuery));
