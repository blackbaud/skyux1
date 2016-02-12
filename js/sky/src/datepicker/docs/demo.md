---
name: Datepicker
icon: calendar-o
summary: The datepicker wraps the Angular UI Bootstrap datepicker directive to create a text box with a calendar to select dates.
---

The datepicker directive wraps the [Angular UI Bootstrap datepicker directive](https://angular-ui.github.io/bootstrap/#/datepicker). It creates a text box with a calendar picker to select dates.

### Datepicker Settings
    - `bb-datepicker' &mdash; Creates a text box with a calendar picker.
        - `bb-custom-validation` &mdash; *(Optional.)* Specifies an object that contains a function to validate entries in the text box.
            - `formatValue` &mdash; A function to be called when users enter text in the textbox. The only parameter to pass to the function is the raw value of the text box. If a problem occurs when formatting value in the input, the function returns an object or a promise of an object with the following properties:
                - `formattedValue` &mdash; The result after the validation formats the value in the input. For example, the validation can translate values such as "June 2015" into numerical dates. 
                - `formattingErrorMessage` &mdash; *(Optional.)* The response that displays if an error occurs during validations.
        - `bb-date-format` &mdash; Specifies the format string to use for dates in the text box. This overrides the SKY UX default of `MM/dd/yyyy` that is set by the `currentCultureDateFormatString` property in `bbDatepickerConfig`. You set up the format string just like format strings for the [Angular date filter](https://docs.angularjs.org/api/ng/filter/date).
        - `bb-date-options` &mdash; Specifies an options object to customize the datepicker. The options include all valid options for the Angular UI Bootstrap `datepicker-options` object. You can set application defaults for the `showWeeks` and `startingDay` properties of the Angular UI Bootstrap datepicker in the `bbDatepickerConfig` constant defined in `sky.datepicker`. The SKY UX defaults for `showWeeks` and `startingDay` are  `false` and `0`.
        - `bb-datepicker-name` &mdash; Provides a value to bind to the `name` attribute of the datepicker input. The value is used for validation and form submission.
        - `close-on-date-selection` &mdash; Indicates whether to close the datepicker calendar after users select dates. *(Default: `true`)*
        - `datepicker-append-to-body` &mdash; Indicates whether to append the datepicker popup element to `body` instead of the datepicker text box. For modal forms, appending the datepicker to `body` can prevent the datepicker from interfering with the rest of the modal. *(Default: `false`)*
        - `max-date` &mdash; A JavaScript Date object to set a maximum date for the datepicker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.maxDate`. You can set this value globally in the `bbDatepickerConfig` object property `maxDate`.
        - `min-date` &mdash; A JavaScript Date object to set a minimum date for the datepicker control and input. Input validation is bound to `$scope.myFormName.inputName.$error.minDate`. You can set this value globally in the  `bbDatepickerConfig` object property `minDate`.
        - `ng-model` &mdash; Specifies an object to bind the date value in and out of the datepicker. This is set to a JavaScript Date object when set or parsed from the Bootstrap datepicker.
        - `placeholder` &mdash; Overrides the default placeholder text that appears in the datepicker input.
        - `required` &mdash; Indicates whether the datepicker text box is a required field.
        - `show-button-bar` &mdash; Indicates whether to display a button bar under the datepicker. *(Default: `false`)*
    - `bbDatepickerConfig' &mdash; A global configuration object that applies options to datepickers throughout an application.

### Validation
The `bb-datepicker` directive sets validation on the datepicker input using `bb-datepicker-name` for the input name. To check whether a date value is valid, you can access the `dateFormat` validator through `$scope.myFormName.inputName.$error.dateFormat`. The error message for an invalid date is in `$scope.myFormName.inputName.invalidFormatMessage`.