/*global angular */

(function () {
    'use strict';

    angular.module('sky.summary.actionbar', 
        [
            'sky.summary.actionbar.component',
            'sky.summary.actionbar.primary.component',
            'sky.summary.actionbar.secondary.component',
            'sky.summary.actionbar.secondary.actions.component',
            'sky.summary.actionbar.cancel.component'
        ]);
})();