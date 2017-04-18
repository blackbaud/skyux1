/*global angular */

(function () {
    'use strict';

    angular.module('sky.splitpanel',
        [
            'sky.splitpanel.header.component',
            'sky.splitpanel.content.custom.item.directive',
            'sky.splitpanel.workspace.component',
            'sky.splitpanel.workspace.header.component',
            'sky.splitpanel.workspace.container.component',
            'sky.splitpanel.list.header.component',
            'sky.splitpanel.selected.item.component',
            'sky.splitpanel.bbCheckDirtyForm.factory'
        ]);
}());