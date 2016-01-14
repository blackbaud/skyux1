/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('File item directive', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module(
        'ngMock',
        'sky.fileattachments.fileitem',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    function getFileItemEl($scope, file) {
        var el = $compile('<div bb-file-item="file"></div>')($scope);

        $scope.file = file;
        $scope.$digest();

        return el;
    }

    function getNameEl(el) {
        return el.find('.bb-file-item-name');
    }

    function getSizeEl(el) {
        return el.find('.bb-file-item-size');
    }

    it('should display the file size', function () {
        var $scope = $rootScope.$new(),
            el,
            file;

        file = {
            size: 200
        };

        el = getFileItemEl($scope, file);

        expect(el.find('.bb-file-item-size')).toHaveText('(200 bytes)');
    });

    it('should display the file name', function () {
        var $scope = $rootScope.$new(),
            el,
            file;

        file = {
            name: 'abc.jpg'
        };

        el = getFileItemEl($scope, file);

        expect(getNameEl(el)).toHaveText(file.name);
    });

    it('should call the specified delete callback when the delete button is clicked', function () {
        var $scope = $rootScope.$new(),
            deleteSpy,
            el,
            file;

        file = {
            name: 'abc.jpg'
        };

        el = $compile('<div bb-file-item="file" bb-file-item-delete="deleteItem(file)"></div>')($scope);

        $scope.file = file;
        $scope.deleteItem = angular.noop;

        $scope.$digest();

        deleteSpy = spyOn($scope, 'deleteItem').and.callThrough();

        el.find('.bb-file-item-btn-delete').click();

        expect(deleteSpy).toHaveBeenCalledWith(file);
    });

    it('should not display a size when no size is defined', function () {
        var $scope = $rootScope.$new(),
            el,
            file;

        file = {
            name: 'abc.jpg'
        };

        el = getFileItemEl($scope, file);

        expect(getSizeEl(el)).not.toExist();
    });

    it('should not display the URL when an item is a link', function () {
        var $scope = $rootScope.$new(),
            el,
            file;

        file = {
            url: 'http://test.com'
        };

        el = getFileItemEl($scope, file);

        expect(getNameEl(el)).toHaveText(file.url);
    });

    it('should display known image types as thumbnails and other documents as an icon', function () {
        var $scope = $rootScope.$new(),
            imgSelector = '.bb-file-item-preview-img',
            otherSelector = '.bb-file-item-preview-other';

        function validateThumbnailVisible(file, visible) {
            var el = getFileItemEl($scope, file);

            if (visible) {
                expect(el).toContainElement(imgSelector);
                expect(el).not.toContainElement(otherSelector);
            } else {
                expect(el).not.toContainElement(imgSelector);
                expect(el).toContainElement(otherSelector);
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

    it('should display a preview image when a URL is provided with the file (e.g. an edit scenario)', function () {
        var $scope = $rootScope.$new(),
            el,
            imgSelector = '.bb-file-item-preview-img',
            imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';

        el = getFileItemEl($scope, {
            name: 'abc.png',
            type: 'image/png',
            url: imgUrl
        });

        expect(el.find(imgSelector)).toHaveAttr('src', imgUrl);
    });

    it('should display the appropriate preview icon based on file type', function () {
        var $scope = $rootScope.$new(),
            el;

        function validateFileTypeIcon(fileName, fileType, expected) {
            $scope.file = {
                name: fileName,
                type: fileType
            };

            $scope.$digest();

            expect(el).toContainElement('.bb-file-item-preview-other i.fa.fa-file-' + expected);
        }

        // Don't pass a file here; this ensures that the logic for getting the icon doesn't throw
        // an error when no file is specified.
        el = getFileItemEl($scope);

        validateFileTypeIcon('abc', '', 'o');

        // These rely on the file extension.
        validateFileTypeIcon('abc.pdf', 'application/pdf', 'pdf-o');

        validateFileTypeIcon('abc.htm', 'text/html', 'code-o');
        validateFileTypeIcon('abc.html', 'text/html', 'code-o');

        validateFileTypeIcon('abc.rar', 'application/x-rar-compressed', 'archive-o');
        validateFileTypeIcon('abc.tar.gz', 'application/x-tar', 'archive-o');
        validateFileTypeIcon('abc.tgz', 'application/x-tar', 'archive-o');
        validateFileTypeIcon('abc.zip', 'application/zip', 'archive-o');

        validateFileTypeIcon('abc.doc', 'application/msword', 'word-o');
        validateFileTypeIcon('abc.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'word-o');

        validateFileTypeIcon('abc.ppt', 'application/vnd.ms-powerpoint', 'powerpoint-o');
        validateFileTypeIcon('abc.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'powerpoint-o');

        validateFileTypeIcon('abc.xls', 'application/vnd.ms-excel', 'excel-o');
        validateFileTypeIcon('abc.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'excel-o');

        // These rely on the MIME type.
        validateFileTypeIcon('abc.mp3', 'audio/mp3', 'audio-o');
        validateFileTypeIcon('abc.wav', 'audio/wav', 'audio-o');

        validateFileTypeIcon('abc.tif', 'image/tiff', 'image-o');
        validateFileTypeIcon('abc.xbm', 'image/xbm', 'image-o');

        validateFileTypeIcon('abc.txt', 'text/plain', 'text-o');
        validateFileTypeIcon('abc.css', 'text/css', 'text-o');

        validateFileTypeIcon('abc.mov', 'video/quicktime', 'video-o');
        validateFileTypeIcon('abc.m4v', 'video/mp4', 'video-o');
    });
});
