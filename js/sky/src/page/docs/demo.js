/*global angular */
(function () {
    'use strict';

    function PageTestController($scope, $timeout, bbPage, $location) {
        var self = this,
            testLoading = false;

        function simulateLoading() {
            testLoading = true;
            self.pageStatus = bbPage.pageStatuses.LOADING;

            $timeout(function () {
                testLoading = false;
                self.pageStatus = bbPage.pageStatuses.LOADED;
            }, 1500);
        }

        function simulateNotAuthorized() {
            self.pageStatus = bbPage.pageStatuses.NOT_AUTHORIZED;
        }
        
        function simulateNotFound() {
            self.pageStatus = bbPage.pageStatuses.NOT_FOUND;
        }
        
        function returnHome() {
            simulateLoading();
            $location.path('/').replace();
        }

        self.pageStatus = bbPage.pageStatuses.LOADED;
        self.simulateLoading = simulateLoading;
        self.simulateNotAuthorized = simulateNotAuthorized;
        self.simulateNotFound = simulateNotFound;
        self.returnHome = returnHome;
    }

    PageTestController.$inject = ['$scope', '$timeout', 'bbPage', '$location'];

    function bbPageSetup(bbPageConfig, $stateProvider, $urlRouterProvider) {
        bbPageConfig.redirectUrl = '/components';
        bbPageConfig.notFoundUrl = '/notfound';
        
         $stateProvider
            .state('default', {
                url: '/',
                templateUrl: 'demo/page/buttons.html'
            })
            .state('notFoundState', {
                url: '/notfound',
                templateUrl: 'demo/page/notfound.html'
            });
         $urlRouterProvider.otherwise('/');
    }
    
    bbPageSetup.$inject = ['bbPageConfig', '$stateProvider', '$urlRouterProvider'];

    angular.module('stache')
        .controller('PageTestController', PageTestController)
        .config(bbPageSetup);
}());
