/*global angular */
(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        // Typically this would either point to a URL or generated using a Grunt task like html2js.  For demo
        // purposes we'll just manually put the template in the cache.
        $templateCache.put('bbTooltip/samples/sampletooltip.html',
            '<div>' +
                '<div class="bb-tooltip-title">' +
                    '{{tooltipCtrl.tooltipTitle}}' +
                    '<hr />' +
                '</div>' +
                '<div>{{tooltipCtrl.tooltipMessage}}</div>' +
            '</div>');
    }

    function TooltipTestController() {
        var self = this;
        self.tooltipTitle = 'Tooltip title';
        self.tooltipMessage = 'Tooltip content.';

    }

    RunTemplateCache.$inject = ['$templateCache'];


    angular.module('stache')
    .run(RunTemplateCache)
    .controller('TooltipTestController', TooltipTestController);
}());
