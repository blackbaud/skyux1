/*global angular */

(function () {
    'use strict';

    angular.module('sky.splitpanel', 
        [
            'sky.splitpanel.component',
            'sky.splitpanel.toolbar.component',
            'sky.splitpanel.footer.component',
            'sky.splitpanel.content.component',
            'sky.splitpanel.content.custom.component',
            'sky.splitpanel.content.custom.item.directive',
            'sky.splitpanel.card.component',
            'sky.splitpanel.cards.component',
            'sky.splitpanel.switcher.component',
            'sky.splitpanel.repeater.component',
            'sky.splitpanel.repeater.item.directive'
            
        ]);
}());