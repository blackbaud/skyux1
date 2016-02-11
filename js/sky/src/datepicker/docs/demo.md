---
name: Date Picker
icon: calendar-o
summary: The date picker wraps the Angular UI Bootstrap datepicker directive to create an input text box with a calendar to select dates.
---

The date picker directive wraps the [Angular UI Bootstrap datepicker directive](https://angular-ui.github.io/bootstrap/#/datepicker). It creates an input text box with a calendar picker to select dates.

### Date Picker Settings
    - `bb-datepicker' &mdash; Creates an input text box with a calendar picker.
        - `bb-custom-validation` &mdash; Specifies an object that contains a function to validate entries in the text box.
            - `formatValue` &mdash; A function to be called when users enter text in the textbox. The only parameter to pass to the function is the raw value of the text box. If a problem occurs when formatting the input value, the function returns an object or a promise of an object with the `formattedValue` property and optionally the `formattingErrorMessage` property.
        - `bb-date-format` &mdash; Specifies the format string to use for dates in the text box. This overrides the SKY UX default of `MM/dd/yyyy` that is set by the `currentCultureDateFormatString` property in `bbDatepickerConfig`. You set up the format string just like format strings for the [Angular date filter](https://docs.angularjs.org/api/ng/filter/date).
        - `bb-date-options` &mdash; Specifies an options object to customize the date picker. The options include all valid options for the Angular UI Bootstrap `datepicker-options` object. You can set application defaults for the `showWeeks` and `startingDay` properties of the Angular UI Bootstrap date picker in the `bbDatepickerConfig` constant defined in `sky.datepicker`. The SKY UX defaults for `showWeeks` and `startingDay` are  `false` and `0`.
        - `bb-datepicker-name` &mdash; Provides a value to bind to the `name` attribute of the date picker input. The value is used for validation and form submission.
        - `close-on-date-selection` &mdash; Indicates whether to close the date picker calendar after users select dates. *(Default: `true`)*
        - `datepicker-append-to-body` &mdash; Indicates whether to append the date picker popup element to `body` instead of the date picker text box. *(Default: `false`)*
        - `max-date` &mdash; A JavaScript Date object to set a maximum date for the date picker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.maxDate`. You can set this value globally in the `bbDatepickerConfig` object property `maxDate`.
        - `min-date` &mdash; A JavaScript Date object to set a minimum date for the date picker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.minDate`. You can set this value globally in the  `bbDatepickerConfig` object property `minDate`.
        - `ng-model` &mdash; Specifies an object to bind the date value in and out of the date picker. This is set to a JavaScript Date object when set or parsed from the Bootstrap date picker.
        - `placeholder` &mdash; Overrides the default placeholder text of the `bb-datepicker` input.
        - `required` &mdash; Indicates whether the date picker text box is a required field.
        - `show-button-bar` &mdash; Indicates whether to display a button bar under the date picker. *(Default: `false`)*

### Validation
The `bb-datepicker` directive sets validation on the date picker input using `bb-datepicker-name` for the input name. The validity of the date in the input is in the `dateFormat` validator. To check whether a date value is valid, you can access this through `$scope.myFormName.inputName.$error.dateFormat`. The error message for an invalid date is in `$scope.myFormName.inputName.invalidFormatMessage`.