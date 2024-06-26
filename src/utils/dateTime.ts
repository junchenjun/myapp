export const minuteOptions = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
export const secondOptions = [
  '00',
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
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];

export const getTimerInfoBySeconds = (seconds?: number) => {
  if (seconds) {
    const m = seconds / 60 > 0 ? Math.floor(seconds / 60) : 0;
    const s = m > 0 ? seconds - m * 60 : seconds;
    return {
      min: m,
      sec: s,
    };
  } else {
    return {
      min: 0,
      sec: 0,
    };
  }
};
