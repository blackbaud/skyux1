/* global angular */
(function () {
    'use strict';

    function BBListbuilderToolbarController($element, $q) {
        var ctrl = this;

        function applySearchText(searchText) {

            //select input
            var searchEl = $element.find('bb-listbuilder-search-input'),
                deferred = $q.defer(),
                highlightPromise;
            highlightPromise = deferred.promise;
            
            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(searchEl.select) && searchEl.length > 0 && searchText) {
                searchEl.eq(0).select();
            }
            // Allow user to call highlight promise after applying search callback
            highlightPromise.then(function () {
                ctrl.listbuilderCtrl.highlightSearchText(searchText);
            });

            //search callback
            ctrl.bbListbuilderOnSearch({searchText: searchText, highlightResults: deferred.resolve});
            
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            if (changesObj.bbListbuilderSearchText) {
                searchText = changesObj.bbListbuilderSearchText;
                if (searchText.currentValue && searchText.currentValue !== searchText.previousValue) {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText.currentValue);
                }
            }
        }

        function initToolbar() {
            if (ctrl.bbListbuilderSearchText) {
                ctrl.listbuilderCtrl.highlightSearchText(ctrl.bbListbuilderSearchText);
            }
        }

        ctrl.$onInit = initToolbar;

        ctrl.$onChanges = bindingChanges;

        ctrl.applySearchText = applySearchText;

    }

    BBListbuilderToolbarController.$inject = ['$element', '$q'];

    angular.module('sky.listbuilder.toolbar.controller', ['sky.resources'])
        .controller('BBListbuilderToolbarController', BBListbuilderToolbarController);
}());