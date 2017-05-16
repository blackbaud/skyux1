/*global angular */

(function () {
    'use strict';

    angular.module('sky.splitpanel',
        [
            'sky.splitpanel.component',
            'sky.splitpanel.container.component',
            'sky.splitpanel.list.directive',
            'sky.splitpanel.empty.list.component',
            'sky.splitpanel.workspace.component',
            'sky.splitpanel.list.item.directive',
            'sky.splitpanel.workspace.container.component',
            'sky.splitpanel.list.fixed.header.component',
            'sky.splitpanel.list.fixed.header.item.component',
            'sky.splitpanel.list.fixed.header.filter.component',
            'sky.splitpanel.mobile.selected.item.component',
            'sky.splitpanel.mobile.list.previous.directive',
            'sky.splitpanel.mobile.list.next.directive',
            'sky.splitpanel.mobile.list.back.directive',
            'sky.splitpanel.mobile.workspace.header.component',
            'sky.splitpanel.list.panel.component',
            'sky.splitpanel.workspace.footer.component',
            'sky.splitpanel.bbCheckDirtyForm.factory'
        ]);
}());