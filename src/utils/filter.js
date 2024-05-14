import { FilterType } from '../const.js';
import { isEventFuture, isEventPast, isEventPresent } from './event.js';

export const filter = {
  [FilterType.EVERYTHING.name]: (events) => events,
  [FilterType.FUTURE.name]: (events) =>
    events.filter((event) => isEventFuture(event.dateFrom, event.dateTo)),
  [FilterType.PRESENT.name]: (events) =>
    events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST.name]: (events) =>
    events.filter((event) => isEventPast(event.dateFrom, event.dateTo)),
};
