/*global angular */

(function () {
    'use strict';

    function Controller($element) {
        var vm = this;

        function listHasValue() {
            var valueEl = $element.find('.bb-definition-list-value');
            if (valueEl && valueEl.text() && valueEl.text().trim()) {
                return true;
            }
            return false;
        }

        vm.hasValue = listHasValue;
    }
    
    Controller.$inject = ['$element'];

    angular.module('sky.definitionlistcontent.component', [])
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