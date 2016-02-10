---
name: Format
icon: paragraph
summary: The format service provides access to functions that allow you to format text with a format string and to escape HTML characters.
---

The format service provides access to the following functions:

  - `formatText(formatString, args)` &mdash; Formats the args with a given format string.
  - `escape(text)` &mdash; Replaces the `<`, `>`, and `&` characters with `&lt;`, `&gt;`, and `&amp;`.