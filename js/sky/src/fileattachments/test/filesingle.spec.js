/*jshint browser: true, jasmine: true */
/*global $, angular, inject, module */

describe('File single directive', function () {
    'use strict';

    var $compile,
        $parse,
        $rootScope,
        bbResources;

    function getSingleEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-change="fileChange(file, rejectedFiles)"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getSingleWithLinkActionEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-link-action="fileLinkAction()"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getSingleWithRemoveEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-remove="fileRemove(file)"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getSingleWithRequiredEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-required="true"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getSingleWithValidateEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-validate-fn="fileValidate(file)"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getSingleWithErrorEl($scope) {
        var el = $compile('<div bb-file-single bb-file-single-item="file" bb-file-single-error="true"></div>')($scope);

        $scope.$digest();

        return el;
    }

    beforeEach(module(
        'ngMock',
        'sky.fileattachments.filesingle',
        'sky.templates'
    ));

    beforeEach(module(function ($provide) {
        bbResources = {
            "file_upload_choose": "'asdfsafsdfdsdasdf'",
            "file_upload_no_file": "xbdbwewebebe",
            "file_upload_replace": "wefwefew"
        };

        $provide.constant('bbResources', bbResources);
    }));

    beforeEach(inject(function (_$compile_, _$parse_, _$rootScope_) {
        $compile = _$compile_;
        $parse = _$parse_;
        $rootScope = _$rootScope_;
    }));

    it('set the expected CSS class', function () {
        var el = getSingleEl($rootScope);

        expect(el.find('.bb-file-single')).toExist();
    });

    it('should be localizable', function () {
        var $scope = $rootScope.$new(),
            selectEl,
            el = getSingleEl($scope),
            placeholderEl;

        selectEl = el.find('.bb-file-single-select');
        placeholderEl = el.find('.bb-file-single-name-placeholder');

        expect(selectEl.find('.bb-file-single-choose')).toHaveText(bbResources.file_upload_choose);
        expect(placeholderEl).toHaveText(bbResources.file_upload_no_file);

        $scope.file = {};
        $scope.$digest();

        expect(selectEl.find('.bb-file-single-replace')).toHaveText(bbResources.file_upload_replace);
    });

    it('should pass the specified options to the underlying ng-file-upload directive and input', function () {
        var $scope = $rootScope.$new(),
            attrs,
            el = angular.element('<div bb-file-single></div>'),
            fileDropEl,
            fileInputEl,
            fileSelectEl,
            ngfProp,
            p;

        attrs = {
            'bb-file-single-accept': '\'.png\'',
            'bb-file-single-min-size': '10',
            'bb-file-single-max-size': '100'
        };

        el.attr(attrs);
        el.attr('bb-file-single-id', 'testId');

        el = $compile(el)($scope);

        $scope.$digest();

        fileDropEl = el.find('.bb-file-single-drop');
        fileInputEl = el.find('.bb-file-single-input');
        fileSelectEl = el.find('.bb-file-single-select');

        for (p in attrs) {
            if (attrs.hasOwnProperty(p)) {
                // When we upgraded to ng-file-upload 12.0.4 some attribute names no longer align.
                switch (p) {
                    case 'bb-file-single-accept':
                        ngfProp = 'ngf-pattern';
                        break;
                    default:
                        ngfProp = p.replace('bb-file-single-', 'ngf-');
                }

                expect(fileDropEl).toHaveAttr(ngfProp, attrs[p]);
                expect(fileSelectEl).toHaveAttr(ngfProp, attrs[p]);
            }
        }

        expect(fileInputEl).toHaveAttr('id', 'testId');
        expect(fileInputEl).toHaveAttr('name', 'testId');
    });

    it('should call the specified callback when a file is dropped', function () {
        var $scope = $rootScope.$new(),
            el,
            fileChangedSpy,
            file,
            rejectedFiles;

        file = {
            name: 'abc.jpg'
        };

        rejectedFiles = [
            {
                name: 'xyz.jpg'
            }
        ];

        $scope.fileChange = angular.noop;

        fileChangedSpy = spyOn($scope, 'fileChange');

        el = getSingleEl($scope);

        el.isolateScope().bbFileSingle.fileChange([file], {}, rejectedFiles);

        expect(fileChangedSpy).toHaveBeenCalledWith(file, rejectedFiles);
    });

    it('should set the file item when a single file is dropped', function () {
        var $scope = $rootScope.$new(),
            el,
            files;

        files = [
            {
                name: 'abc.jpg'
            }
        ];

        el = $compile('<div bb-file-single bb-file-single-item="file"></div>')($scope);

        $scope.$digest();

        el.isolateScope().bbFileSingle.fileChange(files, {}, []);

        $scope.$digest();

        expect($scope.file).toEqual(files[0]);
    });

    it('should not set the file item when multiple files are dropped', function () {
        var $scope = $rootScope.$new(),
            el,
            files;

        files = [
            {
                name: 'abc.jpg'
            },
            {
                name: 'xyz.png'
            }
        ];

        el = $compile('<div bb-file-single bb-file-single-item="file"></div>')($scope);

        $scope.$digest();

        el.isolateScope().bbFileSingle.fileChange(files, {}, []);
        
        $scope.$digest();

        expect($scope.file).toBeFalsy();
    });

    it('should not call the specified callback when a file both files and rejected files are empty', function () {
        var $scope = $rootScope.$new(),
            el,
            fileChangedSpy,
            files,
            rejectedFiles;

        files = [
        ];

        rejectedFiles = [
        ];

        $scope.fileChange = angular.noop;

        fileChangedSpy = spyOn($scope, 'fileChange');

        el = getSingleEl($scope);

        el.isolateScope().bbFileSingle.fileChange(files, {}, rejectedFiles);

        expect(fileChangedSpy).not.toHaveBeenCalled();
    });

    it('should call the specified callback when a file is validated', function () {
        var $scope = $rootScope.$new(),
            el,
            file,
            validateSpy;

        file = {
            name: 'xyz.jpg',
            $errorParam: 'Your file name may not start with an "x."'
        };

        $scope.fileValidate = angular.noop;

        validateSpy = spyOn($scope, 'fileValidate');

        el = getSingleWithValidateEl($scope);

        el.isolateScope().bbFileSingle.validate(file);

        expect(validateSpy).toHaveBeenCalledWith(file);
    });

    it('should call the specified callback when file is being removed', function () {
        var $scope = $rootScope.$new(),
            el,
            removeSpy;

        $scope.file = {
            name: 'xyz.png'
        };

        $scope.fileRemove = angular.noop;

        removeSpy = spyOn($scope, 'fileRemove');

        el = getSingleWithRemoveEl($scope);

        el.isolateScope().bbFileSingle.remove();

        expect(removeSpy).toHaveBeenCalledWith($scope.file);
    });

    it('should remove element when remove icon clicked', function () {
        var $scope = $rootScope.$new(),
            el,
            removeEl;

        $scope.file = {
            name: 'xyz.png'
        };

        el = getSingleEl($scope);
        removeEl = el.find('.bb-file-single-remove');

        removeEl.click();

        expect($scope.file).toBeFalsy();
    });

    it('should call the specified callback when file name link is clicked', function () {
        var $scope = $rootScope.$new(),
            actionSpy,
            el;

        $scope.fileLinkAction = angular.noop;

        actionSpy = spyOn($scope, 'fileLinkAction');

        el = getSingleWithLinkActionEl($scope);

        el.isolateScope().bbFileSingle.action();

        expect(actionSpy).toHaveBeenCalled();
    });

    it('should call the action function when file name link is clicked', function () {
        var $scope = $rootScope.$new(),
            actionSpy,
            el,
            linkEl;

        $scope.file = {
            name: 'xyz.png'
        };

        $scope.fileLinkAction = angular.noop;

        el = getSingleWithLinkActionEl($scope);
        linkEl = el.find('.bb-file-single-name-link');

        actionSpy = spyOn(el.isolateScope().bbFileSingle, 'action');

        linkEl.click();

        expect(actionSpy).toHaveBeenCalled();
    });

    it('should display the name file name normally', function () {
        var $scope = $rootScope.$new(),
            el,
            linkEl,
            nameEl,
            placeholderEl;

        $scope.file = {
            name: 'xyz.png'
        };

        el = $compile('<div bb-file-single bb-file-single-item="file"></div>')($scope);

        $scope.$digest();

        linkEl = el.find('.bb-file-single-name-link');
        nameEl = el.find('.bb-file-single-name');
        placeholderEl = el.find('.bb-file-single-name-placeholder');

        expect(linkEl).not.toExist();
        expect(nameEl).toHaveText($scope.file.name);
        expect(placeholderEl).not.toExist();
    });

    it('should optionally display the name file name as link', function () {
        var $scope = $rootScope.$new(),
            el,
            linkEl,
            nameEl,
            placeholderEl;

        $scope.file = {
            name: 'xyz.png'
        };

        $scope.fileLinkAction = angular.noop;

        el = getSingleWithLinkActionEl($scope);

        linkEl = el.find('.bb-file-single-name-link');
        nameEl = el.find('.bb-file-single-name');
        placeholderEl = el.find('.bb-file-single-name-placeholder');

        expect(linkEl).toHaveText($scope.file.name);
        expect(nameEl).not.toExist();
        expect(placeholderEl).not.toExist();
    });

    it('should display the placeholder as red error', function () {
        var $scope = $rootScope.$new(),
            el,
            placeholderEl;

        el = getSingleWithErrorEl($scope);
        placeholderEl = el.find('.bb-file-single-name-placeholder');

        expect(placeholderEl).toHaveClass('bb-file-single-error');
    });

    it('should display remove icon when file is added', function () {
        var $scope = $rootScope.$new(),
            el,
            removeEl;

        el = $compile('<div bb-file-single bb-file-single-item="file"></div>')($scope);

        $scope.$digest();

        removeEl = el.find('.bb-file-single-remove');
        expect(removeEl).not.toExist();

        $scope.file = {};

        $scope.$digest();

        removeEl = el.find('.bb-file-single-remove');
        expect(removeEl).toExist();
    });

    it('should optionally have required hidden input', function () {
        var $scope = $rootScope.$new(),
            el,
            inputEl;

        el = getSingleEl($scope);
        inputEl = el.find('.bb-file-single-input');
        expect(inputEl).not.toHaveAttr('required', 'required');

        el = getSingleWithRequiredEl($scope);
        inputEl = el.find('.bb-file-single-input');
        expect(inputEl).toHaveAttr('required', 'required');
    });

    it('should display preview for image file', function () {
        var $scope = $rootScope.$new(),
            imgSelector = '.bb-file-single-preview';


        function validateThumbnailVisible(file, visible) {
            var el = $compile('<div bb-file-single bb-file-single-item="file"></div>')($scope);
            $scope.file = file;

            $scope.$digest();

            if (visible) {
                expect(el).toContainElement(imgSelector);
            } else {
                expect(el).not.toContainElement(imgSelector);
            }
        }

        validateThumbnailVisible({
            name: 'abc.bmp',
            type: 'image/bmp'
        }, true);

        validateThumbnailVisible({
            name: 'abc.gif',
            type: 'image/gif'
        }, true);

        validateThumbnailVisible({
            name: 'abc.jpg',
            type: 'image/jpeg'
        }, true);

        validateThumbnailVisible({
            name: 'abc.png',
            type: 'image/png'
        }, true);

        validateThumbnailVisible({
            name: 'abc.png',
            type: ''
        }, false);
    });

    it('should prevent dropping of files onto the window but outside of the allowed drop target from opening the file in the browser', function () {
        var $scope = $rootScope.$new(),
            el,
            nonTargetEl;

        function testDropTarget(target, shouldAllowDrop) {
            function testSpecificEvent(eventName) {
                var e,
                    preventDefaultSpy,
                    testCall;

                e = $.Event(eventName);
                e.which = 13;
                e.keyCode = 13;
                e.target = target[0];

                preventDefaultSpy = spyOn(e, 'preventDefault').and.callThrough();

                $(window).trigger(e);

                testCall = expect(preventDefaultSpy);

                if (shouldAllowDrop) {
                    testCall = testCall.not;
                }

                testCall.toHaveBeenCalled();
            }

            testSpecificEvent('dragover');
            testSpecificEvent('drop');
        }

        el = getSingleEl($scope);

        // The element has to be in the DOM to trigger its change event in Firefox.
        el.appendTo(document.body);

        nonTargetEl = $('<div></div>').appendTo(document.body);

        $scope.$digest();

        testDropTarget(el.find('.bb-file-drop-target'), true);
        testDropTarget(nonTargetEl, false);

        el.remove();
        nonTargetEl.remove();
    });
});
