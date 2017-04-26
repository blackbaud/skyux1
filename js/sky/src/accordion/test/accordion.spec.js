/*jshint browser: true, jasmine: true */
/*global inject, module, angular, $ */

/* 
    From https://github.com/angular-ui/bootstrap/blob/1.2.5/src/accordion/test/accordion.spec.js
    so that we can have graceful deprecation of accordion group element directive
*/

describe('uib-accordion', function () {
    'use strict';
    var $animate, $scope;

    beforeEach(module('sky.accordion.uibaccordiongroup'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module('uib/template/accordion/accordion.html'));
    beforeEach(module('uib/template/accordion/accordion-group.html'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$animate_, $rootScope) {
        $animate = _$animate_;
        $scope = $rootScope;
    }));

    describe('uib-accordion-group', function () {
        var scope, 
            $compile, 
            element, 
            groups,
            findGroupHeading,
            findGroupLink,
            findGroupBody;
        findGroupHeading = function (index) {
            return groups.eq(index).find('.panel-heading').eq(0);
        };
        findGroupLink = function (index) {
            return groups.eq(index).find('.accordion-toggle').eq(0);
        };
        findGroupBody = function (index) {
            return groups.eq(index).find('.panel-collapse').eq(0);
        };

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            scope = _$rootScope_;
            $compile = _$compile_;
        }));

        it('should allow custom templates', inject(function ($templateCache) {
            var tpl;
            $templateCache.put('foo/bar.html', '<div>baz</div>');

            tpl =
                '<uib-accordion>' +
                '<uib-accordion-group heading="title 1" template-url="foo/bar.html"></uib-accordion-group>' +
                '</uib-accordion>';

            element = $compile(tpl)(scope);
            scope.$digest();
            expect(element.find('[template-url]').html()).toBe('baz');
        }));

        describe('with static panels', function () {
            beforeEach(function () {
                var tpl;
                spyOn(Math, 'random').and.returnValue(0.1);
                tpl =
                '<div><uib-accordion>' +
                    '<uib-accordion-group heading="title 1">Content 1</uib-accordion-group>' +
                    '<uib-accordion-group heading="title 2">Content 2</uib-accordion-group>' +
                '</uib-accordion></div>';
                element = angular.element(tpl);
                $compile(element)(scope);
                scope.$digest();
                groups = element.find('.panel');
            });

            afterEach(function () {
                element.remove();
            });

            it('should create accordion panels with content', function () {
                expect(groups.length).toEqual(2);
                expect(findGroupLink(0).text()).toEqual('title 1');
                expect(findGroupBody(0).text().trim()).toEqual('Content 1');
                expect(findGroupLink(1).text()).toEqual('title 2');
                expect(findGroupBody(1).text().trim()).toEqual('Content 2');
            });

            it('should change selected element on click', function () {
                findGroupLink(0).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(true);
                expect(findGroupHeading(0).html()).toContain('aria-expanded="true"');

                findGroupLink(1).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(false);
                expect(findGroupHeading(0).html()).toContain('aria-expanded="false"');
                expect(findGroupBody(1).scope().isOpen).toBe(true);
                expect(findGroupHeading(1).html()).toContain('aria-expanded="true"');
            });

            it('should toggle element on click', function () {
                findGroupLink(0).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(true);
                expect(groups.eq(0).html()).toContain('aria-hidden="false"');

                findGroupLink(0).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(false);
                expect(groups.eq(0).html()).toContain('aria-hidden="true"');
            });

            it('should add, by default, "panel-open" when opened', function () {
                var group = groups.eq(0);
                findGroupLink(0).click();
                scope.$digest();
                group = groups.eq(0);
                expect(group).toHaveClass('panel-open');

                findGroupLink(0).click();
                scope.$digest();
                expect(group).not.toHaveClass('panel-open');
            });

            it('should toggle element on spacebar when focused', function () {
                var e,
                    group;
                group = groups.eq(0);
                findGroupLink(0)[0].focus();
                e = $.Event('keypress');
                e.which = 32;
                findGroupLink(0).trigger(e);

                expect(group).toHaveClass('panel-open');

                e = $.Event('keypress');
                e.which = 32;
                findGroupLink(0).trigger(e);

                expect(group).not.toHaveClass('panel-open');
            });

            it('should not toggle with any other keyCode', function () {
                var e,
                    group;
                group = groups.eq(0);
                findGroupLink(0)[0].focus();
                e = $.Event('keypress');
                e.which = 65;
                findGroupLink(0).trigger(e);

                expect(group).not.toHaveClass('panel-open');
            });

            it('should generate an Id for the heading', function () {
                var groupScope = findGroupBody(0).scope();
                expect(groupScope.headingId).toEqual('accordiongroup-' + groupScope.$id + '-1000-tab');
            });

            it('should generate an Id for the panel', function () {
                var groupScope = findGroupBody(0).scope();
                expect(groupScope.panelId).toEqual('accordiongroup-' + groupScope.$id + '-1000-panel');
            });
        });

        describe('with open-class attribute', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group heading="title 1" open-class="custom-open-class">Content 1</uib-accordion-group>' +
                    '<uib-accordion-group heading="title 2" open-class="custom-open-class">Content 2</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                $compile(element)(scope);
                scope.$digest();
                groups = element.find('.panel');
            });

            afterEach(function () {
                element.remove();
            });

            it('should add custom-open-class when opened', function () {
                var group = groups.eq(0);
                findGroupLink(0).click();
                scope.$digest();
                expect(group).toHaveClass('custom-open-class');

                findGroupLink(0).click();
                scope.$digest();
                expect(group).not.toHaveClass('custom-open-class');
            });
        });

        describe('with dynamic panels', function () {
            var model;
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group ng-repeat="group in groups" heading="{{group.name}}">{{group.content}}</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                model = [
                {name: 'title 1', content: 'Content 1'},
                {name: 'title 2', content: 'Content 2'}
                ];

                $compile(element)(scope);
                scope.$digest();
            });

            it('should have no panels initially', function () {
                groups = element.find('.panel');
                expect(groups.length).toEqual(0);
            });

            it('should have a panel for each model item', function () {
                scope.groups = model;
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.length).toEqual(2);
                expect(findGroupLink(0).text()).toEqual('title 1');
                expect(findGroupBody(0).text().trim()).toEqual('Content 1');
                expect(findGroupLink(1).text()).toEqual('title 2');
                expect(findGroupBody(1).text().trim()).toEqual('Content 2');
            });

            it('should react properly on removing items from the model', function () {
                scope.groups = model;
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.length).toEqual(2);

                scope.groups.splice(0, 1);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.length).toEqual(1);
            });
        });

        describe('is-open attribute', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group heading="title 1" is-open="open.first">Content 1</uib-accordion-group>' +
                    '<uib-accordion-group heading="title 2" is-open="open.second">Content 2</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                scope.open = { first: false, second: true };
                $compile(element)(scope);
                scope.$digest();
                groups = element.find('.panel');
            });

            it('should open the panel with isOpen set to true', function () {
                expect(findGroupBody(0).scope().isOpen).toBe(false);
                expect(findGroupBody(1).scope().isOpen).toBe(true);
            });

            it('should toggle variable on element click', function () {
                findGroupLink(0).click();
                scope.$digest();
                expect(scope.open.first).toBe(true);

                findGroupLink(0).click();
                scope.$digest();
                expect(scope.open.second).toBe(false);
            });
        });

        describe('is-open attribute with dynamic content', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group heading="title 1" is-open="open1"><div ng-repeat="item in items">{{item}}</div></uib-accordion-group>' +
                    '<uib-accordion-group heading="title 2" is-open="open2">Static content</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                scope.items = ['Item 1', 'Item 2', 'Item 3'];
                scope.open1 = true;
                scope.open2 = false;
                angular.element(document.body).append(element);
                $compile(element)(scope);
                scope.$digest();
                $animate.flush();
                groups = element.find('.panel');
            });

            afterEach(function () {
                element.remove();
            });

            it('should have visible panel body when the group with isOpen set to true', function () {
                expect(findGroupBody(0)).toHaveClass('in');
                expect(findGroupBody(1)).not.toHaveClass('in');
            });
        });

        describe('is-open attribute with dynamic groups', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group ng-repeat="group in groups" heading="{{group.name}}" is-open="group.open">{{group.content}}</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                scope.groups = [
                {name: 'title 1', content: 'Content 1', open: false},
                {name: 'title 2', content: 'Content 2', open: true}
                ];
                $compile(element)(scope);
                scope.$digest();

                groups = element.find('.panel');
            });

            it('should have visible group body when the group with isOpen set to true', function () {
                expect(findGroupBody(0).scope().isOpen).toBe(false);
                expect(findGroupBody(1).scope().isOpen).toBe(true);
            });

            it('should toggle element on click', function () {
                findGroupLink(0).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(true);
                expect(scope.groups[0].open).toBe(true);

                findGroupLink(0).click();
                scope.$digest();
                expect(findGroupBody(0).scope().isOpen).toBe(false);
                expect(scope.groups[0].open).toBe(false);
            });
        });

        describe('is-open attribute with custom class', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group ng-repeat="group in groups" heading="{{group.name}}" is-open="group.open" class="testClass">{{group.content}}</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                scope.groups = [
                {name: 'title 1', content: 'Content 1', open: false},
                {name: 'title 2', content: 'Content 2', open: true}
                ];
                $compile(element)(scope);
                scope.$digest();

                groups = element.find('.panel');
            });

            it('should add "panel-open" class', function () { 
                expect(groups.eq(0)).not.toHaveClass('panel-open');
                expect(groups.eq(1)).toHaveClass('panel-open');
            });
        });

        describe('`is-disabled` attribute', function () {
            var groupBody;
            beforeEach(function () {
                var tpl =
                '<uib-accordion>' +
                    '<uib-accordion-group heading="title 1" is-disabled="disabled">Content 1</uib-accordion-group>' +
                '</uib-accordion>';
                element = angular.element(tpl);
                scope.disabled = true;
                $compile(element)(scope);
                scope.$digest();
                groups = element.find('.panel');
                groupBody = findGroupBody(0);
            });

            it('should open the panel with isOpen set to true', function () {
                expect(groupBody.scope().isOpen).toBeFalsy();
            });

            it('should not toggle if disabled', function () {
                findGroupLink(0).click();
                scope.$digest();
                expect(groupBody.scope().isOpen).toBeFalsy();
            });

            it('should toggle after enabling', function () {
                scope.disabled = false;
                scope.$digest();
                expect(groupBody.scope().isOpen).toBeFalsy();

                findGroupLink(0).click();
                scope.$digest();
                expect(groupBody.scope().isOpen).toBeTruthy();
            });

            it('should have text-muted styling', function () {
                expect(findGroupLink(0).find('span:first')).toHaveClass('text-muted');
            });
        });

        // This is re-used in both the uib-accordion-heading element and the uib-accordion-heading attribute tests
        function isDisabledStyleCheck() {
            var tpl =
                '<uib-accordion ng-init="a = [1,2,3]">' +
                '<uib-accordion-group heading="I get overridden" is-disabled="true">' +
                    '<uib-accordion-heading>Heading Element <span ng-repeat="x in a">{{x}}</span> </uib-accordion-heading>' +
                    'Body' +
                '</uib-accordion-group>' +
                '</uib-accordion>';
            scope.disabled = true;
            element = $compile(tpl)(scope);
            scope.$digest();
            groups = element.find('.panel');

            expect(findGroupLink(0).find('span').hasClass('text-muted')).toBe(true);
        }

        describe('uib-accordion-heading element', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion ng-init="a = [1,2,3]">' +
                    '<uib-accordion-group heading="I get overridden">' +
                    '<uib-accordion-heading>Heading Element <span ng-repeat="x in a">{{x}}</span> </uib-accordion-heading>' +
                    'Body' +
                    '</uib-accordion-group>' +
                '</uib-accordion>';
                element = $compile(tpl)(scope);
                scope.$digest();
                groups = element.find('.panel');
            });

            it('transcludes the <uib-accordion-heading> content into the heading link', function () {
                expect(findGroupLink(0).text()).toBe('Heading Element 123 ');
            });

            it('attaches the same scope to the transcluded heading and body', function () {
                expect(findGroupLink(0).scope().$id).toBe(findGroupBody(0).scope().$id);
            });

            it('should wrap the transcluded content in a span', function () {
                expect(findGroupLink(0).find('span:first').length).toEqual(1);
            });

            it('should have disabled styling when is-disabled is true', isDisabledStyleCheck);
        });

        describe('uib-accordion-heading attribute', function () {
            beforeEach(function () {
                var tpl =
                '<uib-accordion ng-init="a = [1,2,3]">' +
                    '<uib-accordion-group heading="I get overridden">' +
                    '<div uib-accordion-heading>Heading Element <span ng-repeat="x in a">{{x}}</span> </div>' +
                    'Body' +
                    '</uib-accordion-group>' +
                '</uib-accordion>';
                element = $compile(tpl)(scope);
                scope.$digest();
                groups = element.find('.panel');
            });

            it('transcludes the <uib-accordion-heading> content into the heading link', function () {
                expect(findGroupLink(0).text()).toBe('Heading Element 123 ');
            });

            it('attaches the same scope to the transcluded heading and body', function () {
                expect(findGroupLink(0).scope().$id).toBe(findGroupBody(0).scope().$id);
            });

            it('should have disabled styling when is-disabled is true', isDisabledStyleCheck);
        });

        describe('uib-accordion-heading, with repeating uib-accordion-groups', function () {
            it('should clone the uib-accordion-heading for each group', function () {
                element = $compile('<uib-accordion><uib-accordion-group ng-repeat="x in [1,2,3]"><uib-accordion-heading>{{x}}</uib-accordion-heading></uib-accordion-group></uib-accordion>')(scope);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.length).toBe(3);
                expect(findGroupLink(0).text()).toBe('1');
                expect(findGroupLink(1).text()).toBe('2');
                expect(findGroupLink(2).text()).toBe('3');
            });
        });

        describe('uib-accordion-heading attribute, with repeating uib-accordion-groups', function () {
            it('should clone the uib-accordion-heading for each group', function () {
                element = $compile('<uib-accordion><uib-accordion-group ng-repeat="x in [1,2,3]"><div uib-accordion-heading>{{x}}</div></uib-accordion-group></uib-accordion>')(scope);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.length).toBe(3);
                expect(findGroupLink(0).text()).toBe('1');
                expect(findGroupLink(1).text()).toBe('2');
                expect(findGroupLink(2).text()).toBe('3');
            });
        });

        describe('uib-accordion group panel class', function () {
            it('should use the default value when panel class is falsy - #3968', function () {
                element = $compile('<uib-accordion><uib-accordion-group heading="Heading">Content</uib-accordion-group></uib-accordion>')(scope);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.eq(0)).toHaveClass('panel-default');

                element = $compile('<uib-accordion><uib-accordion-group heading="Heading" panel-class="">Content</uib-accordion-group></uib-accordion>')(scope);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.eq(0)).toHaveClass('panel-default');
            });

            it('should use the specified value when not falsy - #3968', function () {
                element = $compile('<uib-accordion><uib-accordion-group heading="Heading" panel-class="custom-class">Content</uib-accordion-group></uib-accordion>')(scope);
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.eq(0)).toHaveClass('custom-class');
                expect(groups.eq(0)).not.toHaveClass('panel-default');
            });

            it('should change class if panel-class is changed', function () {
                element = $compile('<uib-accordion><uib-accordion-group heading="Heading" panel-class="{{panelClass}}">Content</uib-accordion-group></uib-accordion>')(scope);
                scope.panelClass = 'custom-class';
                scope.$digest();
                groups = element.find('.panel');
                expect(groups.eq(0)).toHaveClass('custom-class');
                
                scope.panelClass = 'different-class';
                scope.$digest();
                expect(groups.eq(0)).toHaveClass('different-class');
                expect(groups.eq(0)).not.toHaveClass('custom-class');
            });
        });
    });
});