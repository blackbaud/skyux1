 /* global angular */
 (function () {
     'use strict';

     function Controller($scope) {
         var ctrl = this;

         function switchView(newView) {
             ctrl.bbListbuilderSwitcherCurrentView = newView;
             /* istanbul ignore else */
             /* sanity check */
             if (angular.isFunction(ctrl.bbListbuilderSwitcherViewChange)) {
                 ctrl.bbListbuilderSwitcherViewChange({newView: newView});
             }
         }

         function onInit() {
             ctrl.switcherId = 'listbuilder-switcher-' + $scope.$id;
         }
         ctrl.switchView = switchView;
         ctrl.$onInit = onInit;
     }

     Controller.$inject = ['$scope']; 

     angular.module('sky.splitpanel.switcher.component', [])
        .component('bbsplitpanelSwitcher', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.switcher.component.html',
            transclude: true,
            controller: Controller,
            bindings: {
                bbListbuilderSwitcherViews: '<?',
                bbListbuilderSwitcherCurrentView: '<?',
                bbListbuilderSwitcherViewChange: '&?'
            }
        });
 })();
 
 