import dayjs from 'dayjs';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const formatEventDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';

export const getEventDurationTime = (dateStart, dateEnd) => {
  const diff = dayjs(dateEnd).diff(dateStart, 'minute');
  return `${Math.floor(diff / 60) || ''}H ${Math.floor(diff % 60)}M`;
};

export const calcTotalPrice = (basePrice, offers) =>
  basePrice + offers.reduce((sum, offer) => sum + offer.price, 0);
