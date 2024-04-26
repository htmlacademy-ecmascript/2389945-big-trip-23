import dayjs from 'dayjs';

//const DATE_FORMAT = 'DD/MM/YY HH:mm';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const formatEventDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';
