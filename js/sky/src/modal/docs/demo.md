---
name: Modal
icon: list-alt
summary: The modal component launches modals in a way that is consistent with Sky UX applications.
---

The modal directive and service can be used to launch modals in a consistent way in a Sky UX application. Rather than using the ui-bootstrap `$uibModal.open`, use `bbModal.open` instead. This takes the same options object but allows for some custom default behaviors in Sky UX.

In addition to the `bbModal` service for lauching modals, a `bb-modal` directive should be used to have common look-and-feel for modal content. Within `bb-modal`, use `bb-modal-header` to include a common modal header, `bb-modal-footer` to include a common modal footer and buttons, and `bb-modal-body` to wrap the modal's body content.

### Modal Header Settings ###

 - `bb-modal-help-key` Specifies the help key for the modal. This will be be linked from a help button included in the modal header.

### Modal Footer Buttons ##

 - `bb-modal-footer-button` Generic button for the modal footer. HTML included in this tag will be included in the contents of the button. You must register events for the button manually.

 - `bb-modal-footer-button-primary` Primary button for the modal footer which will have a custom look.  Default content is 'Save', but HTML included in this tag will be included as the contents of the button if provided. You must register events for the button manually.

 - `bb-modal-footer-button-cancel` Cancel button for the modal footer. Default content is 'Cancel', but HTML included in this tag will be included as the contents of the button if provided. This button automatically cancels the modal form.