/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var ctrl = this;

        function highlightSearchText(searchText) {
            ctrl.highlightSearchContent(searchText);
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content');
        }

        function onInit() {
            ctrl.contentViews = [];
        }

        ctrl.$onInit = onInit;
        ctrl.highlightSearchText = highlightSearchText;
        ctrl.getContentContainer = getContentContainer;
    }

    Controller.$inject = ['$element'];

    angular.module('sky.listbuilder.component', [])
        .component('bbListbuilder', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
            transclude: {
                bbListbuilderToolbar: '?bbListbuilderToolbar',
                bbListbuilderContent: '?bbListbuilderContent',
                bbListbuilderFooter: '?bbListbuilderFooter'
            },
            controller: Controller
        });
})();