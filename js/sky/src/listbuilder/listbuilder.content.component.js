/* global angular */
(function () {
    'use strict';

    function Controller() {

        var ctrl = this;


        function addListbuilderView(newView) {
            ctrl.listBuilderCtrl.views.push(newView);
        }

        ctrl.addListbuilderView = addListbuilderView;

    }

    angular.module('sky.listbuilder.content.component', [])
        .component('bbListbuilderContent', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });

})();