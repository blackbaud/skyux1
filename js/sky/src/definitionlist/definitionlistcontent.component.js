/*global angular */

(function () {
    'use strict';

    function Controller($element, bbResources) {
        var vm = this;

        function listHasValue() {
            var valueEl = $element.find('.bb-definition-list-value');
            if (valueEl && valueEl.text() && valueEl.text().trim()) {
                return true;
            }
            return false;
        }

        function onInit() {
            if (!vm.definitionCtrl.bbDefinitionListDefaultValue) {
                vm.definitionCtrl.bbDefinitionListDefaultValue = bbResources.definition_list_none_found;
            }
        }

        vm.$onInit = onInit;

        vm.hasValue = listHasValue;
    }
    
    Controller.$inject = ['$element', 'bbResources'];

    angular.module('sky.definitionlistcontent.component', ['sky.resources'])
        .component('bbDefinitionListContent', {
            require: {
                definitionCtrl: '^bbDefinitionList'
            },
            templateUrl: 'sky/templates/definitionlist/definitionlistcontent.component.html',
            transclude: {
                value: '?bbDefinitionListValue',
                label: 'bbDefinitionListLabel'
            },
            controller: Controller
        });
}());