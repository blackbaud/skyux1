/*global angular, jQuery */

(function ($) {
    'use strict';

    function Controller($element) {
        var vm = this;
        vm.hasValue = function () {
            if ($.trim($element.find('.bb-definition-list-value').text())) {
                return false;
            }
            return true;
        };
    }
    
    Controller.$inject = ['$element'];
    
    
    angular.module('sky.definitionlistcontent.component', ['sky.resources'])
        .component('bbDefinitionListContent', {
            templateUrl: 'sky/templates/definitionlist/definitionlistcontent.component.html',
            transclude: {
                value: 'bbDefinitionListValue',
                label: 'bbDefinitionListLabel'
            },
            controller: Controller
        });
}(jQuery));