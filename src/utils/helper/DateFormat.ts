import moment from 'jalali-moment';

export class DateFormat {
  static getDate = (date: any) => {
    return moment(date).format('YYYY-MM-DD');
  };

  static fDate = (date: Date | string) => {
    return new Date(date).toISOString().split('T')[0];
  };

  static fTime = (date: any) => {
    return (new Date(date) as any).split('T')[1].split('.')[0];
  };

  static fPersianTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], { timeStyle: 'medium' });
  };

  static fPersianDate = (date: any) => {
    return new Date(date).toLocaleDateString('fa-IR');
  };

  static fPersianDateTime = (date: any) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  static convertShamsiToGregorian = (date: any) => {
    const mask = date.split('/')[0].length === 4 ? 'YYYY/MM/DD' : 'DD/MM/YYYY';
    return moment.from(date, 'fa', mask).format('YYYY-MM-DD');
  };

  static getNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  };

  static getNextYear = (date: Date) => {
    return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
  };

  static getPreviousYear = (date: Date) => {
    return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
  };

  static monthesBetweenDates = ({
    fdate,
    tdate,
  }: {
    fdate: Date | string;
    tdate: Date | string;
  }) => {
    const months = [];
    let currentDate = new Date(fdate);
    const endDateObj = new Date(tdate);

    // Loop through each month between start and end date
    while (currentDate < endDateObj) {
      const fdate = currentDate.toISOString().substring(0, 7) + '-01';
      currentDate.setMonth(currentDate.getMonth() + 1);
      const tdate = currentDate.toISOString().substring(0, 7) + '-01';
      months.push({ fdate, tdate });
    }

    return months;
  };

  static monthesBetweenDatesString = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    let current = new Date(start);
    while (current <= end) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      const monthStr = month < 10 ? `0${month}` : `${month}`;
      const dateStr = `${year}-${monthStr}-01`;
      months.push(dateStr);
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  static getPersianMonth = (date: any) => {
    let dates = date;

    // If input is not an array, wrap it in an array
    if (!Array.isArray(dates)) {
      dates = [dates];
    }

    const persianMonths = dates.map((georgianDate: any) => {
      // Convert any input date to a Date object
      const dateObj = new Date(georgianDate);
      const georgianYear = dateObj.getFullYear();
      const georgianMonth = dateObj.getMonth() + 1;
      const georgianDay = dateObj.getDate();

      const persianDate = new Date();
      persianDate.setFullYear(georgianYear, georgianMonth - 1, georgianDay);

      const persianMonth = persianDate.toLocaleString('fa-IR', { month: 'long' });
      return persianMonth;
    });

    // If input was a single date, return the single Persian month
    if (persianMonths.length === 1) {
      return persianMonths[0];
    }

    // If input was an array of dates, return the array of Persian months
    return persianMonths;
  };
}
