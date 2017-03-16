---
name: Text expand
icon: text-height
summary: The text expand component truncates long text with an ellipsis and a link that users can click to expand the text.
---

The text expand directive truncates long text with an ellipsis and a link that allows the user to fully expand the text. If the text length falls below the specified threshold, then no action is taken. The 'See more' link expands the text inline if it does not exceed the limits on text characters or newline characters for the inline expanded view. Otherwise, the link opens the text in a modal view.

Note that collapsed text will have newlines removed. Also, if newlines are detected, the text is automatically collapsed regardless of the total length.

### Text expand settings ###

 - `bb-text-expand` &mdash; The text to truncate.
 - `bb-text-expand-max-length` &mdash; The number of characters to display before truncating the text. To avoid truncating text in the middle of a word, the directive looks for a space in the 10 characters before the last character. *(Default: `200`)*
 - `bb-text-expand-max-expanded-length` &mdash; The maximum number of characters to display in the inline expanded view. If the text includes more characters, then a modal view displays the content when users click the 'See more' link. *(Default: `600`)*
 - `bb-text-expand-max-expanded-newlines` &mdash; The maximum number of newline characters to display in the inline expanded view. If the text includes more newline characters, then a modal view displays the content when users click the 'See more' link. *(Default: `2`)*
 - `bb-text-expand-modal-title` &mdash; The title to display in the modal expanded view.

The text expand repeater directive truncates a list of repeater items and initially displays a set number of items. Any items over the set maximum limit are hidden until users expand the list.

### Text expand repeater settings ###

- `bb-text-expand-repeater-max` &mdash; The maximum number of items to display before truncating the repeater list.
- `bb-text-expand-repeater-data` &mdash; The name of the property containing the repeater data.
