import { DateTime, Settings } from 'luxon';
Settings.defaultLocale = 'en';

export const DateFormats = {
  numberMonth: 'MM',
  fullMonth: 'MMMM',
  frontend: 'dd/MM/yyyy',
  frontendDateTime: 'dd/MM/yyyy - hh:mma',
  backendDate: 'yyyy-MM-dd'
};

export class DateUtils {
  static changeDateStringFormat(dateString, fromFormat, toFormat) {
    const date = DateTime.fromFormat(dateString, fromFormat);
    return date.isValid ? date.toFormat(toFormat) : undefined;
  }

  static isDateValid(dateString, format = DateFormats.frontend) {
    return DateTime.fromFormat(dateString, format).isValid;
  }

  static dateToString(date, toFormat) {
    return DateTime.fromJSDate(new Date(date)).toFormat(toFormat);
  }

  static parse(dateString, format) {
    return DateTime.fromFormat(dateString, format).toJSDate();
  }
}
