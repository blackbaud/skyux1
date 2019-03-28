---
name: Phone field
icon: phone
summary: The phone field directive creates a text box to format and validate international phone numbers.

---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The phone field directive creates a text box for users to enter phone numbers. It wraps up the [intl-tel-input jQuery plugin](http://jackocnr.com/intl-tel-input.html) to format and validate international phone numbers. This plugin adds a dropdown for users to select a country and specifies the desired format and dial code. Users can also enter a dial code to select a country. You use the `bb-phone-field` directive in conjunction with the `ng-model` directive and bind the phone number value to `ng-model`.

### Dependencies ###
- **[intl-tel-input](http://jackocnr.com/intl-tel-input.html) (12.4.0)** Enhances a text box to format and validate international phone numbers.

---

### Phone field settings ###
- `bb-phone-field` &mdash; Specifies a variable that holds settings for the `bbPhoneFieldConfig` configuration object.

### bbPhoneFieldConfig settings ###
- `countryIso2` &mdash; The International Organization for Standardization's two-letter code for the default country. When users select the default country, the `ng-model` value is formatted in the national phone format without the dial code. When users select another country, the `ng-model` value is formatted in the international phone format with the dial code.
- `selectedCountry` &mdash; Data for the country that a user selects in the dropdown
  - `name` &mdash; The country's name
  - `iso2` &mdash; The country's two-letter ISO code
  - `dialCode` &mdash; The country's dial code
