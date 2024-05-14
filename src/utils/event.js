import dayjs from 'dayjs';

const now = dayjs();

export const isEventPresent = (dateFrom, dateTo) =>
  dayjs(dateFrom) <= now && dayjs(dateTo) >= now;

export const isEventPast = (dateFrom, dateTo) =>
  dayjs(dateFrom) < now && dayjs(dateTo) < now;

export const isEventFuture = (dateFrom, dateTo) =>
  dayjs(dateFrom) > now && dayjs(dateTo) > now;
