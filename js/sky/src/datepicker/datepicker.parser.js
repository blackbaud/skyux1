/* global angular */
(function () {
    'use strict';

    function bbDatepickerParser(bbMoment) {
        function parseUTCString(value) {
            var date = null,
                dateArray,
                datePart;

            if (angular.isString(value) && value.indexOf('T00:00:00') !== -1) {
                datePart = value.split('T')[0];

                dateArray = datePart.split('-');
                date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            }
            return date;
        }

        function parseNoSeparatorDateString(value, format) {
            var date = null,
                yearBegin = format.indexOf('y'),
                monthBegin = format.indexOf('M'),
                dayBegin = format.indexOf('d'),
                yearIndex,
                monthIndex,
                dayIndex;
            if (angular.isString(value) && value.length === 8 && !isNaN(value)) {
                if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                    yearIndex = 4;
                    if (monthBegin < dayBegin) {
                        dayIndex = 2;
                        monthIndex = 0;
                    } else {
                        dayIndex = 0;
                        monthIndex = 2;
                    }
                } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                    yearIndex = 0;
                    monthIndex = 4;
                    dayIndex = 6;
                } else {
                    return null;
                }

                date = new Date(value.substr(yearIndex, 4), (value.substr(monthIndex, 2) - 1), value.substr(dayIndex, 2));
            }
            return date;
        }

        function matchSeparator(value) {
            return value.match(/[.\/\-\s].*?/);
        }

        function getAltInputFormats(format) {
            var altInputFormats = [],
                separator = matchSeparator(format),
                yearBegin = format.indexOf('y'),
                monthBegin = format.indexOf('M'),
                dayBegin = format.indexOf('d'),
                separatorChar;

            /*istanbul ignore else */
            /* sanity check */
            if (separator) {
                separatorChar = separator[0];

                /*istanbul ignore else */
                /* sanity check */
                if (separatorChar) {
                    if ((dayBegin < yearBegin) && (monthBegin < yearBegin)) {
                        if (monthBegin < dayBegin) {
                            altInputFormats.push('M!' + separatorChar + 'd!' + separatorChar + 'yyyy');
                        } else {
                            altInputFormats.push('d!' + separatorChar + 'M!' + separatorChar + 'yyyy');
                        }
                    } else if ((yearBegin < monthBegin) && (monthBegin < dayBegin)) {
                        altInputFormats.push('yyyy' + separatorChar + 'M!' + separatorChar + 'd!');
                    }
                }

                return altInputFormats;
            }


        }

        function dateHasSeparator(value) {
            /*
            * Validation criteria:
            * A separator exists
            * There is no separator at the beginning
            * There is no separator at the end
            * Two separators exist
            * All parts of the date have a non-zero value
            */

            var separator = matchSeparator(value),
                valueArray = value.split(separator),
                separatorAtEnd = value.indexOf(separator, value.length - 1) !== -1,
                separatorAtBeginning = value.indexOf(separator) === 0,
                hasTwoSeparators = valueArray.length - 1 === 2,
                anyPartIsZero = valueArray.some(function (e) {
                    return Number(e) === 0;
                });

            return (separator && !separatorAtEnd && !separatorAtBeginning && hasTwoSeparators && !anyPartIsZero);
        }

        function isMomentParsable(value, format) {
            var yearParts,
                yearIndex,
                monthIndex,
                dayIndex,
                separator;

            if (angular.isString(value) && dateHasSeparator(value)) {

                if (value.length === 10) {
                    return true;
                } else if (value.length === 9 || value.length === 8) {
                    //insure that years have 4 characters
                    separator = matchSeparator(value);
                    yearParts = value.split(separator);
                    yearIndex = format.indexOf('y');
                    monthIndex = format.indexOf('M');
                    dayIndex = format.indexOf('d');
                    if (yearIndex > monthIndex && yearIndex > dayIndex) {
                        return yearParts[2].length === 4;
                    }

                    if (yearIndex < monthIndex && yearIndex < dayIndex) {
                        return yearParts[0].length === 4;
                    }

                }

            }

            return false;
        }

        function parseMoment(value, format) {
           var date = null,
               momentDate;

           if (isMomentParsable(value, format)) {
               momentDate = bbMoment(value, format.toUpperCase());
               if (momentDate.isValid()) {
                   date = momentDate.toDate();
               }
           }

           return date;
       }

        return {
            parseUTCString: parseUTCString,
            parseNoSeparatorDateString: parseNoSeparatorDateString,
            getAltInputFormats: getAltInputFormats,
            runModelParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseMoment(value, format);

                return date;
            },

            runParsers: function (value, format) {
                var date = null;

                if (!value || angular.isDate(value) || value === '') {
                    return value;
                }

                date = parseUTCString(value);

                if (angular.isDate(date)) {
                    return date;
                }

                date = parseNoSeparatorDateString(value, format);

                return date;
            }
        };
    }

    bbDatepickerParser.$inject = ['bbMoment'];

    angular.module('sky.datepicker.parser', ['sky.moment'])
        .factory('bbDatepickerParser', bbDatepickerParser);

}());
