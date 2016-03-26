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


    function getCtrlPropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'Ctrl';
    }

    function getOverridePropName(component) {
        var name = component.name;

        return name.charAt(0).toLowerCase() + name.substr(1) + 'HasOverride';
    }

    function BBErrorController($scope) {
        var vm = this,
            errorType;

        errorType = vm.errorType;

        function addComponentSetter(component) {
            var name = component.name;

            vm['set' + name] = function (ctrl, isDefaultError) {
                var ctrlName = getCtrlPropName(component),
                    hasOverride = getOverridePropName(component);

                vm[ctrlName] = ctrl;

                if (!isDefaultError) {
                    vm[hasOverride] = true;
                }

                ctrl.onDestroy = function () {
                    vm[ctrlName] = null;
                };
            };
        }

        $scope.$watch(function () {
            return vm.errorType;
        }, function (newValue) {
            vm.imageType = newValue;
            vm.titleType =  newValue;
            vm.descriptionType =  newValue;
        });

        components.forEach(addComponentSetter);
    }

    BBErrorController.$inject = ['$scope'];

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
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/error/error.directive.html',
            transclude: true
        };
    }

    angular.module('sky.error.directive', ['sky.error.image.directive', 'sky.error.title.directive', 'sky.error.description.directive', 'sky.error.action.directive'])
        .controller('BBErrorController', BBErrorController)
        .directive('bbError', bbError);

}());
