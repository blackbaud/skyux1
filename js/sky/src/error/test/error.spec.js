/*jshint browser: true, jasmine: true */
/*global inject, module, angular */

describe('Error', function () {
    'use strict';

    var bbResources,
        $compile,
        $scope,
        imgUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAABCAYAAAD0In+KAAAAFElEQVR42gEJAPb/AP//////////I+UH+Rtap+gAAAAASUVORK5CYII=';

    beforeEach(module('ngMock'));
    beforeEach(module('sky.error'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _bbResources_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        bbResources = _bbResources_;
    }));

    function getErrorImage(el) {
        return el.find('.bb-error-image img');
    }

    function getErrorHeader(el) {
        return el.find('.bb-error-title');
    }

    function getErrorDescription(el) {
        return el.find('.bb-error-description');
    }

    function getErrorAction(el) {
        return el.find('.bb-error-action button');
    }

    it('should be able to show a header, description, image, and action button', function () {
        var actionClicked = false,
            actionEl,
            imageEl,
            descriptionEl,
            headerEl,
            el = angular.element('<bb-error>' +
            '<bb-error-image>' +
              '<img ng-src="{{imgUrl}}"/>' +
            '</bb-error-image>' +
            '<bb-error-title>' +
              '{{errorHeader}}' +
            '</bb-error-title>' +
            '<bb-error-description>' +
              '{{errorDescription}}' +
            '</bb-error-description>' +
            '<bb-error-action>' +
              '<button type="button" class="btn-primary btn" ng-click="action()">{{actionName}}</button>' +
            '</bb-error-action>' +
          '</bb-error>');

        $scope.errorHeader = 'My Header';
        $scope.errorDescription = 'My Description';
        $scope.action = function () {
            actionClicked = true;
        };
        $scope.imgUrl = imgUrl;
        $scope.actionName = 'My Action';

        $compile(el)($scope);
        el.appendTo(document.body);

        $scope.$digest();

        imageEl = getErrorImage(el);
        expect(imageEl).toBeVisible();
        expect(imageEl).toHaveAttr('src', imgUrl);

        headerEl = getErrorHeader(el);
        expect(headerEl).toHaveText('My Header');
        expect(headerEl).toBeVisible();

        descriptionEl = getErrorDescription(el);
        expect(descriptionEl).toHaveText('My Description');
        expect(descriptionEl).toBeVisible();

        actionEl = getErrorAction(el);
        expect(actionEl).toHaveText('My Action');
        expect(actionEl).toHaveClass('btn-primary');
        expect(actionEl).toBeVisible();
        actionEl.click();
        expect(actionClicked).toBe(true);
        $scope.$destroy();
        el.remove();
    });

    it('should not show components that are not specified', function () {
        var actionEl,
            imageEl,
            descriptionEl,
            headerEl,
            el = angular.element('<bb-error>' +
            '<bb-error-title>' +
              '{{errorHeader}}' +
            '</bb-error-title>' +
            '<bb-error-description>' +
              '{{errorDescription}}' +
            '</bb-error-description>' +
          '</bb-error>');

        $scope.errorHeader = 'My Header';
        $scope.errorDescription = 'My Description';

        el.appendTo(document.body);

        $compile(el)($scope);

        $scope.$digest();
        imageEl = getErrorImage(el);
        expect(imageEl).not.toBeVisible();

        headerEl = getErrorHeader(el);
        expect(headerEl).toHaveText('My Header');
        expect(headerEl).toBeVisible();

        descriptionEl = getErrorDescription(el);
        expect(descriptionEl).toHaveText('My Description');
        expect(descriptionEl).toBeVisible();

        actionEl = getErrorAction(el);
        expect(actionEl).not.toBeVisible();

        el.remove();

    });

    describe('errorTypes', function () {

        it('should show the default messaging and image for broken type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="broken">' +
                    '</bb-error>');

            el.appendTo(document.body);

            $compile(el)($scope);

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-broken');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_broken);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText(bbResources.error_description_broken);
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should show the default messageing and image for construction type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="construction">' +
                    '</bb-error>');

            el.appendTo(document.body);

            $compile(el)($scope);

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-construction');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_construction);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText(bbResources.error_description_construction);
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should show the default messaging and image for notFound type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="notFound">' +
                    '</bb-error>');

            el.appendTo(document.body);

            $compile(el)($scope);

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-notfound');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_notfound);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText('');
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should allow overriding an image when using an error type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="broken">' +
                    '<bb-error-image>' +
                    '<img ng-src="{{imgUrl}}"/>' +
                    '</bb-error-image>' +
                    '</bb-error>');

            el.appendTo(document.body);

            $scope.imgUrl = imgUrl;

            $compile(el)($scope);

            $scope.$digest();
            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).not.toHaveClass('bb-error-image-broken');
            expect(imageEl).toHaveAttr('src', imgUrl);

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_broken);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText(bbResources.error_description_broken);
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should allow overriding a title when using an error type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="notFound">' +
                    '<bb-error-title>' +
                    '{{errorHeader}}' +
                    '</bb-error-title>' +
                    '</bb-error>');

            el.appendTo(document.body);

            $compile(el)($scope);

            $scope.errorHeader = 'New not found';

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-notfound');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText($scope.errorHeader);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText('');
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should allow overriding a description when using an error type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                el = angular.element('<bb-error error-type="construction">' +
                    '<bb-error-description>' +
                    '{{errorDescription}}' +
                    '</bb-error-description>' +
                    '</bb-error>');

            el.appendTo(document.body);

            $scope.errorDescription = 'A different error description';

            $compile(el)($scope);

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-construction');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_construction);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText($scope.errorDescription);
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).not.toBeVisible();

            el.remove();
        });

        it('should allow adding an action when using an error type', function () {
            var actionEl,
                imageEl,
                descriptionEl,
                headerEl,
                actionClicked,
                el = angular.element('<bb-error error-type="broken">' +
                    '<bb-error-action>' +
                        '<button type="button" class="btn-primary btn" ng-click="action()">{{actionName}}</button>' +
                    '</bb-error-action>' +
                    '</bb-error>');

            el.appendTo(document.body);

            $scope.action = function () {
                actionClicked = true;
            };
            $scope.actionName = 'My Action';

            $compile(el)($scope);

            $scope.$digest();
            imageEl = getErrorImage(el);
            expect(imageEl).toBeVisible();
            expect(imageEl).toHaveClass('bb-error-image-broken');

            headerEl = getErrorHeader(el);
            expect(headerEl).toHaveText(bbResources.error_title_broken);
            expect(headerEl).toBeVisible();

            descriptionEl = getErrorDescription(el);
            expect(descriptionEl).toHaveText(bbResources.error_description_broken);
            expect(descriptionEl).toBeVisible();

            actionEl = getErrorAction(el);
            expect(actionEl).toHaveText('My Action');
            expect(actionEl).toHaveClass('btn-primary');
            expect(actionEl).toBeVisible();
            actionEl.click();
            expect(actionClicked).toBe(true);
            $scope.$destroy();
            el.remove();
        });
    });

});
