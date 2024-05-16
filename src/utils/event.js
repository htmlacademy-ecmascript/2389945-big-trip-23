import dayjs from 'dayjs';

export const isEventPresent = (dateFrom, dateTo) =>
  dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

export const isEventPast = (date) => dayjs().isAfter(dayjs(date));

export const isEventFuture = (date) => dayjs().isBefore(dayjs(date));

export const calcTotalEventPrice = (basePrice, offers) =>
  basePrice + offers.reduce((sum, offer) => sum + offer.price, 0);
