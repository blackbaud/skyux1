---
name: KeyInfo
icon: 
summary: The keyinfo component displays --for John--
---

The alert directive displays a SKY UX-themed Bootstrap alert. It includes an option to let users dismiss the alert with a close button. For information about the Bootstrap alert, see the [Bootstrap documentation](http://getbootstrap.com/components/#alerts).

### KeyInfo Settings ###
    - `bb-keyinfo` &mdash; Creates a SKY UX-themed Bootstrap alert.
        - `bb-keyinfo-type` &mdash; Specifies a style for the alert. The valid options are `success`, `info`, `warning`, and `danger`. *(Default: `warning`)*
        - `bb-keyinfo-closeable` &mdash; Specifies a Boolean value to indicate whether users can dismiss the alert.
        - `bb-keyinfo-closed` &mdash; Specifies a function to be called when the user closes the alert.