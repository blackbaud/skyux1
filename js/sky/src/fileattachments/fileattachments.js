/*jshint browser: true */
/*global angular */

/** @module File Attachments
@icon cloud-upload
@summary The file attachments module provides the ability to add multiple files to a form and to display information about files after they are added.
@description The file attachments module contains two directives to make it easier to add multiple files to a form.
The `bb-file-drop` directive provides an element that can both be clicked to select a file from the user's
local drive or serve as a drop zone where files can be dragged from the user's local drive.  The directive can
also optionally display controls for the user to add a hyperlink to a file on the web.

The contents of the directive may be left blank to display the default UI for the drop zone, or you may include your
own custom content to be displayed instead of the default UI.

Also note that upon the initialization of the Sky module, dragging and dropping files will be disabled for the entire window so that
accidentally dropping a file outside the target zone doesn't result in the file being opened in the browser window.  If you are
implementing your own file drop functionality outside of the file drop directive, you can place the `bb-file-drop-target` CSS
class on the element you wish to receive drop events and that element will be exempt from the drop exclusion rule.

### File Drop Settings ###

- `bb-file-drop-accept` *(Optional)* A comma-delimited string literal of MIME types that may be dropped or selected (e.g. `bb-file-drop-accept="fileAttachmentDemo.validFileTypes"` or `bb-file-drop-accept="'image/png'"`) or a custom validation function (e.g. `bb-file-drop-accept="fileAttachmentDemo.validate($file)"`).
- `bb-file-drop-multiple` *(Default: `true`)* A flag indicating whether multiple files may be dropped at once.
- `bb-file-drop-allow-dir` *(Default: `true`)* A flag indicating whether a directory can be selected.
- `bb-file-drop-min-size` *(Optional)* The minimum size in bytes of a valid file.
- `bb-file-drop-max-size` *(Optional)* The maximum size in bytes of a valid file.
- `bb-file-drop-change` A function that is called when a file or files are selected when the user drops files onto the
drop zone or selects them by clicking the element.  This function accepts 2 parameters:
 - `files` An array of valid files that were dropped or selected.  Each item is a JavaScript [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
 object.
 - `rejectedFiles` An array of files that did not meet the specified file type and/or size requirements.
- `bb-file-drop-link` *(Optional)* The attribute with no value can be specified)* Indicates that an option to add hyperlinks
should be displayed.
- `bb-file-drop-link-change` *(Optional)* A function that is called when the user adds a hyperlink.  The function accepts one
`link` parameter.  The `link` will have a `url` property containing the link the user added.
- `bb-file-drop-noclick` Specify this attribute when you want to disable the ability to select a file from a file dialog by clicking the element.

The `bb-file-item` directive displays summary information about a file that has been added to a form.  By default
it displays the file's name and a delete button, and if the file from the user's local drive rather than a hyperlink,
a the file's size and thumbnail will also be displayed.  Any content inside this directive will be displayed to the right
of the preview image.

### File Item Settings ###

- `bb-file-item` The file or hyperlink to display.  If the item is a file, the file size and a preview will be displayed.
- `bb-file-item-delete` A function to call when an item's delete button is clicked.  The deleted item will be passed
to the function.
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
