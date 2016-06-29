/*global angular */

(function () {
    'use strict';

    
    angular.module('sky.definitionlistcontent.component', [])
        .component('bbDefinitionListContent', {
            templateUrl: 'sky/templates/definitionlist/definitionlistcontent.component.html',
            transclude: {
                value: 'bbDefinitionListValue',
                label: 'bbDefinitionListLabel'
            }
        });
}());