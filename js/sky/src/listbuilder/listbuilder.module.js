/*global angular */

(function () {
    'use strict';

    angular.module('sky.listbuilder', 
        [
            'sky.listbuilder.component', 
            'sky.listbuilder.toolbar.component', 
            'sky.listbuilder.footer.component',
            'sky.listbuilder.content.component',
            'sky.listbuilder.card.component',
            'sky.listbuilder.cards.component',
            'sky.listbuilder.switcher.component',
            'sky.listbuilder.repeater.component'
            
        ]);
}());