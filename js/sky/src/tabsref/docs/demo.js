/*global angular */
(function () {
    'use strict';

    function TabSrefConfig($stateProvider) {
        $stateProvider
            .state('rootState', {
                url: '/',
                template: '<uib-tabset><uib-tab heading="Tab 1" bb-tab-sref="TabState1">Content</uib-tab><uib-tab heading="Tab 2" bb-tab-sref="TabState2">Content 2</uib-tab><uib-tab heading="Tab 3" bb-tab-sref="TabState3">Content 3</uib-tab></uib-tabset>'
            })
            .state('TabState1', {
                parent: 'rootState',
                url: 'tabsref/tab1'
            })
            .state('TabState2', {
                parent: 'rootState',
                url: 'tabsref/tab2'
            })
            .state('TabState3', {
                parent: 'rootState',
                url: 'tabsref/tab3'
            });
    }


    TabSrefConfig.$inject = ['$stateProvider'];

    angular.module('stache')
        .config(TabSrefConfig)
        .controller('TabSrefTestController', angular.noop);
}());
