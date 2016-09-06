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

        function getFormatIndex(format) {
            return {
                yearBegin: format.indexOf('y'),
                monthBegin: format.indexOf('M'),
                dayBegin: format.indexOf('d')
            };
        }

        function parseNoSeparatorDateString(value, format) {
            var date = null,
                yearBegin,
                monthBegin,
                dayBegin,
                formatIndex,
                yearIndex,
                monthIndex,
                dayIndex;

            formatIndex = getFormatIndex(format);
            yearBegin = formatIndex.yearBegin;
            monthBegin = formatIndex.monthBegin;
            dayBegin = formatIndex.dayBegin;

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
                formatIndex = getFormatIndex(format),
                yearBegin,
                monthBegin,
                dayBegin,
                separatorChar;
            
            yearBegin = formatIndex.yearBegin;
            monthBegin = formatIndex.monthBegin;
            dayBegin = formatIndex.dayBegin;

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

        function hasValidMomentFormat(format) {
            var formatIndex = getFormatIndex(format);
            return !((formatIndex.monthBegin > formatIndex.yearBegin && formatIndex.yearBegin > formatIndex.dayBegin) ||
                (formatIndex.monthBegin < formatIndex.yearBegin && formatIndex.yearBegin < formatIndex.dayBegin));
        }

        function isMomentParsable(value, format) {
            if (angular.isString(value) && dateHasSeparator(value)) {

                if (value.length < 11 && value.length > 5) {
                    if (hasValidMomentFormat(format)) {
                        return true;
                    }
                } 
            }

            return false;
        }

        function yearInLastPosition(formatIndex) {
            return formatIndex.yearBegin > formatIndex.monthBegin && formatIndex.yearBegin > formatIndex.dayBegin;
        }

        function yearInFirstPosition(formatIndex) {
            return formatIndex.yearBegin < formatIndex.monthBegin && formatIndex.yearBegin < formatIndex.dayBegin;
        }

        function yearPartDoesNotMatchFormat(value, format) {
            var formatIndex = getFormatIndex(format),
                dateParts,
                formatParts,
                separator = matchSeparator(format);

            /* istanbul ignore else */
            /* sanity check */
            if (separator) {
                dateParts = value.split(separator);
                formatParts = format.split(separator);

            
                if (yearInLastPosition(formatIndex)) {
                    return formatParts[2].length === 4 && dateParts[2].length === 2;
                }
                /* istanbul ignore else */
                /* sanity check */
                if (yearInFirstPosition(formatIndex)) {
                    return formatParts[0].length === 4 && dateParts[0].length !== 4;
                }
            }

        }

        

        function getTwoDigitFormat(format) {
            var formatIndex = getFormatIndex(format),
                formatParts,
                separatorChar,
                separator = matchSeparator(format),
                middleFormat;

            /* istanbul ignore else */
            /* sanity check */
            if (separator) {
                formatParts = format.split(separator);
                separatorChar = separator[0];

                /* istanbul ignore else */
                /* sanity check */
                if (separatorChar) {

                    middleFormat = separatorChar + formatParts[1] + separatorChar;
                    if (yearInLastPosition(formatIndex)) {
                        return formatParts[0] + middleFormat + 'yy';
                    }

                    /* istanbul ignore else */
                    /* sanity check */
                    if (yearInFirstPosition(formatIndex)) {
                        return 'yy' + middleFormat + formatParts[2];
                    }
                }
            }
        }

        function getMomentDate(value, format) {
            var momentDate = bbMoment(value, format.toUpperCase()),
                date;
            /* istanbul ignore else */
            /* sanity check */
            if (momentDate.isValid()) {
                date = momentDate.toDate();
            }
            return date;
        }

        function parseMoment(value, format) {
            var date = null,
               momentFormat;

            if (isMomentParsable(value, format)) {
                if (yearPartDoesNotMatchFormat(value, format)) {
                    momentFormat = getTwoDigitFormat(format);
                }
                if (!momentFormat) {
                    momentFormat = format;
                }
                date = getMomentDate(value, momentFormat);
               
            }
            return date;
        }

        return {
            parseUTCString: parseUTCString,
            parseNoSeparatorDateString: parseNoSeparatorDateString,
            getAltInputFormats: getAltInputFormats,
            parseMoment: parseMoment,
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
