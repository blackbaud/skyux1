/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .run(['$templateCache', function ($templateCache) {
        // Typically this would either point to a URL or generated using a Grunt task like html2js.  For demo
        // purposes we'll just manually put the template in the cache.
        $templateCache.put('bbTooltip/samples/sampletooltip.html',
            '<div>' +
                '<div class="bb-tooltip-title">' +
                    '{{tooltipTitle}}' +
                    '<hr />' +
                '</div>' +
                '<div>{{tooltipMessage}}</div>' +
            '</div>');
    }])
    .controller('TooltipTestController', ['$scope', function ($scope) {
        $scope.tooltipTitle = 'Tooltip title';
        $scope.tooltipMessage = 'Tooltip content.';
    }]);
}());