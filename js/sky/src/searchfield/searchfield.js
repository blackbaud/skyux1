/*jslint browser: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    angular.module('sky.searchfield', ['sky.resources'])
        .directive('uiSelectMatch', ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var selectContainerEl,
                        origSizeSearchInputFunc,
                        matchEl,
                        windowResizeTimeout;

                    function sizeMatchItems() {
                        //The main logic flow for this function was taken from the ui-select's "sizeSearchInput()" function.
                        //Some things are done below in order to give the tags time to render before we try to fix any
                        //text overflow issues that may be present.

                        function updateIfVisible(containerOffsetWidth) {
                            var visible = (containerOffsetWidth > 0);

                            if (visible) {
                                //Get the container width minus any padding
                                containerOffsetWidth -= containerOffsetWidth - angular.element(selectContainerEl).width();

                                //For each match item, set the properly width so that text overflows properly
                                matchEl.find('.ui-select-match-item').css({
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: containerOffsetWidth
                                });
                            }

                            return visible;
                        }

                        $timeout(function () { //Give tags time to render correctly
                            updateIfVisible(selectContainerEl.offsetWidth);
                        });
                    }

                    if ($select.multiple) {
                        matchEl = element;
                        selectContainerEl = matchEl.parent().parent()[0];
                        origSizeSearchInputFunc = $select.sizeSearchInput;

                        //Hook into the ui-select function that controls resizing for multi search
                        $select.sizeSearchInput = function () {
                            origSizeSearchInputFunc();
                            sizeMatchItems();
                        };

                        //Resize any tags on load
                        sizeMatchItems();

                        $(window).on('resize.searchField' + scope.$id, function () {
                            $timeout.cancel(windowResizeTimeout);

                            windowResizeTimeout = $timeout(function () {
                                sizeMatchItems();
                            }, 250);
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.searchField' + scope.$id);
                        });
                    }
                }
            };
        }])
        .directive('uiSelectChoices', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var searching,
                        selectContainerEl,
                        msgEl;

                    function updateUIForSearch(showSearchingMsg) {
                        var msg;


                        // Remove the no results message if it's currently displayed
                        if (msgEl) {
                            msgEl.remove();
                            msgEl = null;
                        }

                        if (searching && $select.items.length === 0) {
                            // Display the "Searching..." or "No results..." message - only when we have empty results because we
                            //don't want the message to popup over a list of results as the user types.
                            msg = showSearchingMsg ? bbResources.searchfield_searching : bbResources.searchfield_no_records;

                            msgEl = angular.element($templateCache.get('sky/templates/searchfield/choices.html'));
                            msgEl.find('.bb-searchfield-no-records').text(msg);

                            selectContainerEl.append(msgEl);
                        }
                    }

                    function clearResults() {
                        searching = false;
                        $select.items = []; // Clear out current result set
                        updateUIForSearch();
                    }

                    //Remote Searches Only
                    //If the refresh attribute is set the control is being used as a remote search
                    if (attrs.refresh) {
                        selectContainerEl = angular.element(element).parent();
                        searching = false;

                        //Watch when the search field is opened/closed so that we can update the UI and remove
                        //the no results message, and remove the results for the next search.
                        scope.$watch('$select.open', function () {
                            clearResults();
                        });

                        //Watch the search results collection for any changes.
                        //NOTE: This does NOT fire when the collection is empty and the search result
                        //comes back empty.  To handle that case, see the "bbSearchFinished" event below.
                        scope.$watchCollection('$select.items', function () {
                            updateUIForSearch();
                        });

                        //This event should be fired by the consuming code after it gets and stores the results
                        //from the remote server.  This allows us to handle the problem above where $watchCollection
                        //doesn't fire when the collection is empty and the results also come back empty.
                        scope.$on("bbSearchFinished", function () {
                            updateUIForSearch();
                        });

                        //Watch all changes to the search text that the user is typing.
                        scope.$watch('$select.search', function (search) {
                            searching = (search && search.length > 0);

                            if (searching) {
                                //Initially shows the "Searching..." message until results come back from the remote server
                                updateUIForSearch(true);
                            } else {
                                clearResults();
                            }
                        });
                    }
                }
            };
        }]);
}(jQuery));
