---
name: Check
icon: check-square
summary: The check applies a commonly styled selector to a checkbox or radio button.
---

The `bb-check` directive allows you to change an input element of type checkbox or radio button into a commonly styled selector. The value that is selected is driven through the `ng-model` attribute specified on the input element. For radio button input types, the value to set on the `ng-model` can be specified by the value attribute.

### Accessibility ###

When using multiple checkboxes or radio buttons as a group, use `fieldset` and `legend` elements to provide semantic structure. These elements group the related input fields and provide a label for someone using assistive technology. For more information on how to use fieldset and legend, see [WebAIM examples and guidance](http://webaim.org/techniques/forms/controls#checkbox).

---
