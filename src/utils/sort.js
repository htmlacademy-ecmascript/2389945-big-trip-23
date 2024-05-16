import dayjs from 'dayjs';

const compare = (valueOne, valueTwo) => {
  if (valueOne > valueTwo) {
    return 1;
  }
  if (valueOne === valueTwo) {
    return 0;
  }
  if (valueOne < valueTwo) {
    return -1;
  }
};

export const sortEventsByDay = (eventOne, eventTwo) =>
  dayjs(eventTwo.dateFrom).diff(dayjs(eventOne.dateFrom));

export const sortEventsByTime = (eventOne, eventTwo) =>
  compare(
    dayjs(eventOne.dateFrom).diff(dayjs(eventOne.dateTo)),
    dayjs(eventTwo.dateFrom).diff(dayjs(eventTwo.dateTo))
  );

export const sortEventsByPrice = (eventOne, eventTwo) =>
  compare(eventTwo.basePrice, eventOne.basePrice);
