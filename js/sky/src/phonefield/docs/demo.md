---
name: Phone field
icon: phone
summary: The phone field component creates a text box to format and validate phone numbers.

---

The phone field component creates a text box for users to enter phone numbers. It wraps up the [intl-tel-input jQuery plugin](http://jackocnr.com/intl-tel-input.html) to handle formatting and validation for international phone numbers. You use the `bb-phone-field` directive in conjunction with the ngModel directive and bind the phone number value to ngModel on your model.

### Dependencies ###
- **[intl-tel-input](http://jackocnr.com/intl-tel-input.html) (8.5.2 or higher)** Enhances a text box to format and validate international phone number formatting and validation. This plugin adds a dropdown for users to select a country and specifies the desired format and dial code. Users can also enter a dial code to select a country.

---

### Phone field settings ###
- `bb-phone-field` &mdash; Specifies variable that holds settings for the global configuration object `bbPhoneFieldConfig`.

### bbPhoneFieldConfig settings ###
- `countryIso2` &mdash; The International Organization for Standardization's two-letter code for the default country. When the default country is selected, `ng-model`'s value will be formatted in the default country's national phone format. When the default country is not selected, `ng-model`'s value will be formatted in the selected country's international phone format (dial code included).
- `selectedCountry` &mdash; The data of the country that is currently selected in the plugin's country dropdown
  - `name` &mdash; The country's name
  - `iso2` &mdash; The country's ISO alpha-2 code
  - `dialCode` &mdash; The country's pre-fixed dial code
