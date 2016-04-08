/*global angular */

(function () {
    'use strict';

    var components = [{
        name: 'ContextMenu',
        cls: 'context-menu'
    }, {
        name: 'Title',
        cls: 'title'
    }],
    repeaterItemModule = angular.module('sky.repeater.item.directive', []);

    function makeComponent(component) {
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
                    bbRepeaterItem = ctrls[1];

                vm.el = el;

                bbRepeaterItem['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbRepeaterItem' + name, '^bbRepeaterItem'],
                controller: controllerName,
                controllerAs: 'bbRepeaterItem' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBRepeaterItem' + name + 'Controller';

        repeaterItemModule
            .controller(controllerName, Controller)
            .directive('bbRepeaterItem' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function bbRepeaterItem() {
        function BBRepeaterItemController() {
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

            function allowCollapse() {
                return vm.isCollapsible && vm.titleCtrl;
            }

            vm.getCls = function () {
                var cls = [];

                if (allowCollapse()) {
                    cls.push('bb-repeater-item-collapsible');

                }

                if (vm.contextMenuCtrl) {
                    cls.push('bb-repeater-item-with-context-menu');
                }

                return cls;
            };

            vm.getChevronCls = function () {
                return 'bb-repeater-item-chevron-flip-' + (vm.bbRepeaterItemCollapsed ? 'down' : 'up');
            };

            vm.collapse = function () {
                if (allowCollapse()) {
                    vm.bbRepeaterItemCollapsed = true;
                }
            };

            vm.allowCollapse = allowCollapse;

            components.forEach(addComponentSetter);
        }

        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbRepeater = ctrls[1];

            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-repeater-item-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            function getContentEl() {
                return el.find('.bb-repeater-item-content');
            }

            function updateForCollapsedState() {
                var animate = true,
                    contentEl = getContentEl(),
                    method;

                if (!angular.isDefined(vm.bbRepeaterItemCollapsed)) {
                    vm.bbRepeaterItemCollapsed = true;
                    animate = false;
                }

                if (vm.bbRepeaterItemCollapsed && vm.allowCollapse()) {
                    method = 'slideUp';
                } else {
                    method = 'slideDown';
                }

                contentEl[method]({
                    duration: animate ? 250 : 0
                });

                if (!vm.bbRepeaterItemCollapsed) {
                    vm.bbRepeater.itemExpanded(vm);
                }
            }

            vm.bbRepeater = bbRepeater;

            vm.headerClick = function () {
                if (vm.isCollapsible) {
                    vm.bbRepeaterItemCollapsed = !vm.bbRepeaterItemCollapsed;
                }
            };

            components.forEach(watchForComponent);

            scope.$watch(function () {
                return vm.isCollapsible;
            }, function (newValue) {
                if (newValue === false) {
                    vm.bbRepeaterItemCollapsed = false;
                }
            });

            scope.$watchGroup(
                [
                    function () {
                        return vm.bbRepeaterItemCollapsed;
                    },
                    function () {
                        return vm.titleCtrl;
                    }
                ],
                updateForCollapsedState
            );
            
            bbRepeater.addItem(vm);

            scope.$on('$destroy', function () {
                bbRepeater.removeItem(vm);
                vm = null;
            });
        }

        return {
            scope: {},
            bindToController: {
                bbRepeaterItemCollapsed: '='
            },
            controller: BBRepeaterItemController,
            controllerAs: 'bbRepeaterItem',
            link: link,
            require: ['bbRepeaterItem', '^bbRepeater'],
            templateUrl: 'sky/templates/repeater/repeater.item.directive.html',
            transclude: true
        };
    }

    repeaterItemModule.directive('bbRepeaterItem', bbRepeaterItem);

    components.forEach(makeComponent);
}());
