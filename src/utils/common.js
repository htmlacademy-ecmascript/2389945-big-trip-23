import dayjs from 'dayjs';
import { DateTimeSettings } from '../const.js';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const updateItem = (items, update) =>
  items.map((item) => (item.id === update.id ? update : item));

export const formatDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';

export const getDurationTime = (dateStart, dateEnd) => {
  const diff = dayjs(dateEnd).diff(dateStart, 'minute');
  let days = Math.floor(
    diff / (DateTimeSettings.HOUR_MINUTES * DateTimeSettings.DAY_HOURS)
  );
  let hours = Math.floor(diff / DateTimeSettings.HOUR_MINUTES);
  let minutes = Math.floor(diff % DateTimeSettings.HOUR_MINUTES);

  days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
  hours = !(hours % DateTimeSettings.DAY_HOURS)
    ? '00H'
    : `${String(hours % DateTimeSettings.DAY_HOURS).padStart(2, '0')}H`;
  minutes = `${String(minutes).padStart(2, '0')}M`;

  const durationTime = `${days} ${
    days !== '' || hours !== '00H' ? hours : ''
  } ${minutes}`;
  return durationTime;
};

export const calcTotalPrice = (basePrice, offers) =>
  basePrice + offers.reduce((sum, offer) => sum + offer.price, 0);
