/* global angular */
(function () {
    'use strict';

    function bbSplitpanelConfirmForm(bbModal) {

        function openConfirmModal(modalBody) {
            return bbModal.open({
                templateUrl: 'sky/templates/splitpanel/splitpanel.confirmModal.component.html',
                controller: 'ListbuilderModalController as ctrl'
                ,resolve: {
                    body: function () {
                        return modalBody;
                    }
                }
            });
        }

        return {
            openConfirmModal: openConfirmModal
        };

    }

    bbSplitpanelConfirmForm.$inject = ['bbModal'];

    angular.module('sky.splitpanel.bbSplitpanelConfirmForm.factory', ['sky.modal'])
        .factory('bbSplitpanelConfirmForm', bbSplitpanelConfirmForm);

}());
