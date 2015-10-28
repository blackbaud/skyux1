/*global angular */
(function () {
    'use strict';

    function TabSrefConfig($stateProvider) {
        $stateProvider
            .state('TabState1', {
                url: 'tabsref'
            })
            .state('TabState2', {
                url: 'tabsref/tab2'
            })
            .state('TabState3', {
                url: 'tabsref/tab3'
            });
    }

    TabSrefConfig.$inject = ['$stateProvider'];

    angular.module('stache')
        .config(TabSrefConfig)
        .controller('TabSrefTestController', angular.noop);
}());
