/* global angular */
(function () {
    'use strict';

    function bbCheckDirtyForm(bbModal, bbSplitpanelConfirmForm) {
        return {
            init: function (options) {
                var enableFormDirtyCheck = options.enableFormDirtyCheck, forms = options.forms, saveCallback = options.saveCallback,
                    doNotSaveCallback = options.doNotSaveCallback,
                    modalBody = angular.isDefined(options.modalBody) ? options.modalBody : "Do you want to save changes to this transaction? Your  changes will be lost if  you  don't save them.";

                //check dirty and open modal
                function checkDirtyForm(func, param) {

                    //check for dirty form
                    if (enableFormDirtyCheck && angular.isDefined(forms) && angular.isDefined(forms.workspaceContainerForm) && forms.workspaceContainerForm.$dirty) {
                        bbSplitpanelConfirmForm.openConfirmModal(modalBody)
                        .result.then(function (result) {

                            forms.workspaceContainerForm.$setPristine();

                            if (result) {
                                if (saveCallback !== undefined) {
                                    saveCallback(func, param);
                                }
                            } else {
                                if (doNotSaveCallback !== undefined) {
                                    doNotSaveCallback(func, param);
                                }
                            }
                        });
                    } else {

                        //calling invoked action without any pre-processing
                        invokeMethodWithParameters(func, param);
                    }
                }

                //This method is used to invoke passed method
                function invokeMethodWithParameters(func, param) {
                    if (param === undefined) {
                        func();
                    } else {
                        func(param);
                    }
                }

                return {
                    checkDirtyForm: checkDirtyForm,
                    invokeMethodWithParameters: invokeMethodWithParameters
                };
            }
        };

    }

    bbCheckDirtyForm.$inject = ['bbModal', 'bbSplitpanelConfirmForm'];

    angular.module('sky.splitpanel.bbCheckDirtyForm.factory', ['sky.modal'])
        .factory('bbCheckDirtyForm', bbCheckDirtyForm);

}());
