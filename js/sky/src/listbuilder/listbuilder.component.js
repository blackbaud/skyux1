/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var ctrl = this,
            lastSearchText;

        function highlightSearchText(searchText) {
            lastSearchText = searchText;
            /*  This is set by bbListbuilderCards. When we have multiple listbuilder views,
                the highlight function will be chosen dynamically
            */
            if (angular.isFunction(ctrl.highlightCards)) {
                ctrl.highlightCards(searchText);
            }
            
        }

        function highlightLastSearchText() {
            highlightSearchText(lastSearchText);
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content');
        }

        ctrl.highlightSearchText = highlightSearchText;
        ctrl.highlightLastSearchText = highlightLastSearchText;
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