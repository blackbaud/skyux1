/*global angular */

(function () {
    'use strict';

    var components = [{
            name: 'Title',
            cls: 'title'
        }, {
            name: 'Content',
            cls: 'content'
        }, {
            name: 'Actions',
            cls: 'actions'
        }],
        cardModule = angular.module('sky.card.directive', ['sky.check']),
        nextId = 0;

    function makeCardComponent(component) {
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
                    bbCard = ctrls[1];

                vm.el = el;

                bbCard['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbCard' + name, '^bbCard'],
                controller: controllerName,
                controllerAs: 'bbCard' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        controllerName = 'BBCard' + name + 'Controller';

        cardModule
            .controller(controllerName, Controller)
            .directive('bbCard' + name, componentFn);
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBCardController($timeout) {
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

        function cardIsSelectable() {
            return vm.bbCardSelectable === 'true';
        }

        function cardSelectionToggled(isSelected) {
            $timeout(function () {
                if (angular.isFunction(vm.bbCardSelectionToggled)) {
                    vm.bbCardSelectionToggled({isSelected: isSelected});
                }
                if (vm.listbuilderCardCtrl !== null && angular.isFunction(vm.listbuilderCardCtrl.listbuilderCardToggled)) {
                    vm.listbuilderCardCtrl.listbuilderCardToggled(isSelected);
                }
            });
            
        }

        vm.cardSelectionToggled = cardSelectionToggled;

        vm.cardIsSelectable = cardIsSelectable;

        components.forEach(addComponentSetter);

        vm.getClass = function () {
            var cls = [];

            switch (vm.bbCardSize) {
            case 'small':
                cls.push('bb-card-small');
                break;
            }

            if (vm.bbCardSelectable) {
                cls.push('bb-card-selectable');

                if (vm.bbCardSelected) {
                    cls.push('bb-card-selected');
                }
            }

            return cls;
        };

        nextId++;
        vm.cardCheckId = 'bb-card-check-' + nextId;
    }

    BBCardController.$inject = ['$timeout'];

    function bbCard() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0];

            vm.listbuilderCardCtrl = ctrls[1];
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-card-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            components.forEach(watchForComponent);
        }

        return {
            bindToController: {
                bbCardSelectable: '@?',
                bbCardSelected: '=?',
                bbCardSelectionToggled: '&?',
                bbCardSize: '@?'
            },
            require: ['bbCard', '^^bbListbuilderCard'],
            controller: 'BBCardController',
            controllerAs: 'bbCard',
            link: link,
            restrict: 'E',
            scope: {},
            templateUrl: 'sky/templates/card/card.directive.html',
            transclude: true
        };
    }

    cardModule
        .controller('BBCardController', BBCardController)
        .directive('bbCard', bbCard);

    components.forEach(makeCardComponent);
}());
