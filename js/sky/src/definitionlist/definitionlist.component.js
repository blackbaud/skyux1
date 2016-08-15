/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.definitionlist.component', [])
        .component('bbDefinitionList', {
            templateUrl: 'sky/templates/definitionlist/definitionlist.component.html',
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