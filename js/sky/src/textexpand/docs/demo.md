---
name: Text expand
icon: text-height
summary: The text expand component truncates long text with an ellipsis and a link that users can click to expand the text.
---

The texteExpand directive truncates long text with an ellipsis and a link that allows the user to fully expand the text. If the text length falls below the specified threshold then no action is taken. The 'See more' link will expand the text inline if the length of the text is below the specified expanded length limit and if the number of newlines in the text is below the specified expanded newline limit, otherwise the link will open the text in a modal view.

Note that collapsed text will have newlines removed. Also, if one or more newlines are detected, the text is automatically collapsed regardless of the total length of the text.

### Text expand settings ###

 - `bb-text-expand` &mdash; The text to truncate.
 - `bb-text-expand-max-length` &mdash; *(Default: 200)* The number of characters to show before truncating the text. The directive will attempt to look back up to 10 characters for a space and truncate there in order to avoid truncating in the middle of a word.
 - `bb-text-expand-max-expanded-length` &mdash; *(Default: 600)* The maximum number of characters to show in the inline expanded view. If there are more characters in the content, then a modal view with the content will be displayed when the 'See more' link is clicked.
 - `bb-text-expand-max-expanded-newlines` &mdash; *(Default: 2)* The maximum number of newline characters to show in the inline expanded view. If there are more newline characters in the content, then a modal view with the content will be displayed when the 'See more' link is clicked.
 - `bb-text-expand-modal-title` &mdash; The title to display in the modal expanded view.

The Text Expand Repeater directive truncates a list of repeater items and will initially display a set number of items. Any items over the set maximum limit are hidden until the user elects to expand the list.

### Text expand repeater settings ###

- `bb-text-expand-repeater-max` &mdash; The maximum number of items to show before truncating the repeater list.
- `bb-text-expand-repeater-data` &mdash; The name of the property containing the repeater data.