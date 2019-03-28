---
name: Format
icon: paragraph
summary: The format service provides access to functions that allow you to format text with a format string and to escape HTML characters.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The format service provides access to the following functions:

  - `formatText(formatString, args)` &mdash; Formats the args with a given format string.
  - `escape(text)` &mdash; Replaces the `<`, `>`, and `&` HTLM characters with `&lt;`, `&gt;`, and `&amp;`.
