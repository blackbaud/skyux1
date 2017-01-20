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

     angular.module('sky.listbuilder.switcher.component', [])
        .component('bbListbuilderSwitcher', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.switcher.component.html',
            transclude: true,
            controller: Controller,
            bindings: {
                bbListbuilderSwitcherViews: '<?',
                bbListbuilderSwitcherCurrentView: '<?',
                bbListbuilderSwitcherViewChange: '&?'
            }
        });
 })();
 
 