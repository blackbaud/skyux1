/* global angular */
(function () {
    'use strict';



    function Controller($element, bbViewKeeperBuilder) {
        var ctrl = this,
            vkBackToTop;

        // Floating back to top button
        function setupViewKeeper() {
            if (vkBackToTop) {
                vkBackToTop.destroy();
            }

            vkBackToTop = new bbViewKeeperBuilder.create({
                el: $element.find('.bb-listbuilder-backtotop')[0],
                boundaryEl: ctrl.listbuilderCtrl.getListbuilderContainer(),
                setWidth: true,
                verticalOffSetElId: ctrl.listbuilderCtrl.bbListbuilderVerticalOffSetElId,
                fixToBottom: true
            });
        }

        function initFooter() {
            setupViewKeeper();
        }

        function destroyFooter() {
            if (vkBackToTop) {
                vkBackToTop.destroy();
            }
        }

        ctrl.$onInit = initFooter;
        ctrl.$onDestroy = destroyFooter;

    }

    Controller.$inject = ['$element', 'bbViewKeeperBuilder'];

    angular.module('sky.listbuilder.footer.component', ['sky.viewkeeper', 'sky.resources'])
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