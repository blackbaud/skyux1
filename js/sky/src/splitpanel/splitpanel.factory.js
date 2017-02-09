/* global angular */
(function () {
    'use strict';

    function bbSplitpanelNavigator(bbModal) {
        return {
            init: function (options) {
                var enableFormDirtyCheck = options.enableFormDirtyCheck, forms = options.forms, saveCallback = options.saveCallback,
                    doNotSaveCallback = options.doNotSaveCallback;
                //check dirty and open modal
                function checkDirtyForm(func, param) {

                    //check for dirty form
                    if (enableFormDirtyCheck && angular.isDefined(forms) && angular.isDefined(forms.workspaceContainerForm) && forms.workspaceContainerForm.$dirty) {
                        bbModal.open({
                            controller: options.modalController,
                            templateUrl: options.modalTemplate
                        })
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

    bbSplitpanelNavigator.$inject = ['bbModal'];

    angular.module('sky.splitpanel.bbSplitpanelNavigator.factory', ['sky.modal'])
        .factory('bbSplitpanelNavigator', bbSplitpanelNavigator);

}());
