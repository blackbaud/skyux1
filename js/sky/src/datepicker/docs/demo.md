---
name: Datepicker
icon: calendar-o
summary: The datepicker wraps the Angular UI Bootstrap datepicker directive to create a text box with a calendar to select dates.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The datepicker directive wraps the [Angular UI Bootstrap datepicker directive](https://angular-ui.github.io/bootstrap/#/datepicker). It creates a text box with a calendar picker to select dates.

### Datepicker settings
    - `bb-datepicker` &mdash; Creates a text box with a calendar picker.
        - `bb-datepicker-custom-validation` &mdash; *(Optional.)* Specifies an object that contains a function to validate entries in the text box.
            - `formatValue` &mdash; A function to be called when users enter text in the textbox. The only parameter to pass to the function is the raw value of the text box. If a problem occurs when formatting value in the input, the function returns an object or a promise of an object with the following properties:
                - `formattedValue` &mdash; The result after the validation formats the value in the input. For example, the validation can translate values such as "June 2015" into numerical dates.
                - `formattingErrorMessage` &mdash; *(Optional.)* The response that displays if an error occurs during validations.
        - `bb-date-format` &mdash; *(Optional.)* Specifies the format string to use for dates in the text box. This overrides the SKY UX default of `MM/dd/yyyy` that is set by the `currentCultureDateFormatString` property in `bbDatepickerConfig`. You set up the format string just like the format strings for the [Angular date filter](https://docs.angularjs.org/api/ng/filter/date). Note that this control does not accept format strings like `short`, `shortDate`, `longDate`. You must use the formats like `MM/dd/yyyy`.
        - `bb-date-options` &mdash; *(Optional.)* Specifies an options object to customize the datepicker. The options include all valid options for the Angular UI Bootstrap `datepicker-options` object. You can set application defaults for the `showWeeks` and `startingDay` properties of the Angular UI Bootstrap datepicker in the `bbDatepickerConfig` constant defined in `sky.datepicker`. The SKY UX defaults for `showWeeks` and `startingDay` are  `false` and `0`.
        - `bb-datepicker-name` &mdash; *(Optional)* Provides a value to bind to the `name` attribute of the datepicker input. The value is used for validation and form submission.
        - `bb-datepicker-close-on-date-selection` &mdash; *(Optional.)* Indicates whether to close the datepicker calendar after users select dates. *(Default: `true`)*
        - `bb-datepicker-append-to-body` &mdash; *(Optional.)* Indicates whether to append the datepicker popup element to `body` instead of the datepicker text box. For modal forms, appending the datepicker to `body` can prevent the datepicker from interfering with the rest of the modal. *(Default: `false`)*
        - `bb-datepicker-max` &mdash; *(Optional.)* A JavaScript Date object to set a maximum date for the datepicker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.maxDate`. You can set this value globally in the `bbDatepickerConfig` object property `maxDate`.
        - `bb-datepicker-min` &mdash; *(Optional.)* A JavaScript Date object to set a minimum date for the datepicker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.minDate`. You can set this value globally in the  `bbDatepickerConfig` object property `minDate`.
        - `ng-model` &mdash; Specifies an object to bind the date value in and out of the datepicker. This is set to a JavaScript Date object when set or parsed from the Bootstrap datepicker.
        - `bb-datepicker-placeholder` &mdash; *(Optional.)* Overrides the default placeholder text that appears in the datepicker input.
        - `bb-datepicker-show-button-bar` &mdash; *(Optional.)* Indicates whether to display a button bar under the datepicker. *(Default: `false`)*
        - `bb-datepicker-alt-input-formats` &mdash; *(Optional.)* Specifies an array of alternate formats acceptable for manual entry. For example, if the `bb-date-format` is set to 'MM/dd/yyyy', you could specify 'M/d/yyyy' as an alternate format for the user. This extends the `bbAltInputFormats` array set in `bbDatepickerConfig`. If no alternate inputs are set in `bb-datepicker` or `bbDatepickerConfig`, then `bb-datepicker` will accept either padded or unpadded days and months for manual entry.
		- `bb-datepicker-skip-button-while-tabbing` &mdash; *(Optional.)* Indicates whether to skip over the calendar button when a user tabs through the datepicker input. *(Default: `false`)*
    - `bbDatepickerConfig` &mdash; A global configuration object that applies options to datepickers throughout an application.

### Validation
The `bb-datepicker` directive sets validation on the datepicker input using `bb-datepicker-name` for the input name. To check whether a date value is valid, you can access the `dateFormat` validator through `$scope.myFormName.inputName.$error.dateFormat`. The error message for an invalid date is in `$scope.myFormName.inputName.invalidFormatMessage`.
