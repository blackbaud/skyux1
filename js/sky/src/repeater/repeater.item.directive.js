/*global angular */

(function () {
    'use strict';

    function bbRepeaterItem($timeout) {
        function BBRepeaterItemController() {
            var vm = this;

            function allowCollapse() {
                return vm.isCollapsible && vm.titleElExists();
            }

            function selectItem() {
                vm.bbRepeaterItemSelected = !vm.bbRepeaterItemSelected;
                vm.repeaterItemSelectionToggled(vm.bbRepeaterItemSelected); 
            }

            function onInit() {
                vm.getCls = function () {
                    var cls = [];

                    if (allowCollapse()) {
                        cls.push('bb-repeater-item-collapsible');
                    }

                    if (vm.contextMenuElExists()) {
                        cls.push('bb-repeater-item-with-context-menu');
                    }

                    if (vm.itemIsSelectable()) {
                        cls.push('bb-repeater-item-selectable');

                        if (vm.bbRepeaterItemSelected) {
                            cls.push('bb-repeater-item-selected');
                        }
                    }

                    return cls;
                };

                vm.selectItem = selectItem;

                vm.headerClick = function ($event) {
                    if (vm.isCollapsible) {
                        vm.bbRepeaterItemExpanded = !vm.bbRepeaterItemExpanded;
                        $event.stopPropagation();
                    } 
                };

                vm.allowCollapse = allowCollapse;
            }

            vm.$onInit = onInit;
            
        }

        function link(scope, el, attrs, ctrls) {
            var animateEnabled,
                bbRepeater = ctrls[1],
                vm = ctrls[0];

            vm.listbuilderRepeaterItemCtrl = ctrls[2];


            function titleElExists() {
                return vm.titleEl[0] && vm.titleEl[0].children.length > 0;
            }

            function contextMenuElExists() {
                return vm.contextMenuEl[0] && vm.contextMenuEl[0].children.length > 0;
            }

            function getContentEl() {
                return el.find('.bb-repeater-item-content');
            }

            function updateForExpandedState() {
                var animate = animateEnabled,
                    contentEl = getContentEl(),
                    method;

                if (!angular.isDefined(vm.bbRepeaterItemExpanded)) {
                    vm.bbRepeaterItemExpanded = false;
                    animate = false;
                }

                if (vm.bbRepeaterItemExpanded || !vm.allowCollapse()) {
                    method = 'slideDown';
                } else {
                    method = 'slideUp';
                }

                contentEl[method]({
                    duration: animate ? 250 : 0
                });

                if (vm.bbRepeaterItemExpanded) {
                    vm.bbRepeater.itemExpanded(vm);
                }
            }

            function syncChevronWithExpanded() {
                vm.chevronDirection = vm.bbRepeaterItemExpanded ? 'up' : 'down';
            }

            vm.titleEl = el.find('.bb-repeater-item-title');
            vm.contextMenuEl = el.find('.bb-repeater-item-context-menu');

            vm.titleElExists = titleElExists;
            vm.contextMenuElExists = contextMenuElExists;

            vm.bbRepeater = bbRepeater;
            syncChevronWithExpanded();

            scope.$watch(
                titleElExists,
                updateForExpandedState
            );

            function getTitleTextContent() {
                return vm.titleEl.text();
            }

            if (vm.bbRepeaterItemInputLabel === null || angular.isUndefined(vm.bbRepeaterItemInputLabel)) {
                scope.$watch(getTitleTextContent, function (newValue) {
                    vm.bbRepeaterItemInputLabel = newValue;
                });
            }

            scope.$watch(function () {
                return vm.isCollapsible;
            }, function (newValue) {
                if (newValue === false) {
                    vm.bbRepeaterItemExpanded = true;
                }
            });

            scope.$watch(
                function () {
                    return vm.bbRepeaterItemExpanded;
                },
                function () {
                    syncChevronWithExpanded();
                    updateForExpandedState();
                }
            );

            scope.$watch(function () {
                return vm.chevronDirection;
            }, function () {
                if (vm.isCollapsible) {
                    vm.bbRepeaterItemExpanded = vm.chevronDirection !== 'down';
                }
            });

             
            bbRepeater.addItem(vm);

            scope.$on('$destroy', function () {
                bbRepeater.removeItem(vm);
                vm = null;
            });

            function itemIsSelectable() {
                return vm.bbRepeaterItemSelectable === 'true';
            }

            vm.itemIsSelectable = itemIsSelectable;

            function repeaterItemSelectionToggled(isSelected) {
                $timeout(function () {
                    if (angular.isFunction(vm.bbRepeaterItemSelectionToggled)) {
                        vm.bbRepeaterItemSelectionToggled({isSelected: isSelected});
                    }
                });
                
            }

            vm.repeaterItemSelectionToggled = repeaterItemSelectionToggled;

            $timeout(function () {
                // This will enable expand/collapse animation only after the initial load.
                animateEnabled = true;
            });

            scope.$emit('bbRepeaterItemInitialized', {
                repeaterItemCtrl: vm
            });
        }

        return {
            bindToController: {
                bbRepeaterItemExpanded: '=?',
                bbRepeaterItemSelectable: '@?',
                bbRepeaterItemSelected: '=?',
                bbRepeaterItemSelectionToggled: '&?',
                bbRepeaterItemInputLabel: '=?'
            },
            controller: BBRepeaterItemController,
            controllerAs: 'bbRepeaterItem',
            link: link,
            require: ['bbRepeaterItem', '^bbRepeater'],
            scope: {},
            templateUrl: 'sky/templates/repeater/repeater.item.directive.html',
            transclude: {
                bbRepeaterItemContextMenu: '?bbRepeaterItemContextMenu',
                bbRepeaterItemTitle: '?bbRepeaterItemTitle',
                bbRepeaterItemContent: '?bbRepeaterItemContent'
            }
        };
    }

    bbRepeaterItem.$inject = ['$timeout'];


    angular.module('sky.repeater.item.directive', [
            'sky.chevron', 
            'sky.check', 
            'sky.resources', 
            'sky.repeater.item.title.component',
            'sky.repeater.item.contextmenu.component'
            ])
        .directive('bbRepeaterItem', bbRepeaterItem);

})();
