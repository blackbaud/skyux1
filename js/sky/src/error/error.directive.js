/*global angular */
(function () {
    'use strict';

    var components = [{
        name: 'Image',
        cls: 'image'
    }, {
        name: 'Title',
        cls: 'title'
    }, {
        name: 'Description',
        cls: 'description'
    }, {
        name: 'Action',
        cls: 'action'
    }];

    function makeErrorComponent(component) {
        var controllerName,
            name = component.name;

        function Controller($scope) {
            var vm = this;

            $scope.$on('$destroy', function () {
                vm.onDestroy();
                vm = null;
            });
        }

        function componentFn() {
            function link(scope, el, attrs, ctrls) {
                var vm = ctrls[0],
                    bbError = ctrls[1];

                vm.el = el;

                bbError['set' + name](vm);
            }

            return {
                restrict: 'E',
                require: ['bbError' + name, '^bbError'],
                controller: controllerName,
                controllerAs: 'bbError' + name,
                bindToController: true,
                link: link,
                scope: {}
            };
        }

        //For now to mess with images
        if (name !== 'Image') {

            Controller.$inject = ['$scope'];

            controllerName = 'BBError' + name + 'Controller';

            angular.module('sky.error.directive')
                .controller(controllerName, Controller)
                .directive('bbError' + name, componentFn);
        }
    }

    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function BBErrorController() {
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
    }

    function bbError() {
        function link(scope, el, attrs, vm) {
            function watchForComponent(component) {
                scope.$watch(function () {
                    return vm[getCtrlPropName(component)];
                }, function (newValue) {
                    if (newValue) {
                        el.find('.bb-error-' + component.cls)
                            .empty()
                            .append(newValue.el);
                    }
                });
            }

            components.forEach(watchForComponent);
        }

        return {
            restrict: 'E',
            controller: 'BBErrorController',
            controllerAs: 'bbError',
            bindToController: true,
            link: link,
            scope: {},
            templateUrl: 'sky/templates/error/error.directive.html',
            transclude: true
        };
    }

    angular.module('sky.error.directive', ['sky.error.image.directive'])
        .controller('BBErrorController', BBErrorController)
        .directive('bbError', bbError);

    components.forEach(makeErrorComponent);

}());
