import dayjs from 'dayjs';

//const DATE_FORMAT = 'DD/MM/YY HH:mm';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const formatEventDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';

export const durationTime = (dateEnd, dateStart) => {
  const diff = dayjs(dateStart).diff(dateEnd, 'minute');
  return `${Math.floor(diff / 60)}H ${Math.floor(diff % 60)}M`;
};
