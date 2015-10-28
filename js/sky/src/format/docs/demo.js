/*global angular */

(function () {
    'use strict';

    function FormatServiceController($scope, bbFormat) {
        var self = this;

        self.formattedResult = '';
        self.formattedText = '';
        self.htmlText = '';
        self.htmlResult = '';

        $scope.$watch(function () {
            return self.formattedText;
        }, function () {
            self.formattedResult = bbFormat.formatText('[{0}]', self.formattedText);
        });

        $scope.$watch(function () {
            return self.htmlText;
        }, function () {
            self.htmlResult = bbFormat.escape(self.htmlText);
        });
    }

    FormatServiceController.$inject = ['$scope', 'bbFormat'];

    angular.module('stache')
    .controller('FormatServiceController', FormatServiceController);
}());
