/*global angular */
(function () {
    'use strict';

    function TabSrefConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('rootState', {
                url: '/',
                templateUrl: 'demo/tabsref/tabset.html',
                params: { username: '' }
            })
            .state('TabState1', {
                parent: 'rootState',
                url: 'tabsref/tab1'
            })
            .state('TabState2', {
                parent: 'rootState',
                url: 'tabsref/tab2/:username',
                params: { username: '' }
            })
            .state('TabState3', {
                parent: 'rootState',
                url: 'tabsref/tab3'
            });

        $urlRouterProvider.when('', '/');
    }

    TabSrefTestController.$inject = ['$scope', '$stateParams'];
    function TabSrefTestController($scope, $stateParams) {
        $scope.username = $stateParams.username;
    }

    TabSrefConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    angular.module('stache')
        .config(TabSrefConfig)
        .controller('TabSrefTestController', TabSrefTestController);
}());
