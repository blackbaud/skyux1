---
name: Check
icon: check-square
summary: The check applies a commonly styled selector to a checkbox or radio button.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The `bb-check` directive allows you to change an input element of type checkbox or radio button into a commonly styled selector. The value that is selected is driven through the `ng-model` attribute specified on the input element. For radio button input types, the value to set on the `ng-model` can be specified by the value attribute.


### Accessibility ###

When using multiple checkboxes or radio buttons as a group, use `fieldset` and `legend` elements to provide semantic structure. These elements group the related input fields and provide the `legend` text with the controls in the `fieldset` to people using assistive technology. For more information on how to use `fieldset` and `legend`, see [WebAIM examples and guidance](http://webaim.org/techniques/forms/controls#checkbox).
