/*jslint browser: true, plusplus: true */
/*global angular */

/** @module Help Button
@icon question-circle
@summary The help button creates a help icon to launch a help key that is different than the default help based on page context.
 @description The help button directive creates a help icon that can be clicked to launch a specific help key that is different than the default help based on page context. Optionally, it can override the page help context throughout the duration that the help button exists on the page.

### Help Button Settings ###

 - `bb-help-key` Specifies the help key that will be opened when the help button is clicked.
 - `bb-set-help-key-override` *(Default: `false`)* If `true`, then this button will override the current page help context, so clicking on the help ear will open to this help key while this button exists.

 */

(function () {
    'use strict';

    angular.module('sky.helpbutton', ['sky.help'])
        .directive('bbHelpButton', ['$state', '$window', 'bbHelp', function ($state, $window, bbHelp) {
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

                el.click(function () {
                    bbHelp.open(attrs.bbHelpKey);
                });
            }

            return {
                link: link
            };
        }]);

}());
