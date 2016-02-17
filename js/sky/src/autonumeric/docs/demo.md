---
name: Autonumeric
icon: calculator
summary: The autonumeric component wraps up the autoNumeric jQuery plugin to format any type of number.
---

The `bb-autonumeric` directive wraps up the autoNumeric jQuery plugin to format any type of number, including currency. You must use this directive in conjunction with the `ngModel` directive where the property bound to `ngModel` is the raw numeric value on your model.

 ### Dependencies ###
 - **[autoNumeric](http://www.decorplanit.com/plugin/) (1.9.27 or higher)** Formats money values.

---

### Autonumeric Settings ###
 - `bb-autonumeric` &mdash; *(Optional.)* Assigns the name of a property from the `bbAutonumericConfig` object. *(Default: `number`)*
 - `bb-autonumeric-settings` &mdash; Specifies a value that represents a settings object to pass to the autoNumeric jQuery plugin. These options override any default options specified in the `bb-autonumeric` attribute. For more information, see the [complete list of options](http://www.decorplanit.com/plugin/).

### Autonumeric Filter Settings ###
In addition to the directive, the autonumeric component includes a filter that can format numbers. The filter can optionally abbreviate numbers according to SKY UX patterns. For example, it can display 10,000 as 10k, 1,000,000 as 1m, and 1,000,000,000 as 1b. The filter takes three arguments:

 - `input` &mdash; Specifies the value to format.
 - `configType` &mdash; Specifies the name of the configuration (`number` or `money`) to apply to the value.
 - `abbreviate` &mdash; Provides a Boolean value to indicate whether to abbreviate large numbers.