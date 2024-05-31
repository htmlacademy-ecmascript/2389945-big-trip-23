import dayjs from 'dayjs';
import { DateTimeSetting } from '../const.js';

const formatDate = (date, formatPattern) =>
  date ? dayjs(date).format(formatPattern) : '';

const getDurationTime = (dateStart, dateEnd) => {
  const diff = dayjs(dateEnd).diff(dateStart, 'minute');
  let days = Math.floor(
    diff / (DateTimeSetting.HOUR_MINUTES * DateTimeSetting.DAY_HOURS)
  );
  let hours = Math.floor(diff / DateTimeSetting.HOUR_MINUTES);
  let minutes = Math.floor(diff % DateTimeSetting.HOUR_MINUTES);

  days = days > 0 ? `${String(days).padStart(2, '0')}D` : '';
  hours = !(hours % DateTimeSetting.DAY_HOURS)
    ? '00H'
    : `${String(hours % DateTimeSetting.DAY_HOURS).padStart(2, '0')}H`;
  minutes = `${String(minutes).padStart(2, '0')}M`;

  const durationTime = `${days} ${
    days !== '' || hours !== '00H' ? hours : ''
  } ${minutes}`;
  return durationTime;
};

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export { formatDate, getDurationTime, capitalizeFirstLetter };

