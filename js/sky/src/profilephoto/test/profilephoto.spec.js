/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Profile photo directive', function () {
    'use strict';

    var $compile,
        $rootScope,
        fakeWindow,
        imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';

    beforeEach(module('ngMock'));
    beforeEach(module('sky.profilephoto'));
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
        return el.find('.bb-profile-photo-image');
    }

    function getPlaceholderEl(el) {
        return el.find('.bb-profile-photo-initials');
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

    function createElNoImageUrl($scope) {
        return $compile('<bb-profile-photo bb-profile-photo-name="\'Bobby Earl\'"></bb-profile-photo>')($scope);
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

        el = $compile('<bb-profile-photo bb-profile-photo-src="imgUrl"></bb-profile-photo>')($scope);
        el.appendTo(document.body);

        $scope.imgUrl = imgUrl;

        $scope.$digest();

        validateImageVisible(el, true);

        expect(getPhotoEl(el).css('background-image')).toBe('url("' + imgUrl + '")');

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

        el = $compile('<bb-profile-photo bb-profile-photo-name="name"></bb-profile-photo>')($scope);
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

        el = $compile('<bb-profile-photo bb-profile-photo-change="photoChange(file)"></bb-profile-photo>')($scope);

        $scope.photoChange = function () {

        };

        photoChangeSpy = spyOn($scope, 'photoChange');

        droppedFile = new fakeWindow.File();

        $scope.$digest();

        el.isolateScope().bbProfilePhoto.photoDrop([droppedFile]);

        expect(photoChangeSpy).toHaveBeenCalledWith(droppedFile);
    });

    function createFileEl($scope) {
        return $compile('<bb-profile-photo bb-profile-photo-src="srcFile"></bb-profile-photo>')($scope);
    }

    it('should show the profile photo when the specified source is a File object', function () {
        var el,
            $scope = $rootScope.$new();

        el = createFileEl($scope);

        $scope.srcFile = new fakeWindow.File();

        $scope.$digest();

        expect(getPhotoEl(el).css('background-image')).toBe('url("' + imgUrl + '")');
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
