---
name: Autonumeric
icon: calculator
summary: The autonumeric component wraps up the autoNumeric jQuery plugin to format any type of number.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The `bb-autonumeric` directive wraps up the autoNumeric jQuery plugin to format any type of number, including currency. You must use this directive in conjunction with the `ngModel` directive where the property bound to `ngModel` is the raw numeric value on your model.

 ### Dependencies ###
 - **[autoNumeric](http://www.decorplanit.com/plugin/) (1.9.27 or higher)** Formats money values.

---

### Autonumeric settings ###
 - `bb-autonumeric` &mdash; *(Optional.)* Assigns the name of a property from the `bbAutonumericConfig` object. *(Default: `number`)*
 - `bb-autonumeric-settings` &mdash; Specifies a value that represents a settings object to pass to the autoNumeric jQuery plugin. These options override any default options specified in the `bb-autonumeric` attribute. For more information, see the [complete list of options](http://www.decorplanit.com/plugin/).

### Autonumeric filter settings ###
In addition to the directive, the autonumeric component includes a filter that can format numbers. The filter can optionally abbreviate numbers according to SKY UX patterns. For example, it can display 10,000 as 10k, 1,000,000 as 1m, and 1,000,000,000 as 1b. The filter takes three arguments:

 - `input` &mdash; Specifies the value to format.
 - `configType` &mdash; If a String, then it specifies the name of the configuration (`number`, `money`, or `percent`) to apply to the value. If an Object, then it represents a settings object to pass to the autoNumeric jQuery plugin. For more information, see the [complete list of options](http://www.decorplanit.com/plugin/).
 - `abbreviate` &mdash; Provides a Boolean value to indicate whether to abbreviate large numbers.
