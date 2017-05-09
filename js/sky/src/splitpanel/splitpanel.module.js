/*global angular */

(function () {
    'use strict';

    angular.module('sky.splitpanel',
        [
            'sky.splitpanel.component',
            'sky.splitpanel.container.component',
            'sky.splitpanel.content.custom.item.directive',
            'sky.splitpanel.workspace.component',
            'sky.splitpanel.mobile.workspace.header.component',
            'sky.splitpanel.workspace.container.component',
            'sky.splitpanel.list.fixed.header.component',
            'sky.splitpanel.list.fixed.header.item.component',
            'sky.splitpanel.list.fixed.header.filter.component',
            'sky.splitpanel.mobile.selected.item.component',
            'sky.splitpanel.list.panel.component',
            'sky.splitpanel.bbCheckDirtyForm.factory'
        ]);
}());