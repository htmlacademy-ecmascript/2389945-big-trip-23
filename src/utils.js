import dayjs from 'dayjs';
import {DAY_HOURS, HOUR_MINUTES } from './const';

export const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const formatEventDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';

export const getEventDurationTime = (dateStart, dateEnd) => {
  const diff = dayjs(dateEnd).diff(dateStart, 'minute');
  let days = Math.floor(diff / (HOUR_MINUTES * DAY_HOURS));
  let hours = Math.floor(diff / HOUR_MINUTES);
  let minutes = Math.floor(diff % HOUR_MINUTES);

  days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
  hours =
    hours % DAY_HOURS === 0 ? '00H' : `${String(hours % DAY_HOURS).padStart(2, '0')}H`;
  minutes = `${String(minutes).padStart(2, '0')}M`;

  const durationTime = `${days} ${
    days !== '' || hours !== '' ? hours : ''
  } ${minutes}`;
  return durationTime;
};

export const calcTotalPrice = (basePrice, offers) =>
  basePrice + offers.reduce((sum, offer) => sum + offer.price, 0);
