---
name: Date-range picker
icon: calendar
summary: The date-range picker creates a box with a dropdown to select date ranges from a set of well-known options.
---

The date-range picker directive creates a text box where users can select date ranges from a set of well-known options. You can also allow users to select dates to create specific date ranges. The directive works hand-in-hand with a date-range picker service to provide service-oriented functionality.

### Date-range picker settings ###
    - `bb-date-range-picker` &mdash; Creates a text box with a dropdown to select date ranges.
        - `bb-date-range-picker-value` &mdash; Specifies an object that tracks the value of the date-range picker control. The `.dateRangeType` property provides the integer (ENUM) value of the date-range type that users select.
        - `bb-date-range-picker-automation-id` &mdash; Specifies a string to use when creating the `bb-auto-field` attribute on elements in the date-range picker.
        - `bb-date-range-picker-options` &mdash; *(Optional.)* Specifies an options object that can customize the behavior of the date-range picker.
            - `availableDateRangeTypes` &mdash; *(Optional.)* Provides an array of integers (`dateRangeTypes` ENUM) to specify an ordered list of date-range types for the dropdown. Common variations are available in the date-range picker service.
            - `getDateRangeTypeInfo` &mdash; *(Optional.)* A function that you can provide to associate custom date-range types with captions and descriptions. We recommend that the custom date-range types you use be set to values above 1000 to avoid collisions with SkyUX date-range types. It should return an object with `caption` and `description` properties, and it has the following argument:
              - `dateRangeType` &mdash; The date-range type.
        - `bb-date-range-picker-label` &mdash; *(Optional.)* Provides a text label to display over the field where users select date ranges.
        - `bb-date-range-picker-from-date` &mdash; *(Optional.)* A variable that is bound to the "from date" in a specific date range.
        - `bb-date-range-picker-to-date` &mdash; *(Optional.)* A variable that is bound to the "to date" in a specific date range.
        - `bb-date-range-picker-valid` &mdash; *(Optional.)* A variable that is set to `true` when dates in a specific date range are valid and `false` when dates are not valid.
        - `bb-date-range-picker-no-labels` &mdash; *(Optional.)* Indicates whether to hide the labels for the date-range picker and specific date controls. When set to `true`, placeholder text appears within the specific date controls.

### Date-range picker service ###
The date-range picker service provides functionality that works closely with the directive. The service includes the following properties:

    - `dateRangeTypes` &mdash; An ENUM of all date-range types that the date-range picker understands and can include in the dropdown.
    - `getDateRangeTypeCaption` &mdash; A function to get the caption of the dropdown item with the following arguments:
      - `dateRangeType` &mdash; The date-range type associated with the caption.
      - `getDateRangeTypeInfo` &mdash; *(Optional.)* A function that you can provide to associate custom date-range types with captions and descriptions. It should return an object with `caption` and `description` properties, and it has the following argument:
        - `dateRangeType` &mdash; The date-range type.
    - `getDateRangeFilterDescription` &mdash; A function to get the description of a date-range type with the following arguments:
      - `dateRangeType` &mdash; The date-range type associated with the description.
      - `getDateRangeTypeInfo` &mdash; *(Optional.)* A function that you can provide to associate custom date-range types with captions and descriptions. It should return an object with `caption` and `description` properties, and it has the following argument:
        - `dateRangeType` &mdash; The date-range type.
    - `getDateRangeOptions` &mdash; A function that provides different sets of `dateRangeTypes` in a given order. The contents of the returned arrays depend on the following flags in the `optionTypes` object passed to the function.
      - `includeDefault` &mdash; If set to true, the returned array will contain the default order and set of date-range types.
      - `includeSpecific` &mdash; If set to true, the returned array will contain the date-range type that lets users select dates for a specific range.
      - `includePast` &mdash; If set to true, the returned array will contain the date-range types that are appropriate to filter for things that occurred in the past.
    - `defaultDateRangeOptions` &mdash; *(Deprecated.)* Use the `getDateRangeOptions` function instead. <s>An array of `dateRangeTypes` that provides the default order and the set of date-range types to include in the dropdown.</s>
    - `specificDateRangeOptions` &mdash; *(Deprecated.)* Use the `getDateRangeOptions` function instead. <s>An array of `dateRangeTypes` that provides the same options as `defaultDateRangeOptions`, plus a date-range type that let users select dates for a specific date range.</s>
    - `pastDateRangeOptions` &mdash; *(Deprecated.)* Use the `getDateRangeOptions` function instead. <s>An array of `dateRangeTypes` that are appropriate to filter for things that occurred in the past. For example, you don't want to search for items created "next month."</s>
