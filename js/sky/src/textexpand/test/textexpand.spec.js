/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Text expand', function () {
    'use strict';

    var bbModal,
        bbResources,
        fxOff,
        $compile,
        $scope,
        $animate;

    beforeEach(module('ngMock'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module('sky.templates'));
    beforeEach(module('sky.textexpand'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _bbResources_, _bbModal_, _$animate_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        bbResources = _bbResources_;
        bbModal = _bbModal_;
        $animate = _$animate_;
    }));

    beforeEach(function () {
        // Remove animation delay so tests don't have to be asynchronous.
        fxOff = $.fx.off;
        $.fx.off = true;
    });

    afterEach(function () {
        $.fx.off = fxOff;
    });

    describe('directive', function () {
        var collapsedText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
            longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

        it('should initially collapse text', function () {
            var el = $compile('<div bb-text-expand="longText"></div>')($scope);

            $scope.longText = longText;

            $scope.$digest();

            expect(el.find('.bb-text-expand-text')).toHaveText(collapsedText);
        });

        it('should not collapse short text', function () {
            var el = $compile('<div bb-text-expand="longText"></div>')($scope);

            $scope.longText = 'hi';
            $scope.$digest();

            expect(el).toHaveText('hi');

            // Ensure that when the element is updated with long text that it still collapses.
            $scope.longText = longText;
            $scope.$digest();

            expect(el.find('.bb-text-expand-text')).toHaveText(collapsedText);
        });

        it('should allow for custom max length', function () {
            var el = $compile('<div bb-text-expand="longText" bb-text-expand-max-length="11"></div>')($scope);

            $scope.longText = longText;
            $scope.$digest();

            expect(el.find('.bb-text-expand-text')).toHaveText('Lorem ipsum');
        });

        it('should not break whole words in half', function () {
            var el = $compile('<div bb-text-expand="longText" bb-text-expand-max-length="15"></div>')($scope);

            $scope.longText = longText;
            $scope.$digest();

            expect(el.find('.bb-text-expand-text')).toHaveText('Lorem ipsum');
        });

        it('should collapse line breaks to spaces', function () {
            var el = $compile('<div bb-text-expand="longText"></div>')($scope);

            $scope.longText = 'a\nb';

            $scope.$digest();


            expect(el.find('.bb-text-expand-text')).toHaveText('a b');
        });

        describe('see more link', function () {
            it('should expand and collapse text', function () {
                var el = $compile('<div bb-text-expand="longText"></div>')($scope),
                    expandTextEl,
                    seeMoreEl;

                el.appendTo(document.body);

                $scope.longText = longText;
                $scope.$digest();

                expandTextEl = el.find('.bb-text-expand-text');
                seeMoreEl = el.find('.bb-text-expand-see-more');

                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_more);

                seeMoreEl.click();

                expect(expandTextEl).toHaveText(longText);
                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_less);

                seeMoreEl.click();

                expect(expandTextEl).toHaveText(collapsedText);
                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_more);

                el.remove();
            });

            it('should allow for custom max expanded length', function () {
                var el = $compile('<div bb-text-expand="longText" bb-text-expand-max-length="20" bb-text-expand-max-expanded-length="50"></div>')($scope);

                $scope.longText = longText;

                $scope.$digest();

                expect(el.find('.bb-text-expand-text')).toHaveText('Lorem ipsum dolor');
            });

            function closeModal(modalEl) {
                modalEl.find('.modal-footer .btn-link').click();
                $scope.$digest();
                $animate.flush();
                $scope.$digest();
                $animate.flush();
                $scope.$digest();
                $scope.$digest();
            }


            it('should open a modal for text greater than the expanded limit', function () {
                var el,
                    modalEl;

                spyOn(bbModal, 'open').and.callThrough();

                el = $compile('<div bb-text-expand="longText" bb-text-expand-modal-title="modalTitle" bb-text-expand-max-length="20" bb-text-expand-max-expanded-length="50"></div>')($scope);

                $scope.longText = longText;

                $scope.$digest();

                el.find('.bb-text-expand-see-more').click();

                $scope.$digest();
                expect(bbModal.open).toHaveBeenCalled();

                modalEl = $('.modal-dialog');

                expect(modalEl.find('.bb-dialog-header')).toHaveText('Expanded view');
                expect(modalEl.find('.modal-body')).toHaveText(longText);
                closeModal(modalEl);

                $scope.modalTitle = 'new title';
                $scope.$digest();
                el.find('.bb-text-expand-see-more').click();
                $scope.$digest();

                modalEl = $('.modal-dialog');
                expect(modalEl.find('.bb-dialog-header')).toHaveText('new title');
                closeModal(modalEl);
            });

            it('should open a modal for text greater than the newline limit', function () {
                var el,
                    modalEl,
                    newlineText = 'hey\nhey\nhey\n';

                spyOn(bbModal, 'open').and.callThrough();

                el = $compile('<div bb-text-expand="longText" bb-text-expand-modal-title="modalTitle" bb-text-expand-max-expanded-length="50"></div>')($scope);

                $scope.longText = newlineText;

                $scope.$digest();

                el.find('.bb-text-expand-see-more').click();

                $scope.$digest();
                expect(bbModal.open).toHaveBeenCalled();

                modalEl = $('.modal-dialog');

                expect(modalEl.find('.bb-dialog-header')).toHaveText('Expanded view');
                closeModal(modalEl);

            });

        });
    });

    describe('repeater directive', function () {

        it('should not error when data is null or when there are fewer items than the max', function () {
            var el;

            el = $compile(
                '<ul bb-text-expand-repeater bb-text-expand-repeater-max="2" bb-text-expand-repeater-data="items">' +
                    '<li ng-repeat="item in items">{{item}}</li>' +
                '</ul>'
            )($scope);

            $scope.$digest();

            $scope.items = [
                'Item 1'
            ];

            $scope.$digest();
        });

        describe('see more link', function () {
            it('should toggle visiblity of extra items', function () {
                var el,
                    elToHide,
                    seeMoreEl;

                el = $compile(
                    '<ul bb-text-expand-repeater bb-text-expand-repeater-max="2" bb-text-expand-repeater-data="items">' +
                        '<li ng-repeat="item in items">{{item}}</li>' +
                    '</ul>'
                )($scope);

                el.appendTo(document.body);

                $scope.$digest();

                $scope.items = [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4'
                ];

                $scope.$digest();

                elToHide = el.find('li:gt(2)');
                seeMoreEl = el.find('.bb-text-expand-see-more');

                // Validate initial state.
                expect(elToHide).not.toBeVisible();
                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_more);

                seeMoreEl.click();

                expect(elToHide).toBeVisible();
                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_less);

                seeMoreEl.click();

                expect(elToHide).not.toBeVisible();
                expect(seeMoreEl).toHaveText(bbResources.text_expand_see_more);

                el.remove();
            });
        });
    });
});
