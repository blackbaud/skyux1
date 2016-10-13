 /* global angular */
 (function () {
     'use strict';

     function Controller() {
         var ctrl = this;

         function switchView(newView) {
             ctrl.bbListbuilderSwitcherCurrentView = newView;
             if (angular.isFunction(ctrl.bbListbuilderSwitcherViewChange)) {
                 ctrl.bbListbuilderSwitcherViewChange({newView: newView});
             }
         }
         ctrl.switchView = switchView;
     }

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
 
 