/* global angular */
(function () {
    'use strict';

    function Controller($element, $document, $q) {
        var ctrl = this,
                    actionbarEl;

        function loadCallback(loadingComplete) {
            var deferred = $q.defer(),
                    loadingPromise;
            loadingPromise = deferred.promise;
             
            loadingPromise.then(function () {
                loadingComplete();
                ctrl.listbuilderCtrl.highlightLastSearchText();
            });

            ctrl.bbListbuilderOnLoadMore({loadingComplete: deferred.resolve});
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

    Controller.$inject = ['$element', '$document', '$q'];

    angular.module('sky.listbuilder.footer.component', ['sky.resources', 'sky.infinityscroll'])
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