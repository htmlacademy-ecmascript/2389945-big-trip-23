import { FilterType } from '../const.js';
import { isEventFuture, isEventPast, isEventPresent } from './event.js';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) =>
    events.filter((event) => isEventFuture(event.dateFrom)),
  [FilterType.PRESENT]: (events) =>
    events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) =>
    events.filter((event) => isEventPast(event.dateTo)),
};
