import dayjs from 'dayjs';

export const sortEventsByDay = (eventOne, eventTwo) =>
  dayjs(eventOne.dateFrom).diff(dayjs(eventTwo.dateFrom));

export const sortEventsByTime = (eventOne, eventTwo) =>
  dayjs(eventOne.dateFrom).diff(dayjs(eventOne.dateTo)) -
  dayjs(eventTwo.dateFrom).diff(dayjs(eventTwo.dateTo));

export const sortEventsByPrice = (eventOne, eventTwo) =>
  eventTwo.basePrice - eventOne.basePrice;
