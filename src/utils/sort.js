import dayjs from 'dayjs';

const compareValues = (valueOne, valueTwo) => {
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
  compareValues(
    dayjs(eventOne.dateFrom).diff(dayjs(eventOne.dateTo)),
    dayjs(eventTwo.dateFrom).diff(dayjs(eventTwo.dateTo))
  );

export const sortEventsByPrice = (eventOne, eventTwo) =>
  compareValues(eventTwo.basePrice, eventOne.basePrice);
