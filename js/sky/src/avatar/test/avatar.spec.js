/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Avatar directive', function () {
    'use strict';

    var $compile,
        $filter,
        $rootScope,
        bbAvatarConfig,
        bbFormat,
        bbResources,
        defaultCanvasSize = 100,
        fakeErrorModal,
        fakeWindow,
        imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';

    beforeEach(module(
        'ngMock',
        'sky.avatar',
        'sky.fileattachments.filesize',
        'sky.format',
        'sky.templates'
    ));

    beforeEach(module(function ($provide) {
        fakeWindow = {
            File: function () {},
            URL: {
                createObjectURL: function () {
                    return imgUrl;
                },
                revokeObjectURL: function () {}
            },
            navigator: {
                userAgent: ''
            }
        };

        $provide.value('$window', fakeWindow);

        fakeErrorModal = {
            open: function () {}
        };

        $provide.value('bbErrorModal', fakeErrorModal);
    }));

    beforeEach(inject(function (_$compile_, _$filter_, _$rootScope_, _bbAvatarConfig_, _bbFormat_, _bbResources_) {
        $compile = _$compile_;
        $filter = _$filter_;
        $rootScope = _$rootScope_;
        bbAvatarConfig = _bbAvatarConfig_;
        bbFormat = _bbFormat_;
        bbResources = _bbResources_;
    }));

    function getPhotoEl(el) {
        return el.find('.bb-avatar-image');
    }

    function getPlaceholderEl(el) {
        return el.find('.bb-avatar-initials');
    }

    function validateImageVisible(el, visible) {
        var hiddenEl,
            photoEl = getPhotoEl(el),
            placeholderEl = getPlaceholderEl(el),
            visibleEl;

        if (visible) {
            hiddenEl = placeholderEl;
            visibleEl = photoEl;
        } else {
            visibleEl = placeholderEl;
            hiddenEl = photoEl;
        }

        expect(visibleEl).toBeVisible();
        expect(hiddenEl).not.toBeVisible();
    }

    function validateImageUrl(el, url) {
        var backgroundImage = getPhotoEl(el).css('background-image'),
            matches;

        // Some browsers return quotes around the URL and some don't; account for both.
        matches = backgroundImage === 'url("' + url + '")' || backgroundImage === 'url(' + url + ')';

        expect(matches).toBe(true);
    }

    function createElNoImageUrl($scope) {
        return $compile('<bb-avatar bb-avatar-name="\'Bobby Earl\'"></bb-avatar>')($scope);
    }

    function validatePixelRatio(pixelRatio) {
        var el,
            expectedValue,
            placeholderEl,
            $scope = $rootScope.$new();

        expectedValue = ((pixelRatio || 1) * defaultCanvasSize).toString();

        fakeWindow.devicePixelRatio = pixelRatio;

        el = createElNoImageUrl($scope);

        $scope.$digest();

        placeholderEl = getPlaceholderEl(el);

        expect(placeholderEl).toHaveAttr('height', expectedValue);
        expect(placeholderEl).toHaveAttr('width', expectedValue);
    }

    it('should display an image when an image URL is specified', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-avatar bb-avatar-src="imgUrl"></bb-avatar>')($scope);
        el.appendTo(document.body);

        $scope.imgUrl = imgUrl;

        $scope.$digest();

        validateImageVisible(el, true);

        validateImageUrl(el, imgUrl);

        el.remove();
    });

    it('should display a placeholder when no image URL is specified', function () {
        var el,
            $scope = $rootScope.$new();

        el = createElNoImageUrl($scope);

        el.appendTo(document.body);

        $scope.$digest();

        validateImageVisible(el, false);

        el.remove();
    });

    it('should display nothing if no image or name is specified', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-avatar bb-avatar-name="name"></bb-avatar>')($scope);
        el.appendTo(document.body);

        $scope.$digest();

        expect(getPhotoEl(el)).not.toBeVisible();
        expect(getPlaceholderEl(el)).not.toBeVisible();

        el.remove();
    });

    it('should display initials any time the name is updated', function () {
        var el,
            fillTextSpy,
            $scope = $rootScope.$new();

        function validateDraw(expectedInitials) {
            expect(fillTextSpy.calls.mostRecent().args[0]).toBe(expectedInitials);
        }

        el = $compile('<bb-avatar bb-avatar-name="name"></bb-avatar>')($scope);

        // There's not a great way to check whether the initials have been rendered since it's drawn
        // using canvas; just look to see if the expected function was called with the expected parameters.
        fillTextSpy = spyOn(CanvasRenderingContext2D.prototype, 'fillText').and.callThrough();

        $scope.name = 'Patrick O\'Friel';
        $scope.$digest();

        validateDraw('PO');

        // Make sure the initials change when the name changes.
        $scope.name = 'Bobby Earl';
        $scope.$digest();

        validateDraw('BE');
    });

    it('should display a HiDPI placeholder image on high-density pixel displays', function () {
        validatePixelRatio(2);
        validatePixelRatio(3);
    });

    it('should notify the consumer when the user chooses a new image', function () {
        var droppedFile,
            el,
            photoChangeSpy,
            $scope = $rootScope.$new();

        el = $compile('<bb-avatar bb-avatar-change="photoChange(file)"></bb-avatar>')($scope);

        $scope.photoChange = function () {

        };
 
        photoChangeSpy = spyOn($scope, 'photoChange');

        droppedFile = new fakeWindow.File();

        $scope.$digest();

        el.isolateScope().$ctrl.photoDrop([droppedFile]);

        expect(photoChangeSpy).toHaveBeenCalledWith(droppedFile);
    });

    function validateInvalidFileError(droppedFile, expectedErrorTitle, expectedErrorDescription) {
        var el,
            fakeErrorOpenSpy,
            $scope = $rootScope.$new();

        el = $compile('<bb-avatar bb-avatar-change="photoChange(file)"></bb-avatar>')($scope);

        $scope.$digest();

        fakeErrorOpenSpy = spyOn(fakeErrorModal, 'open');

        el.isolateScope().$ctrl.photoDrop([], [droppedFile]);

        expect(fakeErrorOpenSpy).toHaveBeenCalledWith({
            errorDescription: expectedErrorDescription,
            errorTitle: expectedErrorTitle
        });
    }

    it('should display an error if the user chooses a file that is not an image', function () {
        var droppedFile;

        droppedFile = new fakeWindow.File();
        droppedFile.type = 'text/plain';

        validateInvalidFileError(
            droppedFile,
            bbResources.avatar_error_not_image_title,
            bbResources.avatar_error_not_image_description
        );
    });

    it('should display an error if the user chooses an image whose file size is too large', function () {
        var droppedFile,
            errorDescription,
            maxFileSizeFormatted;

        droppedFile = new fakeWindow.File();
        droppedFile.type = 'image/png';
        droppedFile.size = bbAvatarConfig.maxFileSize + 1;

        maxFileSizeFormatted = $filter('bbFileSize')(bbAvatarConfig.maxFileSize);

        errorDescription = bbFormat.formatText(bbResources.avatar_error_too_large_description, maxFileSizeFormatted);

        validateInvalidFileError(
            droppedFile,
            bbResources.avatar_error_too_large_title,
            errorDescription
        );
    });

    function createFileEl($scope) {
        return $compile('<bb-avatar bb-avatar-src="srcFile"></bb-avatar>')($scope);
    }

    it('should show the avatar when the specified source is a File object', function () {
        var el,
            $scope = $rootScope.$new();

        el = createFileEl($scope);

        $scope.srcFile = new fakeWindow.File();

        $scope.$digest();

        validateImageUrl(el, imgUrl);
    });

    it('should clean up the previous object URL created when the specified source was a File object', function () {
        var el,
            revokeSpy,
            $scope = $rootScope.$new();

        el = createFileEl($scope);

        $scope.srcFile = new fakeWindow.File();

        $scope.$digest();

        revokeSpy = spyOn(fakeWindow.URL, 'revokeObjectURL');

        $scope.srcFile = new fakeWindow.File();
        $scope.$digest();

        expect(revokeSpy).toHaveBeenCalledWith(imgUrl);
    });

    it('should clean up the current object URL created when the specified source is a File object and the scope is destroyed', function () {
        var el,
            revokeSpy,
            $scope = $rootScope.$new();

        el = createFileEl($scope);

        $scope.srcFile = new fakeWindow.File();

        $scope.$digest();

        revokeSpy = spyOn(fakeWindow.URL, 'revokeObjectURL');

        $scope.$destroy();

        expect(revokeSpy).toHaveBeenCalledWith(imgUrl);
    });
});
