/* global angular */
(function () {
    'use strict';

    function BBListbuilderToolbarController($element, $timeout, $q) {
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

            highlightPromise.then(function () {
                //highlight
                $timeout(function () {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText);
                });
            });

            //search callback
            ctrl.bbListbuilderOnSearch({searchText: searchText, highlightResults: deferred.resolve});
            
            
        }

        ctrl.applySearchText = applySearchText;

    }

    BBListbuilderToolbarController.$inject = ['$element', '$timeout', '$q'];

    angular.module('sky.listbuilder.toolbar.controller', ['sky.resources'])
        .controller('BBListbuilderToolbarController', BBListbuilderToolbarController);
}());