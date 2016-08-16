/*global angular */

(function () {
    'use strict';

    function Controller(bbResources) {
        var vm = this;

        function onInit() {
            if (!vm.bbDefinitionListDefaultValue) {
                vm.bbDefinitionListDefaultValue = bbResources.definition_list_none_found;
            }
        }

        vm.$onInit = onInit;
    }

    Controller.$inject = ['bbResources'];
    
    angular.module('sky.definitionlist.component', ['sky.resources'])
        .component('bbDefinitionList', {
            templateUrl: 'sky/templates/definitionlist/definitionlist.component.html',
            controller: Controller,
            bindings: {
                bbDefinitionListLabelWidth: '@?',
                bbDefinitionListDefaultValue: '<?'
            },
            transclude: {
                heading: '?bbDefinitionListHeading', 
                content: 'bbDefinitionListContent'
            }
        });
}());