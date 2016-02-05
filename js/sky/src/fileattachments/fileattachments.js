/*jshint browser: true */
/*global angular */

/** @module File Attachments
@icon cloud-upload
@summary The file attachments module provides the ability to add multiple files to a form and then display information about the files.
@description The file attachments module contains two directives to add files to a form.
The `bb-file-drop` directive provides an element that users can click to select files from their local drive or use as a drop zone to drag and drop files. The directive can
also display controls for users to add hyperlinks to files on the web.

You can leave the contents of the directive blank to display the drop zone's default UI, or you can specify custom content to display instead.

When the SKY UX module initializes, dragging and dropping files is disabled for the entire window. This prevents the browser from opening files that are accidentally dropped outside the target zone. If you implement your own file drop functionality outside of the file drop directive, you can place the `bb-file-drop-target` CSS
class on the element that receives drop events to exempt it from the drop exclusion rule.

The `bb-file-item` directive displays summary information about attachments that users add to forms. By default, the directive displays file names and delete buttons. For files from local drives, the directive also displays file sizes and thumbnails. Any content inside this directive is displayed to the right of the preview image.

### File Drop Settings ###

- `bb-file-drop-accept` &mdash; *(Optional)* Provides a comma-delimited string literal of MIME types that users can drop or select (`bb-file-drop-accept="fileAttachmentDemo.validFileTypes"` or `bb-file-drop-accept="'image/png'"`) or a custom validation function (`bb-file-drop-accept="fileAttachmentDemo.validate($file)"`).
- `bb-file-drop-multiple` &mdash; Indicates whether users can drop multiple files at the same time. *(Default: `true`)* 
- `bb-file-drop-allow-dir` &mdash; Indicates whether users can select a directory when they attach files. *(Default: `true`)*
- `bb-file-drop-min-size` &mdash; *(Optional)* Specifies the minimum size in bytes of a valid file.
- `bb-file-drop-max-size` &mdash; *(Optional)* Specifies the maximum size in bytes of a valid file.
- `bb-file-drop-change` &mdash; Specifies a function to call when users attach files. The function accepts two parameters:
 - `files` &mdash; An array of valid files that a user selects or drags and drops. Each item is a [JavaScript File object](https://developer.mozilla.org/en-US/docs/Web/API/File).
 - `rejectedFiles` &mdash; An array of files that are not valid because they do not meet the file type and/or size requirements.
- `bb-file-drop-link` &mdash; *(Optional)* Indicates whether to display an option for users to specify hyperlinks to files on the web. You include this attribute with no value to display the hyperlink option. 
- `bb-file-drop-link-change` &mdash; *(Optional)* Specifies a function to call when users add hyperlinks. The function accepts a `link` parameter with a `url` property that contains the hyperlink.
- `bb-file-drop-noclick` &mdash; Disables the option for users to click the element and select files through a file dialog.

### File Item Settings ###

- `bb-file-item` &mdash; The file or hyperlink to display. For files, the directive displays file sizes and previews.
- `bb-file-item-delete` &mdash; Specifies a function to call when users click the delete button for an item. The deleted item is passed to the function.
 */
(function () {
    'use strict';

    angular.module(
        'sky.fileattachments',
        [
            'sky.fileattachments.filedrop',
            'sky.fileattachments.fileitem',
            'sky.fileattachments.filesize'
        ]
    );
}());
