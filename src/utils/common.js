import dayjs from 'dayjs';
import { DateTimeSettings } from '../const.js';

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getUniqueRandomArray = (sourceArray, resultArraySize) => {
  const resultIndex = new Set();
  while (resultIndex.size !== Math.min(resultArraySize, sourceArray.length)) {
    resultIndex.add(getRandomInteger(0, sourceArray.length - 1));
  }

  const elements = [];
  resultIndex.forEach((value) => elements.push(sourceArray[value]));
  return elements;
};

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

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
