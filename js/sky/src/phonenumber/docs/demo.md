---
name: Phone Number
icon: phone
summary: The phone number component wraps up the intl-tel-input jQuery plugin to create a textbox with aids in national and international phone number formatting and validation.

---

The phone number component wraps up the [intl-tel-input jQuery plugin](http://jackocnr.com/intl-tel-input.html) to create a textbox with aids in national and international phone number formatting and validation.

### Dependencies ###
- **[intl-tel-input](http://jackocnr.com/intl-tel-input.html) (8.5.2 or higher)** Enhances a textbox with country-specific phone number formatting aids in national and international phone number formatting and validation.

---

### Phone Number Settings ###
- `bb-phone-number` &mdash; Creates a textbox with a country dropdown and phone format placeholders.
  - `bb-phone-number-country` &mdash; *(Optional.)* Specifies the country that the directive considers as the local, or default, country. The value supplied should be the country's ISO alpha-2 code. When the local country is selected, the the `bb-phone-number-result` variable will be formatted in the national format without a dial code. When the local country is not selected, the `bb-phone-number-result` variable will be formatted in the international format with a dial code.
  - `bb-phone-number-country-changed` &mdash; *(Optional.)* Specifies a function with the supplied countryData object (below) as a parameter. When a user selects a country from the country dropdown or a country phone number format is detected from the input's content, the specified function is called and the countryData parameter holds data for the newly selected country.
    - countryData
      - name: The country's name
      - iso2: The country's ISO alpha-2 code
      - dialCode: The country's pre-fixed dial code
  - `bb-phone-number-label` &mdash; *(Optional.)* Provides a text label to display over the field where users enter the phone number.
  - `bb-phone-number-result` &mdash; *(Optional.)* A variable that is set to the provided phone number's national or international format.
  - `bb-phone-number-valid` &mdash; *(Optional.)* A variable that is set to `true` when the phone number is valid and `false` when the phone number is not valid.
