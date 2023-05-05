const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getCurrentDateMDW = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDay();

  return months[month - 1] + ' ' + date + ', ' + days[day];
};

// Month Day, Weekday
export const currentDateMDW = getCurrentDateMDW();
