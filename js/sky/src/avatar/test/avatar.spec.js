/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Avatar directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        fakeWindow,
        imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';

    beforeEach(module('ngMock'));
    beforeEach(module('sky.avatar'));
    beforeEach(module('sky.templates'));

    beforeEach(module(function ($provide) {
        fakeWindow = {
            File: function () {},
            URL: {
                createObjectURL: function () {
                    return imgUrl;
                },
                revokeObjectURL: function () {}
            }
        };

        $provide.value('$window', fakeWindow);
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
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

        expectedValue = ((pixelRatio || 1) * 100).toString();

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

    it('should display a simple colored circle if no image or name is specified', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-avatar bb-avatar-name="name"></bb-avatar>')($scope);
        el.appendTo(document.body);

        $scope.$digest();

        validateImageVisible(el, false);

        el.remove();
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

        el.isolateScope().bbAvatar.photoDrop([droppedFile]);

        expect(photoChangeSpy).toHaveBeenCalledWith(droppedFile);
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
