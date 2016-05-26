/*global angular */
(function () {
    'use strict';

    function TabSrefConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('rootState', {
                url: '/',
                templateUrl: 'demo/tabsref/tabset.html'
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

        $urlRouterProvider.when('', '/tabsref/tab2');
    }


    TabSrefConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    angular.module('stache')
        .config(TabSrefConfig)
        .controller('TabSrefTestController', angular.noop);
}());
