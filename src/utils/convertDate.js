export function convertDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export const formatDateToISOShorten = (dateString) => {
  return dateString.substr(0, 10);
};

export function convertDate(inputDate) {
  const dateIN = new Date(inputDate);

  const date = dateIN.getDate();
  const monthIndex = dateIN.getMonth();
  const year = dateIN.getFullYear() % 100;

  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const formattedDate = `${date < 10 ? '0' : ''}${date}-${
    months[monthIndex]
  }-${year}`;

  if (formattedDate === 'NaN-undefined-NaN') return '';

  return formattedDate;
}

export function calculateHourDifference(time1, time2) {
  const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  if (!timeFormatRegex.test(time1) || !timeFormatRegex.test(time2)) {
    return 1;
  }

  const [hour1, minute1, second1] = time1.split(':').map(Number);
  const [hour2, minute2, second2] = time2.split(':').map(Number);

  const totalSeconds1 = hour1 * 3600 + minute1 * 60 + second1;
  const totalSeconds2 = hour2 * 3600 + minute2 * 60 + second2;

  const secondDifference = Math.abs(totalSeconds1 - totalSeconds2);

  const hourDifference = Math.floor(secondDifference / 3600);

  return hourDifference;
}
