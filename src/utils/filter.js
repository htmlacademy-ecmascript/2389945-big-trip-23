import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const isEventPresent = (dateFrom, dateTo) =>
  dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

const isEventPast = (date) => dayjs().isAfter(dayjs(date));

const isEventFuture = (date) => dayjs().isBefore(dayjs(date));

const filter = {
  [FilterType.EVERYTHING]: {
    getFilterFunction: (events) => events,
    emptyMessage: 'Click New Event to create your first point',
  },
  [FilterType.FUTURE]: {
    getFilterFunction: (events) =>
      events.filter((event) => isEventFuture(event.dateFrom)),
    emptyMessage: 'There are no future events now',
  },
  [FilterType.PRESENT]: {
    getFilterFunction: (events) =>
      events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
    emptyMessage: 'There are no present events now',
  },
  [FilterType.PAST]: {
    getFilterFunction: (events) => events.filter((event) => isEventPast(event.dateTo)),
    emptyMessage: 'There are no past events now',
  },
};

export { filter };
