import dayjs from 'dayjs';

export const sortEventsByDay = (eventOne, eventTwo) =>
  dayjs(eventTwo.dateFrom).diff(dayjs(eventOne.dateFrom));

export const sortEventsByTime = (eventOne, eventTwo) =>
  dayjs(eventOne.dateFrom).diff(dayjs(eventOne.dateTo)) -
  dayjs(eventTwo.dateFrom).diff(dayjs(eventTwo.dateTo));

export const sortEventsByPrice = (eventOne, eventTwo) =>
  eventTwo.basePrice - eventOne.basePrice;
