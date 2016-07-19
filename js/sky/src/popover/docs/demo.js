/*global angular */
(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        // Typically this would either point to a URL or generated using a Grunt task like html2js.  For demo
        // purposes we'll just manually put the template in the cache.
        $templateCache.put('bbPopoverTemplate/samples/samplepopover.html',
            '<div class="tooltip-container">' +
                '<label>' +
                '<div>Select a beverage:</div>' +
                '<div><select ng-model="popCtrl.selectedItem" ng-options="item as item for item in popCtrl.items"></select></div>' +
                '</label>' +
                '<a ng-click="hide()">Close me</a>' +
            '</div>');
    }

    function PopoverTestController() {
        var self = this;
        self.items = ['Coke', 'Sprite', 'Dr Pepper', 'Pibb'];
        self.selectedItem = 'Coke';
    }

    RunTemplateCache.$inject = ['$templateCache'];

    angular.module('stache')
    .run(RunTemplateCache)
    .controller('PopoverTestController', PopoverTestController);

}());
