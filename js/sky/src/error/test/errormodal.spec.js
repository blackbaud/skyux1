/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Error modal', function () {
    'use strict';

    var $animate,
        $compile,
        $rootScope,
        bbErrorModal;

    function afterModalOpened() {
        $animate.flush();
        $rootScope.$digest();
    }

    function afterModalClosed() {
        $animate.flush();
        $rootScope.$digest();
        $animate.flush();
        $rootScope.$digest();
    }

    beforeEach(module(
        'ngMock',
        'ngAnimateMock',
        'sky.error',
        'sky.templates'
    ));

    beforeEach(inject(function (_$animate_, _$compile_, _$rootScope_, _bbErrorModal_) {
        $animate = _$animate_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbErrorModal = _bbErrorModal_;
    }));

    it('should display a modal with the specified title and description', function () {
        var errorModalInstance = bbErrorModal.open({
            errorTitle: 'Error title',
            errorDescription: 'Error description'
        });

        afterModalOpened();

        expect('.bb-modal .bb-error-title').toHaveText('Error title');
        expect('.bb-modal .bb-error-description').toHaveText('Error description');

        errorModalInstance.close();

        afterModalClosed();
    });

    it('should close when the user clicks the OK button', function () {
        bbErrorModal.open({
            errorTitle: 'Error title',
            errorDescription: 'Error description'
        });

        afterModalOpened();

        expect('.bb-modal').toExist();

        $('.bb-modal .bb-error-action button').click();

        afterModalClosed();

        expect('.bb-modal').not.toExist();
    });
});
