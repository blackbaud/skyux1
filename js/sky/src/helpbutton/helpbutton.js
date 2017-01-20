/*jslint browser: true, plusplus: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.helpbutton', ['sky.help', 'sky.resources'])
        .directive('bbHelpButton', ['$state', '$window', 'bbHelp', 'bbResources', function ($state, $window, bbHelp, bbResources) {
            /// <summary>
            /// This directive provides a button that launches the Blackbaud Help Widget.
            /// The bbHelpKey attribute sets the help key. The widget will show the given key's corresponding help page
            /// The bbSetHelpKeyOverride attribute, when set to "true", makes this directive's help key override the current page help key.
            ///     The help key override will be removed when the directive is removed from the page.
            /// </summary>

            function link(scope, el, attrs) {
                /*jslint unparam: true */
                var oldHelpKeyOverride;

                el.addClass('bb-helpbutton fa fa-question-circle close');

                if (attrs.bbSetHelpKeyOverride && attrs.bbSetHelpKeyOverride.toLowerCase() === 'true') {
                    oldHelpKeyOverride = $state.current.helpKeyOverride;
                    $state.current.helpKeyOverride = attrs.bbHelpKey;

                    el.on("remove", function () {
                        $state.current.helpKeyOverride = oldHelpKeyOverride;
                    });
                }

                if (!el.is('button')) {
                    el.attr('role', 'button');
                    el.attr('tabindex', '0');
                }

                if (!el.attr('aria-label')) {
                    el.attr('aria-label', bbResources.help_button_label);
                }

                el.click(function () {
                    bbHelp.open(attrs.bbHelpKey);
                });

                el.on('keyup', function ($event) {
                    if ($event.which === 13) {
                        bbHelp.open(attrs.bbHelpKey);
                    }
                });
            }

            return {
                link: link
            };
        }]);

}());
