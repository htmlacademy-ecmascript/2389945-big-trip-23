import dayjs from 'dayjs';

const now = dayjs();

export const isEventPresent = (dateFrom, dateTo) =>
  now.isAfter(dayjs(dateFrom)) && now.isBefore(dayjs(dateTo));

export const isEventPast = (date) => now.isAfter(dayjs(date));

export const isEventFuture = (date) => now.isBefore(dayjs(date));
