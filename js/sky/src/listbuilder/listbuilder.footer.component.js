/* global angular */
(function () {
    'use strict';



    function Controller($element, $document) {
        var ctrl = this,
                    actionbarEl;

        function setupActionbar() {
            actionbarEl = $element.find('.bb-listbuilder-actionbar');
            $document.find('body').append(actionbarEl);
        }

        function removeActionbar() {
            if (actionbarEl) {
                actionbarEl.remove();
            }
            
        }

        function initFooter() {
            setupActionbar();
        }

        function destroyFooter() {
            removeActionbar();
        }

        ctrl.$postLink = initFooter;
        ctrl.$onDestroy = destroyFooter;

    }

    Controller.$inject = ['$element', '$document'];

    angular.module('sky.listbuilder.footer.component', ['sky.resources'])
        .component('bbListbuilderFooter', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.footer.component.html',
            bindings: {
                bbListbuilderOnLoadMore: '&?',
                bbListbuilderShowLoadMore: '<?'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());