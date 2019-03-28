---
name: Template
icon: building-o
summary: The template component places formatted text inside a tokenized string template.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The template directives allow you to place formatted text inside a tokenized string template. This avoids the need to build HTML manually on the server or in a custom directive where HTML injection bugs are common.
The string template is specified with the `bb-template` attribute, and child elements with the `bb-template-item` attribute are the elements that contain the formatted text.

### Template settings ###

 - `bb-template` &mdash; The tokenized string that represents the template. Tokens use the `{n}` notation where n is the ordinal of the item to replace the token.
  - `bb-template-item` &mdash; An attribute that specifies an element to be placed in the template, where the `nth` template item is placed at the `{n}` location in the template.
