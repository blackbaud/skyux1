/*global angular */

(function () {
    'use strict';

    function bbAlert() {
        function Controller() {
            var vm = this;
            vm.close = function () {
                vm.bbAlertClosed = true;
            };
        }
    }

    angular.module('sky.alert.component', ['sky.resources'])
        .component('bbAlert', {
            bindings: {
                bbAlertType: '@',
                bbAlertCloseable: '@',
                bbAlertClosed: '=?'
            },
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true
        });
}());

/*global angular */

(function () {
    'use strict';
 
    angular.module('sky.keyinfo.component', [])
        .component('bbKeyInfo', {
            bindings: {
                bbKeyInfoLayout: '@?'
            }, 
            templateUrl: 'sky/templates/keyinfo/keyinfo.component.html',
            transclude: {
                value: 'bbKeyInfoValue',
                label: 'bbKeyInfoLabel'
            }
        });
}());
