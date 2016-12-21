---
name: Modal
icon: list-alt
summary: The modal component launches modals in a consistent way in SKY UX applications.
---

The modal directive and service allow you to launch modals in a consistent way in SKY UX applications. The `bbModal` service lauches the modals instead of [the UI Bootstrap `$uibModal.open`](https://angular-ui.github.io/bootstrap/#modal), while the `bb-modal` directive provides a common look-and-feel for modal content. Within the `bb-modal` directive, you have options to display a common modal header, specify the body content, and display a common modal footer and buttons.

### Modal service settings ###
- `bbModal.open` &mdash; Launches modals in a consistent way in SKY UX applications. Used instead of `$uibModal.open`.
  - `uibModalOptions` &mdash; Specifies an object with the same options as `$uibModal.open` that allows for some custom default SKY UX behavior.
  - `bbModalOptions` &mdash; *(Optional.)* Specifies an object that contains SKY UX-specific options for modals.
    -  `fullPage` &mdash; *(Optional.)* Indicates whether the modal takes up the entire page. When using a full page modal that has content behind it, you must wrap that content in a [bb-page](../page) to prevent unneeded scrollbars in the modal. *(Default: `false`)*

### Modal directive settings ###
- `bb-modal` &mdash; Creates a modal with a common SKY UX look-and-feel.
    - `bb-modal-header` &mdash; Specifies a header for the modal.
        - `bb-modal-help-key` &mdash; Specifies a help key for the modal. A help button in the modal header links to this help key.
    - `bb-modal-body` &mdash; Specifies content to display in the modal's body.
    - `bb-modal-footer` &mdash; Specifies buttons to display in the modal's footer.
        - `bb-modal-footer-button` &mdash; Displays a generic button. You provide HTML within this tag to specify the content of the button. You must register events for the button manually.
        - `bb-modal-footer-button-primary` &mdash; Displays a primary button and applies the `btn-primary` class to highlight it. "Save" is the default content for the button, but you can provide HTML within this tag to override the default content. You must register events for the button manually.
        - `bb-modal-footer-button-cancel` &mdash; Displays a cancel button to close the modal form. "Cancel" is the default content for the button, but you can provide HTML within this tag to override the default content.
        

 ### Accessibility ###

 Ensure the following:

 1. Upon opening a modal, focus is placed on the first focusable item in the modal. If there is no focusable item in the modal, focus is placed on the modal container element.
 2. Focus stays within the elements in the modal when using the keyboard. It cannot move back to the initiating page behind the modal.
 3. Upon closing modal, focus is returned to the element which had focus before the modal opened (usually the element that opened it).
 4. `$uibModal.open` `keyboard` option is not changed to false from its default of true. This will allow someone to close the modal by pressing the esc key.
