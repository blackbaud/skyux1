/*global angular */

(function () {
    'use strict';
    
    function PopoverTestController() {
        var self = this;
        self.items = ['Coke', 'Sprite', 'Dr Pepper', 'Pibb'];
        self.selectedItem = 'Coke';
    }
    
    angular.module('screenshots', ['sky'])
    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('bbPopoverTemplate/samples/samplepopover.html',
                          '<div class="tooltip-container">' + 
                          '<div>Select a beverage: </div>' + 
                          '<div><select ng-model="popCtrl.selectedItem" ng-options="item as item for item in items"></select></div>' +
                          '<a ng-click="hide()">Clost me</a>' + 
                          '</div>');
    }])
    .controller('PopoverTestController', PopoverTestController);
}());