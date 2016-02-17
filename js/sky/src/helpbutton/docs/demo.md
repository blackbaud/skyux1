---
name: Help Button
icon: question-circle
summary: The help button creates a help icon to launch a help key that is different than the default help based on page context.
---

The help button directive creates a help icon that can be clicked to launch a specific help key that is different than the default help based on page context. Optionally, it can override the page help context throughout the duration that the help button exists on the page.

### Help Button Settings ###

 - `bb-help-key` Specifies the help key that will be opened when the help button is clicked.
 - `bb-set-help-key-override` *(Default: `false`)* If `true`, then this button will override the current page help context, so clicking on the help ear will open to this help key while this button exists.