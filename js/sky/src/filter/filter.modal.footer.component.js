/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.modal.footer.component', ['sky.resources', 'sky.modal'])
        .component('bbFilterModalFooter', {
            templateUrl: 'sky/templates/filter/filter.modal.footer.component.html',
            bindings: {
                bbFilterModalApply: '&',
                bbFilterModalClear: '&'
            }
        });
}());