/* global angular */
(function () {
    'use strict';

    angular.module('sky.listbuilder.secondary.action.component', [])
        .component('bbListbuilderSecondaryAction', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.action.component.html',
            transclude: true,
            bindings: {
                bbListbuilderSecondaryActionDisabled: '?>',
                bbListbuilderSecondaryActionClick: '?&'
            }
        });
})();