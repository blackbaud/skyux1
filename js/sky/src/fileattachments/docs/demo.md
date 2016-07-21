---
name: File attachments
icon: cloud-upload
summary: The file attachments module provides the ability to add multiple files to forms and then display information about the files.
---

The file attachments module contains two directives to add files to forms and display summary information about attachments.

The `bb-file-drop` directive provides an element that users can click to select files from their local drives or use as a drop zone to drag and drop files. The directive can
also display controls for users to provide hyperlinks to files on the web. You can leave the contents of the directive blank to display the drop zone's default UI, or you can specify custom content to display instead.

When the SKY UX module initializes, it disables the ability to drag and drop files for the entire window. This prevents the browser from opening files that are accidentally dropped outside the target zone. If you implement your own file drop functionality outside of the file drop directive, you can place the `bb-file-drop-target` CSS
class on the element that receives drop events to exempt it from the drop exclusion rule.

The `bb-file-item` directive displays summary information about files that users attach  to forms. By default, the directive displays file names, delete buttons, and fields for names and tags.. For files from local drives, the directive also displays file sizes and thumbnails.

### File drop settings ###
- `bb-file-drop` &mdash; Provides an element for users to click to select files from local drives or to use as a drop zone to drag and drop files.
    - `bb-file-drop-accept` &mdash; *(Optional.)* Provides a comma-delimited string literal of MIME types that users can drop or select (`bb-file-drop-accept="fileAttachmentDemo.validFileTypes"` or `bb-file-drop-accept="'image/png'"`). By default, any type of file is allowed.
    - `bb-file-drop-multiple` &mdash; *(Optional.)* Indicates whether users can drag and drop multiple files at the same time. *(Default: `true`)* 
    - `bb-file-drop-allow-dir` &mdash; *(Optional.)* Indicates whether users can select a directory when they attach files. *(Default: `true`)*
    - `bb-file-drop-min-size` &mdash; *(Optional.)* Specifies the minimum size in bytes for valid files.
    - `bb-file-drop-max-size` &mdash; *(Optional.)* Specifies the maximum size in bytes for valid files.
    - `bb-file-drop-change` &mdash; Specifies a function to be becalled when users attach files. The function accepts two parameters:
        - `files` &mdash; An array of valid files that a user attaches. Each item is a [JavaScript File object](https://developer.mozilla.org/en-US/docs/Web/API/File).
        - `rejectedFiles` &mdash; An array of invalid files that do not meet file type or size requirements.
    - `bb-file-drop-link` &mdash; *(Optional.)* Indicates whether to display an option for users to provide hyperlinks to files on the web. To display this hyperlink option, you include this attribute with no value. 
    - `bb-file-drop-link-change` &mdash; *(Optional.)* Specifies a function to be called when users add hyperlinks. The function accepts a `link` parameter with a `url` property that contains the hyperlink.
    - `bb-file-drop-noclick` &mdash; *(Optional.)* Disables the option for users to click the element and select files through a file dialog. To disable the option, you include this attribute with no value.
    - `bb-file-drop-validate-fn` &mdash; *(Optional.)* Provides a custom validation function (`bb-file-drop-accept="fileAttachmentDemo.validate($file)"`). By default, any type of file is allowed.

### File item settings ###
- `bb-file-item` &mdash; Displays summary information about files that users attach to forms. By default, the directive displays file names, delete buttons, and fields for names and tags. For files from local drives, it also displays file sizes and thumbnails.
- `bb-file-item-delete` &mdash; Specifies a function to call when users click the delete button for an item. The deleted item is passed to the function.