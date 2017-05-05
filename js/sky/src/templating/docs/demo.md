---
name: Template
icon: building-o
summary: The template component places formatted text inside a tokenized string template.
---

The template directives allow you to place formatted text inside a tokenized string template. This avoids the need to build HTML manually on the server or in a custom directive where HTML injection bugs are common.
The string template is specified with the `bb-template` attribute, and child elements with the `bb-template-item` attribute are the elements that contain the formatted text.

### Template settings ###

 - `bb-template` &mdash; The tokenized string that represents the template. Tokens use the `{n}` notation where n is the ordinal of the item to replace the token.
  - `bb-template-item` &mdash; An attribute that specifies an element to be placed in the template, where the `nth` template item is placed at the `{n}` location in the template.