/* global angular */
(function () {
    'use strict';

    function Controller($element, $document) {
        var ctrl = this,
                    actionbarEl;

        function loadCallback() {
            var loadingPromise = ctrl.bbListbuilderOnLoadMore();

            if (loadingPromise && angular.isFunction(loadingPromise.then)) {
                loadingPromise.then(function () {
                    ctrl.listbuilderCtrl.highlightLastSearchText();
                });
            } else {
                ctrl.listbuilderCtrl.highlightLastSearchText();
            }

            return loadingPromise;
        }

        function setupActionbar() {
            actionbarEl = $element.find('.bb-listbuilder-actionbar');
            $document.find('body').append(actionbarEl);
        }

        function removeActionbar() {
            /* istanbul ignore else */
            /* sanity check */
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
        ctrl.loadCallback = loadCallback;
    }

    Controller.$inject = ['$element', '$document'];

    angular.module('sky.listbuilder.footer.component', ['sky.resources', 'sky.infinitescroll'])
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