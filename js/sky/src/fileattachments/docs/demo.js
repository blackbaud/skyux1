/*global angular */
(function () {
    'use strict';
    angular.module('stache')
        .controller('FileAttachmentDemoController', function () {
            var self = this;

            function removeFromArray(items, obj) {
                var i,
                    n;

                if (items) {
                    for (i = 0, n = items.length; i < n; i++) {
                        if (items[i] === obj) {
                            items.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            self.attachments = [];
            self.links = [];
            self.rejected = [];
            self.allItems = [];

            self.fileDropped = function (files, rejectedFiles) {
                self.attachments = self.attachments.concat(files);
                self.allItems = self.allItems.concat(files);
                self.rejected = rejectedFiles;
            };

            self.fileLinked = function (link) {
                self.links.push(link);
                self.allItems.push(link);
            };

            self.deleteAttachment = function (file) {
                removeFromArray(self.links, file);
                removeFromArray(self.attachments, file);
                removeFromArray(self.allItems, file);
            };
        });

}());
