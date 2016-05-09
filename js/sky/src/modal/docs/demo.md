---
name: Modal
icon: list-alt
summary: The modal component launches modals in a way that is consistent with SKY UX applications.
---

The modal directive and service allow you to launch modals in a consistent way in SKY UX applications. Instead of the UI Bootstrap `$uibModal.open`, use `bbModal.open`. This takes the same options object but allows for some custom default behaviors in SKY UX.

In addition to the `bbModal` service to lauch modals, a `bb-modal` directive can provide a common look-and-feel for modal content. Within `bb-modal`, `bb-modal-header` displays a common modal header, `bb-modal-footer` displays a common modal footer and buttons, and `bb-modal-body` wraps the modal's body content.

### Modal Settings ###
- `bb-modal` &mdash; Creates a modal with a common SKY UX look-and-feel.
    - `bb-modal-header` &mdash; Specifies a header for the modal.
        - `bb-modal-help-key` &mdash; Specifies a help key for the modal. A help button in the modal header links to this help key.
    - `bb-modal-body` &mdash; Specifies content to display in the modal's body.
    - `bb-modal-footer` &mdash; Specifies buttons to display in the modal's footer.
        - `bb-modal-footer-button` &mdash; Displays a generic button. You provide HTML within this tag to specify the content of the button. You must register events for the button manually.
        - `bb-modal-footer-button-primary` &mdash; Displays a primary button and applies the `btn-primary` class to highlight it. "Save" is the default content for the button, but you can provide HTML within this tag to override the default content. You must register events for the button manually.
        - `bb-modal-footer-button-cancel` &mdash; Displays a cancel button to close the modal form. "Cancel" is the default content for the button, but you can provide HTML within this tag to override the default content.
 
<!--
### Modal Header Settings ###

 - `bb-modal-help-key` &mdash; Specifies the help key for the modal. A help button in the modal header links to this help key.

### Modal Footer Buttons ##

 - `bb-modal-footer-button` &mdash; Displays a generic button for the modal footer. HTML in this tag includes the contents of the button. You must register events for the button manually.
 - `bb-modal-footer-button-primary` &mdash; Primary button for the modal footer which will have a custom look.  Default content is 'Save', but HTML included in this tag will be included as the contents of the button if provided. You must register events for the button manually.
 - `bb-modal-footer-button-cancel` &mdash; Cancel button for the modal footer. Default content is 'Cancel', but HTML included in this tag will be included as the contents of the button if provided. This button automatically cancels the modal form.
-->