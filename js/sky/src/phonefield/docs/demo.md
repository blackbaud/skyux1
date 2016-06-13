---
name: Phone field
icon: phone
summary: The phone field component wraps up the intl-tel-input jQuery plugin to enhance an input with aids in national and international phone number formatting and validation.

---

The phone number component wraps up the [intl-tel-input jQuery plugin](http://jackocnr.com/intl-tel-input.html) to enhance an input with aids in national and international phone number formatting and validation. You must use this directive in conjunction with the ngModel directive where the property bound to ngModel is the phone number value on your model.

### Dependencies ###
- **[intl-tel-input](http://jackocnr.com/intl-tel-input.html) (8.5.2 or higher)** Enhances a textbox with country-specific phone number formatting aids in national and international phone number formatting and validation. This includes a country dropdown that specifies the desired format and dial code of the input's phone number. Alternatively, if a dial code is provided in the input's phone number, the country dropdown will detect that dial code and select the dial code's country.

---

### Phone field settings ###
- `bb-phone-field` &mdash; *(Optional.)* A variable that holds settings for the global configuration object `bbPhoneFieldConfig`.

### bbPhoneFieldConfig settings ###
- `countryIso2`: The ISO alpha-2 code of the country that the plugin will consider the default country. When the default country is selected, `ng-model`'s value will be formatted in the default country's national phone format. When the default country is not selected, `ng-model`'s value will be formatted in the selected country's international phone format (dial code included).
- `selectedCountry`: The data of the country that is currently selected in the plugin's country dropdown
  - `name`: The country's name
  - `iso2`: The country's ISO alpha-2 code
  - `dialCode`: The country's pre-fixed dial code
