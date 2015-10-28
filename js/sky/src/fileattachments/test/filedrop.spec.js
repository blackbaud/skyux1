/*jshint browser: true, jasmine: true */
/*global $, angular, inject, module */

describe('File drop directive', function () {
    'use strict';

    var $compile,
        $parse,
        $rootScope,
        bbResources;

    function getDropEl($scope) {
        var el = $compile('<div bb-file-drop bb-file-drop-change="fileDropped(files, rejectedFiles)"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getDropWithLinkEl($scope) {
        var el = $compile('<div bb-file-drop bb-file-drop-link bb-file-drop-link-change="addLink(link)"></div>')($scope);

        $scope.$digest();

        return el;
    }

    function getLinkEl(el) {
        return el.find('.bb-file-drop-link');
    }

    function getAcceptEl(el) {
        return el.find('.bb-file-drop-contents-accept');
    }

    function getRejectEl(el) {
        return el.find('.bb-file-drop-contents-reject');
    }

    function getNotOverEl(el) {
        return el.find('.bb-file-drop-contents-not-over');
    }

    function getLinkInputEl(linkEl) {
        return linkEl.find('input[type="text"]');
    }

    function getLinkSubmitEl(linkEl) {
        return linkEl.find('.btn-primary');
    }

    beforeEach(module(
        'ngMock',
        'sky.fileattachments.filedrop',
        'sky.templates'
    ));

    beforeEach(module(function ($provide) {
        bbResources = {
            "file_upload_drag_file_here": "'asdfsafsdfdsdasdf'",
            "file_upload_drop_files_here": "gasgsadsfewgweg",
            "file_upload_invalid_file": "gegwegdssgwef",
            "file_upload_link_placeholder": "bfewefwewwesdvsdvd",
            "file_upload_or_click_to_browse": "bfebefwebwebwed",
            "file_upload_paste_link": "xbdbwewebebe",
            "file_upload_paste_link_done": "wefwefew"
        };

        $provide.constant('bbResources', bbResources);
    }));

    beforeEach(inject(function (_$compile_, _$parse_, _$rootScope_) {
        $compile = _$compile_;
        $parse = _$parse_;
        $rootScope = _$rootScope_;
    }));

    it('set the expected CSS class', function () {
        var el = getDropEl($rootScope);

        expect(el.find('.bb-file-drop')).toExist();
    });

    it('should be localizable', function () {
        var acceptEl,
            el = getDropWithLinkEl($rootScope),
            linkEl,
            notOverEl,
            rejectEl;

        notOverEl = getNotOverEl(el);
        acceptEl = getAcceptEl(el);
        rejectEl = getRejectEl(el);
        linkEl = getLinkEl(el);

        expect(notOverEl.find('h4')).toHaveText(bbResources.file_upload_drag_file_here);
        expect(notOverEl.find('h5')).toHaveText(bbResources.file_upload_or_click_to_browse);

        expect(acceptEl.find('h4')).toHaveText(bbResources.file_upload_drop_files_here);
        expect(rejectEl.find('h4')).toHaveText(bbResources.file_upload_invalid_file);

        expect(linkEl.find('.bb-file-drop-link-header')).toHaveText(bbResources.file_upload_paste_link);
        expect(getLinkInputEl(linkEl).attr('placeholder')).toBe(bbResources.file_upload_link_placeholder);
        expect(getLinkSubmitEl(linkEl)).toHaveText(bbResources.file_upload_paste_link_done);
    });

    it('should show the appropriate message when a file is dragged over the element', function () {
        var acceptEl,
            el = getDropEl($rootScope),
            notOverEl,
            rejectEl;

        el.appendTo(document.body);

        notOverEl = getNotOverEl(el);
        acceptEl = getAcceptEl(el);
        rejectEl = getRejectEl(el);

        expect(notOverEl).toBeVisible();
        expect(acceptEl).toBeHidden();
        expect(rejectEl).toBeHidden();

        el.addClass('bb-file-drop-accept');

        expect(notOverEl).toBeHidden();
        expect(acceptEl).toBeVisible();
        expect(rejectEl).toBeHidden();

        el.removeClass('bb-file-drop-accept').addClass('bb-file-drop-reject');

        expect(notOverEl).toBeHidden();
        expect(acceptEl).toBeHidden();
        expect(rejectEl).toBeVisible();

        el.remove();
    });

    it('should pass the specified options to the underlying ng-file-upload directive', function () {
        var $scope = $rootScope.$new(),
            attrs,
            el = angular.element('<div bb-file-drop></div>'),
            fileDropEl,
            ngfProp,
            p;

        attrs = {
            'bb-file-drop-allow-dir': 'false',
            'bb-file-drop-accept': '\'.png\'',
            'bb-file-drop-multiple': 'false',
            'bb-file-drop-min-size': '10',
            'bb-file-drop-max-size': '100'
        };

        el.attr(attrs);

        el = $compile(el)($scope);

        $scope.$digest();

        fileDropEl = el.find('.bb-file-drop');

        for (p in attrs) {
            if (attrs.hasOwnProperty(p)) {
                ngfProp = p.replace('bb-file-drop-', 'ngf-');
                expect(fileDropEl).toHaveAttr(ngfProp, attrs[p]);
            }
        }
    });

    it('should call the specified callback when a file is dropped', function () {
        var $scope = $rootScope.$new(),
            el,
            fileDroppedSpy,
            files,
            rejectedFiles;

        files = [
            {
                name: 'abc.jpg'
            }
        ];

        rejectedFiles = [
            {
                name: 'xyz.jpg'
            }
        ];

        $scope.fileDropped = angular.noop;

        fileDroppedSpy = spyOn($scope, 'fileDropped');

        el = getDropEl($scope);

        el.isolateScope().bbFileDrop.fileChange(files, {}, rejectedFiles);

        expect(fileDroppedSpy).toHaveBeenCalledWith(files, rejectedFiles);
    });

    it('should allow for custom HTML content to replace the default drop zone HTML', function () {
        var $scope = $rootScope.$new(),
            el;

        el = $compile('<div bb-file-drop><div class="file-drop-transclude-test"></div></div>')($scope);

        $scope.$digest();

        expect(el.find('.file-drop-transclude-test')).toExist();
        expect(el.find('.bb-file-drop-contents')).not.toExist();
    });

    it('should optionally display an element that allows links to be added', function () {
        var $scope = $rootScope.$new(),
            el;

        el = getDropEl($scope);

        expect(el.find('.bb-file-drop-col:first')).not.toHaveClass('col-sm-6');
        expect(getLinkEl(el)).not.toExist();

        el = getDropWithLinkEl($scope);

        expect(el.find('.bb-file-drop-col:first')).toHaveClass('col-sm-6');
        expect(getLinkEl(el)).toExist();
    });

    it('should disable the submit button when no URL is specified', function () {
        var $scope = $rootScope.$new(),
            el,
            inputEl,
            linkEl,
            submitEl,
            url = 'http://test.com';

        $scope.addLink = angular.noop;

        el = getDropWithLinkEl($scope);

        linkEl = getLinkEl(el);
        submitEl = getLinkSubmitEl(linkEl);
        inputEl = getLinkInputEl(linkEl);

        expect(submitEl).toBeDisabled();

        inputEl.val(url).change();

        $scope.$digest();

        expect(submitEl).not.toBeDisabled();
    });

    it('should call the specified callback when a hyperlink is added', function () {
        var $scope = $rootScope.$new(),
            addLinkSpy,
            el,
            inputEl,
            linkEl,
            submitEl,
            url = 'http://test.com';

        $scope.addLink = angular.noop;

        addLinkSpy = spyOn($scope, 'addLink');

        el = getDropWithLinkEl($scope);

        // The element has to be in the DOM to trigger its change event in Firefox.
        el.appendTo(document.body);

        linkEl = getLinkEl(el);
        submitEl = getLinkSubmitEl(linkEl);
        inputEl = getLinkInputEl(linkEl);

        inputEl.val(url).change();

        $scope.$digest();

        submitEl.click();

        expect(addLinkSpy).toHaveBeenCalledWith({
            url: url
        });

        el.remove();
    });

    it('should call the specified callback when a hyperlink is entered and the user presses the Enter key', function () {
        var $scope = $rootScope.$new(),
            addLinkSpy,
            e,
            el,
            inputEl,
            linkEl,
            submitEl,
            url = 'http://test.com';

        $scope.addLink = angular.noop;

        addLinkSpy = spyOn($scope, 'addLink');

        el = getDropWithLinkEl($scope);

        // The element has to be in the DOM to trigger its change event in Firefox.
        el.appendTo(document.body);

        linkEl = getLinkEl(el);
        submitEl = getLinkSubmitEl(linkEl);
        inputEl = getLinkInputEl(linkEl);

        inputEl.val(url).change();

        $scope.$digest();

        e = $.Event('keypress');
        e.which = 13;
        e.keyCode = 13;

        inputEl.trigger(e);

        expect(addLinkSpy).toHaveBeenCalledWith({
            url: url
        });

        el.remove();
    });

    it('should not error when no add link callback is specified', function () {
        var $scope = $rootScope.$new(),
            el,
            inputEl,
            linkEl,
            submitEl,
            url = 'http://test.com';

        $scope.addLink = angular.noop;

        el = $compile('<div bb-file-drop bb-file-drop-link></div>')($scope);

        $scope.$digest();

        linkEl = getLinkEl(el);
        submitEl = getLinkSubmitEl(linkEl);
        inputEl = getLinkInputEl(linkEl);

        inputEl.val(url).change();

        $scope.$digest();

        submitEl.click();
    });

    it('should allow selecting of files only when the "noclick" attribute is not specified', function () {
        var $scope = $rootScope.$new(),
            clickToBrowseSelector = 'h5',
            dropSelector = '.bb-file-drop',
            el,
            noclickCls = 'bb-file-drop-noclick';

        el = $compile('<div bb-file-drop></div>')($scope);

        el.appendTo(document.body);

        $scope.$digest();

        expect(el.find(dropSelector)).toHaveAttr('ngf-select');
        expect(el.find(dropSelector)).not.toHaveClass(noclickCls);
        expect(el.find(clickToBrowseSelector)).toBeVisible();

        el.remove();

        el = $compile('<div bb-file-drop bb-file-drop-noclick></div>')($scope);

        el.appendTo(document.body);

        $scope.$digest();

        expect(el.find(dropSelector)).not.toHaveAttr('ngf-select');
        expect(el.find(dropSelector)).toHaveClass(noclickCls);
        expect(el.find(clickToBrowseSelector)).toBeHidden();

        el.remove();
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

        el = getDropEl($scope);

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
