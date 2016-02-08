---
name: Highlight
icon: paint-brush
summary: The highlight component highlights portions of text inside DOM elements.
---

The highlight directive allows you to highlight portions of text inside DOM elements. Set the `bb-highlight` attribute to the text you want to highlight, and all matching text within the element will be highlighted.

### Highlight Options ###

- `bb-highlight-beacon` A property on your scope that will cause highlighting to occur when its value changes. This is needed when the highlight directive can't tell that the contents of the element to be highlighted has changed. For instance, if the element with the `bb-highlight` attribute also has the `ng-bind` attribute, the highlight directive can detect this and update highlighting whenever this value changes. However if you use a different directive to update the element's contents or the `bb-highlight` attribute is specified on a parent element of the element to be highlighted, you will need to use `bb-highlight-beacon` to notify the highlight directive to update the highlighted text.