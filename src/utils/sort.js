import dayjs from 'dayjs';

const sortEventsByDay = (eventOne, eventTwo) =>
  dayjs(eventOne.dateFrom).diff(dayjs(eventTwo.dateFrom));

const sortEventsByTime = (eventOne, eventTwo) =>
  dayjs(eventOne.dateFrom).diff(dayjs(eventOne.dateTo)) -
  dayjs(eventTwo.dateFrom).diff(dayjs(eventTwo.dateTo));

const sortEventsByPrice = (eventOne, eventTwo) =>
  eventTwo.basePrice - eventOne.basePrice;

export { sortEventsByDay, sortEventsByTime, sortEventsByPrice };
