---
name: Help Button
icon: question-circle
summary: The help button component creates a help icon to open help content that you specify. It can also override the default help content in the help panel.
---

The help button directive creates a help icon that users can click to launch a help key that you specify. The presence of the help icon on a page can also optionally override the default help content that the help panel displays based on page context.

### Help Button Settings ###
- `bb-help-button` &mdash; Creates a help icon to open help content that you specify.
 - `bb-help-key` &mdash; Specifies a help key to open when users click the help icon.
 - `bb-set-help-key-override` &mdash; *(Optional.)* Indicates whether to override the page context when [the help service](../help) displays help content in the help panel. To display help content based on `bb-help-key` instead of page context, set this property to `true`. *(Default: `false`)*
