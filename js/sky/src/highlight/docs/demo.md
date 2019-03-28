---
name: Highlight
icon: paint-brush
summary: The highlight component highlights text within DOM elements.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The highlight directive allows you to highlight text within DOM elements. When you set the `bb-highlight` attribute to the text you want to highlight, it highlights all matching text within the element.

### Highlight settings ###
- `bb-highlight` &mdash; Specifies the text to highlight.
- `bb-highlight-beacon` &mdash; *(Optional.)* Specifies a property on your scope that prompts highlighting when its value changes. This is necessary for scenarios where the highlight directive cannot detect changes to the content of the element to highlight. For example, if another directive updates the content or the `bb-highlight` attribute is specified on a parent element, then you need `bb-highlight-beacon` to prompt the highlight directive to update the highlighted text. You do not need `bb-highlight-beacon` if the element with the `bb-highlight` attribute has the `ng-bind` attribute because the highlight directive can detect this and update the highlighting when the value changes.
